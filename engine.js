(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DetEngine = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  // Public fractions use decimal strings so lesson history can be saved as JSON.
  // Arithmetic uses BigInt throughout; no floating-point determinant is involved.
  const abs = n => n < 0n ? -n : n;
  function gcd(a, b) {
    a = abs(a); b = abs(b);
    while (b !== 0n) { const t = b; b = a % b; a = t; }
    return a;
  }
  function rational(n, d = 1n) {
    if (d === 0n) throw new Error('分母不能为 0。');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    return Object.freeze({ n: String(n / g), d: String(d / g) });
  }
  function integerPart(value) {
    if (typeof value === 'bigint') return value;
    if (typeof value === 'number') {
      if (!Number.isSafeInteger(value)) throw new Error('整数超出精确数值范围，请改用字符串输入。');
      return BigInt(value);
    }
    if (typeof value !== 'string' || !/^[+-]?\d+$/.test(value.trim())) throw new Error('分子和分母必须是整数。');
    if (value.length > 2000) throw new Error('输入过长，请使用不超过 2000 位的数。');
    return BigInt(value.trim());
  }
  function decimal(value) {
    const match = /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/.exec(value);
    if (!match) throw new Error('请输入整数、有限小数或 p/q 形式的分数。');
    const frac = match[3] || match[4] || '';
    const exponent = Number(match[5] || 0);
    if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 1000) throw new Error('指数过大，请使用 −1000 到 1000 之间的指数。');
    let n = BigInt((match[2] || '0') + frac);
    if (match[1] === '-') n = -n;
    const places = frac.length - exponent;
    return places >= 0 ? rational(n, 10n ** BigInt(places)) : rational(n * 10n ** BigInt(-places));
  }
  function parse(value) {
    if (value && typeof value === 'object' && !Array.isArray(value) && 'n' in value && 'd' in value) {
      return rational(integerPart(value.n), integerPart(value.d));
    }
    if (typeof value === 'bigint') return rational(value);
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) throw new Error('不能输入无穷大或非数值。');
      if (Number.isInteger(value) && !Number.isSafeInteger(value)) throw new Error('整数超出精确数值范围，请改用字符串输入。');
      value = String(value);
    }
    if (typeof value !== 'string' || !value.trim()) throw new Error('请输入一个有效数值。');
    const text = value.trim().replace(/−/g, '-');
    if (text.length > 2000) throw new Error('输入过长，请使用不超过 2000 位的数。');
    const parts = text.split('/');
    if (parts.length === 2) return rational(integerPart(parts[0].trim()), integerPart(parts[1].trim()));
    if (parts.length !== 1) throw new Error('分数格式应为 p/q。');
    return decimal(text);
  }
  function add(a, b) { a = parse(a); b = parse(b); return rational(BigInt(a.n) * BigInt(b.d) + BigInt(b.n) * BigInt(a.d), BigInt(a.d) * BigInt(b.d)); }
  function neg(a) { a = parse(a); return rational(-BigInt(a.n), BigInt(a.d)); }
  function sub(a, b) { return add(a, neg(b)); }
  function mul(a, b) { a = parse(a); b = parse(b); return rational(BigInt(a.n) * BigInt(b.n), BigInt(a.d) * BigInt(b.d)); }
  function div(a, b) { a = parse(a); b = parse(b); if (b.n === '0') throw new Error('不能除以 0。'); return rational(BigInt(a.n) * BigInt(b.d), BigInt(a.d) * BigInt(b.n)); }
  function fmt(value) { const a = parse(value); return a.d === '1' ? a.n : a.n + '/' + a.d; }
  function toNumber(value) { const a = parse(value); return Number(a.n) / Number(a.d); }
  function isZero(value) { return parse(value).n === '0'; }
  function eq(a, b) { a = parse(a); b = parse(b); return a.n === b.n && a.d === b.d; }
  function compare(a, b) { const difference = sub(a, b); return BigInt(difference.n) < 0n ? -1 : difference.n === '0' ? 0 : 1; }
  function normalizeMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length < 1 || matrix.length > 6) throw new Error('矩阵阶数须为 1 至 6。');
    const n = matrix.length;
    if (matrix.some(row => !Array.isArray(row) || row.length !== n)) throw new Error('行列式必须对应方阵，每行的元素个数应与行数相同。');
    return matrix.map((row, i) => row.map((value, j) => {
      try { return parse(value); }
      catch (error) { throw new Error('第 ' + (i + 1) + ' 行第 ' + (j + 1) + ' 列：' + error.message); }
    }));
  }
  function detOfNormalized(matrix) {
    const a = matrix.map(row => row.slice());
    let result = parse(1);
    for (let col = 0; col < a.length; col++) {
      let pivot = col;
      while (pivot < a.length && isZero(a[pivot][col])) pivot++;
      if (pivot === a.length) return parse(0);
      if (pivot !== col) { [a[pivot], a[col]] = [a[col], a[pivot]]; result = neg(result); }
      const pivotValue = a[col][col];
      result = mul(result, pivotValue);
      for (let row = col + 1; row < a.length; row++) {
        if (isZero(a[row][col])) continue;
        const factor = div(a[row][col], pivotValue);
        for (let j = col + 1; j < a.length; j++) a[row][j] = sub(a[row][j], mul(factor, a[col][j]));
        a[row][col] = parse(0);
      }
    }
    return result;
  }
  function determinant(matrix) { return detOfNormalized(normalizeMatrix(matrix)); }
  function transpose(matrix) {
    const a = normalizeMatrix(matrix);
    return a.map((_, i) => a.map(row => row[i]));
  }
  function normalizeAxis(axis) {
    if (axis === 'row') return axis;
    if (axis === 'column' || axis === 'col') return 'column';
    throw new Error('请选择行操作或列操作。');
  }
  function validIndex(index, n, name) {
    if (!Number.isInteger(index) || index < 0 || index >= n) throw new Error(name + '编号超出矩阵范围。');
  }
  function applyOperation(matrix, operation) {
    if (!operation || typeof operation !== 'object') throw new Error('请指定一个有效操作。');
    const original = normalizeMatrix(matrix);
    const axis = normalizeAxis(operation.axis || 'row');
    const type = operation.type;
    if (!['add', 'swap', 'scale'].includes(type)) throw new Error('仅支持倍加、交换和倍乘操作。');
    const target = operation.target, source = operation.source;
    validIndex(target, original.length, '目标');
    if (type !== 'scale') {
      validIndex(source, original.length, '来源');
      if (source === target) throw new Error('来源与目标不能是同一' + (axis === 'row' ? '行' : '列') + '。');
    }
    const factor = type === 'swap' ? parse(1) : parse(operation.factor);
    if (type === 'scale' && isZero(factor)) throw new Error('倍乘系数不能为 0；乘以 0 会丢失原行列式的信息。');
    const a = axis === 'column' ? transpose(original) : original.map(row => row.slice());
    let ratio, description, label;
    const unit = axis === 'row' ? '行' : '列';
    const symbol = axis === 'row' ? 'R' : 'C';
    const t = symbol + (target + 1), s = symbol + (source + 1);
    if (type === 'swap') {
      [a[source], a[target]] = [a[target], a[source]];
      ratio = parse(-1);
      description = '交换第 ' + (target + 1) + ' ' + unit + '与第 ' + (source + 1) + ' ' + unit + '，行列式变号。';
      label = t + ' ↔ ' + s;
    } else if (type === 'scale') {
      a[target] = a[target].map(value => mul(value, factor));
      ratio = factor;
      description = '第 ' + (target + 1) + ' ' + unit + '乘以 ' + fmt(factor) + '，行列式也乘以 ' + fmt(factor) + '。';
      label = t + ' ← (' + fmt(factor) + ') ' + t;
    } else {
      a[target] = a[target].map((value, j) => add(value, mul(factor, a[source][j])));
      ratio = parse(1);
      description = '将第 ' + (source + 1) + ' ' + unit + '的 ' + fmt(factor) + ' 倍加到第 ' + (target + 1) + ' ' + unit + '，行列式不变。';
      label = t + ' ← ' + t + ' + (' + fmt(factor) + ') ' + s;
    }
    const result = axis === 'column' ? transpose(a) : a;
    return { matrix: result, ratio, before: detOfNormalized(original), after: detOfNormalized(result), description, label, operation: { type, axis, target, ...(type !== 'scale' ? { source } : {}), ...(type !== 'swap' ? { factor } : {}) } };
  }
  function permutationTerms(matrix) {
    const a = normalizeMatrix(matrix);
    if (a.length > 5) throw new Error('排列展开最多展示 5 阶；6 阶有 720 项，请先降阶。');
    const terms = [];
    function walk(permutation, used) {
      if (permutation.length === a.length) {
        let inversions = 0, product = parse(1);
        for (let i = 0; i < a.length; i++) {
          product = mul(product, a[i][permutation[i]]);
          for (let j = i + 1; j < a.length; j++) if (permutation[i] > permutation[j]) inversions++;
        }
        const sign = inversions % 2 ? -1 : 1;
        terms.push({ permutation: permutation.slice(), inversions, sign, product, value: mul(product, sign), cells: permutation.map((column, row) => ({ row, column, value: a[row][column] })) });
        return;
      }
      for (let col = 0; col < a.length; col++) if (!used.has(col)) {
        used.add(col); permutation.push(col); walk(permutation, used); permutation.pop(); used.delete(col);
      }
    }
    walk([], new Set());
    return terms;
  }
  function cofactorExpansion(matrix, axis = 'row', index = 0) {
    const a = normalizeMatrix(matrix);
    axis = normalizeAxis(axis);
    validIndex(index, a.length, '展开');
    const terms = a.map((_, other) => {
      const row = axis === 'row' ? index : other, column = axis === 'row' ? other : index;
      const minor = a.filter((_, i) => i !== row).map(values => values.filter((_, j) => j !== column));
      const sign = (row + column) % 2 ? -1 : 1;
      const minorDeterminant = detOfNormalized(minor);
      const cofactor = mul(sign, minorDeterminant);
      return { row, column, element: a[row][column], sign, minor, minorDeterminant, cofactor, value: mul(a[row][column], cofactor) };
    });
    return { matrix: a, axis, index, terms, total: terms.reduce((sum, term) => add(sum, term.value), parse(0)) };
  }
  function blockInfo(matrix, split) {
    const a = normalizeMatrix(matrix);
    const rowSplit = typeof split === 'object' && split !== null ? split.row : split;
    const columnSplit = typeof split === 'object' && split !== null ? (split.column ?? split.col) : split;
    for (const value of [rowSplit, columnSplit]) if (!Number.isInteger(value) || value < 1 || value >= a.length) throw new Error('分块位置必须在矩阵内部，且两侧都至少保留一行或一列。');
    const blocks = {
      A: a.slice(0, rowSplit).map(row => row.slice(0, columnSplit)),
      B: a.slice(0, rowSplit).map(row => row.slice(columnSplit)),
      C: a.slice(rowSplit).map(row => row.slice(0, columnSplit)),
      D: a.slice(rowSplit).map(row => row.slice(columnSplit))
    };
    const upperZero = blocks.B.every(row => row.every(isZero));
    const lowerZero = blocks.C.every(row => row.every(isZero));
    const squareDiagonal = rowSplit === columnSplit;
    const valid = squareDiagonal && (upperZero || lowerZero);
    const reason = !squareDiagonal ? '对角位置的两个子块不是方阵，不能直接使用对角块行列式相乘的公式。' : !valid ? '两个非对角块都含有非零元素，当前分块不能直接写成 det(A)·det(D)。' : '对角子块均为方阵，且' + (upperZero && lowerZero ? '两个非对角块都为零' : upperZero ? '右上块为零' : '左下块为零') + '，因此整个行列式等于两个对角块行列式的乘积。';
    return { blocks, rowSplit, columnSplit, squareDiagonal, upperZero, lowerZero, valid, reason, determinant: detOfNormalized(a), detA: squareDiagonal ? detOfNormalized(blocks.A) : null, detD: squareDiagonal ? detOfNormalized(blocks.D) : null, product: valid ? mul(detOfNormalized(blocks.A), detOfNormalized(blocks.D)) : null };
  }
  return Object.freeze({ parse, fmt, toNumber, isZero, eq, compare, add, sub, neg, mul, div, normalizeMatrix, determinant, applyOperation, transpose, permutationTerms, cofactorExpansion, blockInfo });
});
