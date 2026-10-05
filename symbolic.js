(function (root, factory) {
  'use strict';
  const engine = typeof module === 'object' && module.exports ? require('./engine.js') : root.DetEngine;
  const api = factory(engine);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SymbolicGame = api;
})(typeof window !== 'undefined' ? window : globalThis, function (E) {
  'use strict';
  if (!E) throw new Error('请先加载 engine.js。');
  const ZERO = () => [E.parse(0)];
  const ONE = () => [E.parse(1)];
  function normalize(values) {
    const p = values.length ? values.map(E.parse) : ZERO();
    while (p.length > 1 && E.isZero(p[p.length - 1])) p.pop();
    return p;
  }
  function polynomial(value) {
    if (Array.isArray(value)) return normalize(value);
    if (typeof value !== 'string' || !value.includes('x')) return [E.parse(value)];
    const text = value.replace(/\s/g, '').replace(/−/g, '-');
    const terms = text.match(/[+-]?[^+-]+/g);
    if (!terms || terms.join('') !== text) throw new Error('多项式格式无效。');
    let result = ZERO();
    for (const term of terms) {
      if (!term.includes('x')) { result = add(result, [E.parse(term)]); continue; }
      const match = /^([+-]?)(?:(\d+(?:\/\d+)?|\d*\.\d+)\*?)?x(?:\^(\d+))?$/.exec(term);
      if (!match) throw new Error('请使用 x、x-1、2x^2 等多项式格式。');
      const power = Number(match[3] || 1);
      if (!Number.isInteger(power) || power > 100) throw new Error('多项式次数须为 0 至 100。');
      const coefficient = E.mul(match[1] === '-' ? -1 : 1, match[2] || 1);
      const monomial = Array.from({length: power + 1}, () => E.parse(0));
      monomial[power] = coefficient;
      result = add(result, monomial);
    }
    return normalize(result);
  }
  function zero(p) { return p.every(E.isZero); }
  function add(a, b) {
    return normalize(Array.from({length: Math.max(a.length, b.length)}, (_, i) => E.add(a[i] || 0, b[i] || 0)));
  }
  function multiply(a, b) {
    const result = Array.from({length: a.length + b.length - 1}, () => E.parse(0));
    a.forEach((c, i) => b.forEach((d, j) => { result[i + j] = E.add(result[i + j], E.mul(c, d)); }));
    return normalize(result);
  }
  function constantMultiply(p, factor) { return normalize(p.map(c => E.mul(c, factor))); }
  function equals(a, b) { a = polynomial(a); b = polynomial(b); return a.length === b.length && a.every((c, i) => E.eq(c, b[i])); }
  function freezeState(matrix, factor) {
    return Object.freeze({ matrix: Object.freeze(matrix.map(row => Object.freeze(row.map(p => Object.freeze(normalize(p)))))), factor: Object.freeze(normalize(factor)) });
  }
  function stateFromMatrix(matrix, factor = 1) {
    if (!Array.isArray(matrix) || matrix.length < 1 || matrix.length > 6 || matrix.some(row => !Array.isArray(row) || row.length !== matrix.length)) throw new Error('请输入 1 至 6 阶方阵。');
    return freezeState(matrix.map(row => row.map(polynomial)), polynomial(factor));
  }
  function initial() {
    return stateFromMatrix([[1, -1, 1, 'x-1'], [1, -1, 'x+1', -1], [1, 'x-1', 1, -1], ['x+1', -1, 1, -1]]);
  }
  function cloned(state) {
    if (!state || !state.matrix || !state.factor) throw new Error('关卡状态无效。');
    const validated = stateFromMatrix(state.matrix, state.factor);
    return { matrix: validated.matrix.map(row => row.map(p => p.slice())), factor: validated.factor.slice() };
  }
  function format(value, options = {}) {
    const p = polynomial(value), pieces = [];
    const superscript = n => String(n).replace(/\d/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]);
    for (let power = p.length - 1; power >= 0; power--) {
      const c = p[power];
      if (E.isZero(c)) continue;
      const negative = E.compare(c, 0) < 0;
      const magnitude = negative ? E.neg(c) : c;
      let text;
      if (power === 0) text = E.fmt(magnitude);
      else {
        const coefficient = E.eq(magnitude, 1) ? '' : (magnitude.d === '1' ? E.fmt(magnitude) : '(' + E.fmt(magnitude) + ')');
        text = coefficient + 'x' + (power === 1 ? '' : options.html ? '<sup>' + power + '</sup>' : superscript(power));
      }
      pieces.push((pieces.length ? negative ? ' − ' : ' + ' : negative ? '−' : '') + text);
    }
    return pieces.join('') || '0';
  }
  function evaluate(value, x) {
    const p = polynomial(value), input = E.parse(x);
    let result = E.parse(0);
    for (let i = p.length - 1; i >= 0; i--) result = E.add(E.mul(result, input), p[i]);
    return result;
  }
  function matrixAt(state, x) { return state.matrix.map(row => row.map(p => evaluate(p, x))); }
  function det(matrix) {
    if (!matrix.length) return ONE();
    if (matrix.length === 1) return polynomial(matrix[0][0]);
    let result = ZERO();
    matrix[0].forEach((p, column) => {
      if (zero(p)) return;
      const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== column));
      result = add(result, constantMultiply(multiply(p, det(minor)), column % 2 ? -1 : 1));
    });
    return result;
  }
  function determinantPolynomial(state) { const s = cloned(state); return multiply(s.factor, det(s.matrix)); }
  // The tridiagonal lesson uses c = cos(theta) as the polynomial variable x.
  // Its matrix is genuinely symbolic (the diagonal is 2c and the two bands are -1),
  // so the recurrence can be inspected without replacing the lesson with a
  // numeric snapshot at theta = pi/2.
  function cosTridiagonal(n) {
    if (!Number.isInteger(n) || n < 1 || n > 6) throw new Error('三对角阶数须为 1 至 6。');
    const matrix = Array.from({length:n}, (_, r) => Array.from({length:n}, (_, c) => r === c ? '2x' : Math.abs(r - c) === 1 ? -1 : 0));
    const determinants = [[E.parse(1)]];
    if (n >= 1) determinants.push(polynomial('2x'));
    for (let k = 2; k <= n; k++) determinants.push(add(multiply(polynomial('2x'), determinants[k - 1]), constantMultiply(determinants[k - 2], -1)));
    const state = stateFromMatrix(matrix), sampleAt = c => ({ c: E.fmt(c), value: E.fmt(evaluate(determinants[n], c)) });
    const numericSamples = [-1, 0, '1/2', 1].map(sampleAt);
    return Object.freeze({ n, parameter: 'c = cos(θ)', matrix, state, determinants, recurrence: 'D₀ = 1，D₁ = 2c，Dₙ = 2cDₙ₋₁ − Dₙ₋₂', closedForm: `sin((${n + 1})θ) / sin θ`, polynomial: determinants[n], numericSamples });
  }
  function cofactorExpansion(state, axis = 'row', index = 0) {
    const s = cloned(state), normalizedAxis = axisName(axis);
    checkIndex(index, s.matrix.length, '展开');
    const terms = s.matrix.map((_, other) => {
      const row = normalizedAxis === 'row' ? index : other;
      const column = normalizedAxis === 'row' ? other : index;
      const minor = s.matrix.filter((_, r) => r !== row).map(values => values.filter((_, c) => c !== column));
      const minorDeterminant = det(minor), sign = (row + column) % 2 ? -1 : 1;
      return { row, column, element: s.matrix[row][column], sign, minor, minorDeterminant, cofactor: constantMultiply(minorDeterminant, sign), value: constantMultiply(multiply(s.matrix[row][column], minorDeterminant), sign) };
    });
    const total = terms.reduce((sum, term) => add(sum, term.value), ZERO());
    return Object.freeze({ state: s, axis: normalizedAxis, index, terms, total: multiply(s.factor, total) });
  }
  function permutationTerms(state) {
    const s = cloned(state), n = s.matrix.length;
    if (n > 5) throw new Error('排列展开最多展示 5 阶；请先降阶。');
    const terms = [];
    function walk(permutation, used) {
      if (permutation.length === n) {
        let inversions = 0, product = ONE();
        for (let r = 0; r < n; r++) {
          product = multiply(product, s.matrix[r][permutation[r]]);
          for (let q = r + 1; q < n; q++) if (permutation[r] > permutation[q]) inversions++;
        }
        const sign = inversions % 2 ? -1 : 1;
        terms.push({ permutation: permutation.slice(), inversions, sign, product, value: constantMultiply(product, sign), cells: permutation.map((column, row) => ({row, column, value:s.matrix[row][column]})) });
        return;
      }
      for (let c = 0; c < n; c++) if (!used.has(c)) { used.add(c); permutation.push(c); walk(permutation, used); permutation.pop(); used.delete(c); }
    }
    walk([], new Set());
    return terms;
  }
  function zeros(state) { return state.matrix.reduce((count, row) => count + row.filter(zero).length, 0); }
  function axisName(axis) { if (axis === 'row') return 'row'; if (axis === 'column' || axis === 'col') return 'column'; throw new Error('请选择行或列。'); }
  function checkIndex(index, n, name) { if (!Number.isInteger(index) || index < 0 || index >= n) throw new Error(name + '编号超出范围。'); }
  function apply(state, op) {
    if (!op || !['add', 'swap', 'scale', 'sum', 'transpose', 'extractX'].includes(op.type)) throw new Error('操作类型无效。');
    const s = cloned(state), n = s.matrix.length;
    if (op.type === 'transpose') {
      s.matrix = s.matrix.map((_, r) => s.matrix.map(row => row[r]));
      return { state: freezeState(s.matrix, s.factor), label: '转置', reason: '行与列互换，行列式不变；外面的因子也不变。', affected: s.matrix.flatMap((row, r) => row.map((_, c) => ({r, c}))).filter(cell => cell.r !== cell.c), direction: 'transpose' };
    }
    const axis = axisName(op.axis || 'row'), target = op.target, source = op.source;
    checkIndex(target, n, '目标');
    if (op.type === 'add' || op.type === 'swap') {
      checkIndex(source, n, '来源');
      if (source === target) throw new Error('来源和目标不能是同一行或列。');
    }
    const a = axis === 'column' ? s.matrix.map((_, r) => s.matrix.map(row => row[r])) : s.matrix;
    const letter = axis === 'row' ? 'R' : 'C', unit = axis === 'row' ? '行' : '列';
    const name = letter + (target + 1), from = letter + (source + 1);
    let label, reason;
    let affectedLines = [target];
    if (op.type === 'add') {
      const k = E.parse(op.factor);
      a[target] = a[target].map((p, j) => add(p, constantMultiply(a[source][j], k)));
      label = name + ' ← ' + name + ' + (' + E.fmt(k) + ')' + from;
      reason = '把另一' + unit + '的常数倍加到目标' + unit + '，行列式不变。来源' + unit + '保持不变。';
    } else if (op.type === 'swap') {
      [a[target], a[source]] = [a[source], a[target]];
      s.factor = constantMultiply(s.factor, -1);
      affectedLines = [target, source];
      label = name + ' ↔ ' + from;
      reason = '交换两' + unit + '，内部行列式变号；外因子也变号，原来的 D 保持不变。';
    } else if (op.type === 'scale') {
      const k = E.parse(op.factor);
      if (E.isZero(k)) throw new Error('倍乘系数不能为 0，否则无法保持与原行列式等价。');
      a[target] = a[target].map(p => constantMultiply(p, k));
      s.factor = s.factor.map(c => E.div(c, k));
      label = name + ' ← (' + E.fmt(k) + ')' + name;
      reason = '目标' + unit + '乘以 ' + E.fmt(k) + '，外因子除以同一个非零常数，原来的 D 保持不变。';
    } else if (op.type === 'sum') {
      a[target] = a[target].map((_, j) => a.reduce((total, row) => add(total, row[j]), ZERO()));
      label = name + ' ← ' + Array.from({length: n}, (_, i) => letter + (i + 1)).join(' + ');
      reason = '把其他所有' + unit + '依次加到目标' + unit + '，每次都是倍加，所以行列式不变。';
    } else {
      if (a[target].every(zero)) throw new Error('整' + unit + '已经为 0，无需提取 x；可以直接读出行列式为 0。');
      if (a[target].some(p => !E.isZero(p[0]))) throw new Error('这一' + unit + '并非每个元素都含因子 x，暂时不能提取 x。');
      a[target] = a[target].map(p => normalize(p.slice(1)));
      s.factor = multiply(s.factor, [E.parse(0), E.parse(1)]);
      label = '从 ' + name + ' 提取 x';
      reason = '这一' + unit + '的每个多项式都含因子 x，把 x 移到行列式外。使用的是多项式恒等式，x = 0 时同样成立。';
    }
    s.matrix = axis === 'column' ? a.map((_, r) => a.map(row => row[r])) : a;
    const affected = affectedLines.flatMap(i => Array.from({length: n}, (_, j) => axis === 'row' ? {r: i, c: j} : {r: j, c: i}));
    return { state: freezeState(s.matrix, s.factor), label, reason, affected, direction: axis };
  }
  function permutationSign(permutation) {
    let inversions = 0;
    for (let i = 0; i < permutation.length; i++) for (let j = i + 1; j < permutation.length; j++) if (permutation[i] > permutation[j]) inversions++;
    return { sign: inversions % 2 ? -1 : 1, inversions };
  }
  function structure(state) {
    const a = state.matrix, n = a.length;
    for (let i = 0; i < n; i++) {
      if (a[i].every(zero)) return { type: 'zeroLine', axis: 'row', index: i, description: '第 ' + (i + 1) + ' 行全为 0，行列式为 0。' };
      if (a.every(row => zero(row[i]))) return { type: 'zeroLine', axis: 'column', index: i, description: '第 ' + (i + 1) + ' 列全为 0，行列式为 0。' };
    }
    const allWhereZero = predicate => a.every((row, r) => row.every((p, c) => !predicate(r, c) || zero(p)));
    const upper = allWhereZero((r, c) => r > c), lower = allWhereZero((r, c) => r < c);
    if (upper || lower) return { type: 'triangular', orientation: upper ? 'upper' : 'lower', permutation: Array.from({length: n}, (_, i) => i), sign: 1, description: '已经形成' + (upper ? '上' : '下') + '三角结构：主对角线元素相乘，再乘外因子。' };
    const antiUpper = allWhereZero((r, c) => r + c > n - 1), antiLower = allWhereZero((r, c) => r + c < n - 1);
    if (antiUpper || antiLower) {
      const permutation = Array.from({length: n}, (_, i) => n - i - 1), parity = permutationSign(permutation);
      return { type: 'antiTriangle', orientation: antiUpper ? 'upper' : 'lower', permutation, ...parity, description: '已经形成反三角结构：副对角线相乘，乘以 (−1)^' + (n * (n - 1) / 2) + '，再乘外因子。' };
    }
    const candidates = [];
    function walk(permutation, used) {
      if (candidates.length > 1) return;
      if (permutation.length === n) { candidates.push(permutation.slice()); return; }
      const row = permutation.length;
      for (let c = 0; c < n; c++) if (!used.has(c) && !zero(a[row][c])) { permutation.push(c); used.add(c); walk(permutation, used); used.delete(c); permutation.pop(); }
    }
    walk([], new Set());
    if (candidates.length === 1) {
      const permutation = candidates[0], parity = permutationSign(permutation);
      return { type: 'singleTerm', permutation, ...parity, description: '排列展开只剩一个非零项。选中的列依次为 ' + permutation.map(i => i + 1).join('、') + '，逆序数为 ' + parity.inversions + '；连同符号和外因子相乘即可。' };
    }
    return { type: 'none', description: '还没有形成可直接读值的结构。可以继续试着制造零、提取公因子，或调整行列顺序。' };
  }
  function readResult(state) {
    const info = structure(state);
    if (info.type === 'none') return null;
    if (info.type === 'zeroLine') return ZERO();
    let result = polynomial(state.factor);
    info.permutation.forEach((column, row) => { result = multiply(result, state.matrix[row][column]); });
    return constantMultiply(result, info.sign);
  }
  return Object.freeze({ initial, stateFromMatrix, apply, format, evaluate, matrixAt, determinantPolynomial, zeros, structure, readResult, equals, polynomial, cosTridiagonal, cofactorExpansion, permutationTerms, add, multiply, constantMultiply });
});
