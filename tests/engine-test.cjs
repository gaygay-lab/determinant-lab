'use strict';
const assert = require('node:assert/strict');
const E = require('../engine.js');
let checks = 0;
const equal = (actual, expected) => { assert.equal(E.fmt(actual), String(expected)); checks++; };
const throws = (fn, pattern) => { assert.throws(fn, pattern); checks++; };

equal(E.parse('3/6'), '1/2');
equal(E.parse('-12/-8'), '3/2');
equal(E.parse('-.125'), '-1/8');
equal(E.parse('1.2e-3'), '3/2500');
equal(E.parse(1e-7), '1/10000000');
equal(E.parse('9007199254740993'), '9007199254740993');
equal(E.add('1/3', '1/6'), '1/2');
equal(E.mul('123456789123456789', '987654321987654321'), '121932631356500531347203169112635269');
throws(() => E.parse(Infinity), /无穷/);
throws(() => E.parse(NaN), /非数值/);
throws(() => E.parse('1/0'), /分母/);
throws(() => E.parse('NaN'), /整数/);
throws(() => E.parse(9007199254740992), /精确/);
throws(() => E.parse(''), /有效/);
throws(() => E.determinant([[1, 2], [3]]), /方阵/);

const A = [[2, 3, 1], [4, 1, -3], [1, 2, 0]];
const untouched = JSON.stringify(A);
equal(E.determinant(A), 10);
equal(E.determinant(E.transpose(A)), 10);
equal(E.determinant([[1, 2], [2, 4]]), 0);
equal(E.determinant([[0, 1], [1, 0]]), -1);
equal(E.determinant([['1/2', '1/3'], ['2/3', '3/4']]), '11/72');
equal(E.determinant([['1/9']]), '1/9');
const six = Array.from({length: 6}, (_, i) => Array.from({length: 6}, (_, j) => i === j ? '1000000' : j > i ? 7 : 0));
equal(E.determinant(six), '1000000000000000000000000000000000000');
for (const axis of ['row', 'column']) {
  const added = E.applyOperation(A, { type: 'add', axis, target: 1, source: 0, factor: '-3/2' });
  equal(added.after, 10); equal(added.ratio, 1);
  const swapped = E.applyOperation(A, { type: 'swap', axis, target: 2, source: 0 });
  equal(swapped.after, -10); equal(swapped.ratio, -1);
  const scaled = E.applyOperation(A, { type: 'scale', axis, target: 2, factor: '-1/4' });
  equal(scaled.after, '-5/2'); equal(scaled.ratio, '-1/4');
  const singular = E.applyOperation([[1, 2], [2, 4]], { type: 'scale', axis, target: 1, factor: 3 });
  equal(singular.after, 0); equal(singular.ratio, 3);
}
assert.equal(JSON.stringify(A), untouched); checks++;
throws(() => E.applyOperation(A, { type: 'add', target: 1, source: 1, factor: 2 }), /同一/);
throws(() => E.applyOperation(A, { type: 'swap', target: 1, source: 1 }), /同一/);
throws(() => E.applyOperation(A, { type: 'scale', target: 1, factor: 0 }), /不能为 0/);
throws(() => E.applyOperation(A, { type: 'scale', target: 1, factor: Infinity }), /无穷/);
throws(() => E.applyOperation(A, { type: 'add', target: 1, source: 5, factor: 2 }), /超出/);

const terms = E.permutationTerms(A);
assert.equal(terms.length, 6); checks++;
equal(terms.reduce((s, t) => E.add(s, t.value), E.parse(0)), 10);
assert.deepEqual(terms.find(t => t.permutation.join() === '2,1,0').inversions, 3); checks++;
throws(() => E.permutationTerms(six), /最多展示 5/);
for (const axis of ['row', 'column']) for (let i = 0; i < 3; i++) equal(E.cofactorExpansion(A, axis, i).total, 10);
equal(E.cofactorExpansion([[7]]).terms[0].minorDeterminant, 1);
equal(E.cofactorExpansion([[7]]).total, 7);

const blockLower = E.blockInfo([[1, 2, 0], [3, 4, 0], [7, 8, 9]], 2);
assert.equal(blockLower.valid, true); checks++;
equal(blockLower.product, -18); equal(blockLower.determinant, -18);
const blockUpper = E.blockInfo([[2, 7, 9], [0, 3, 4], [0, 1, 2]], 1);
assert.equal(blockUpper.valid, true); checks++;
equal(blockUpper.product, 4);
const wrong = E.blockInfo([[1, 2], [3, 4]], 1);
assert.equal(wrong.valid, false); assert.equal(wrong.product, null); checks += 2;
const nonsquare = E.blockInfo([[1, 1, 1, 0, 0], [1, 2, 3, 0, 0], [0, 1, 1, 1, 1], [0, 2, 3, 4, 5], [0, 4, 9, 16, 25]], {row: 2, column: 3});
assert.equal(nonsquare.valid, false); assert.equal(nonsquare.squareDiagonal, false); checks += 2;
throws(() => E.blockInfo(A, 0), /内部/);

// Independent Leibniz sums validate Gaussian elimination on 100 varied matrices.
for (let seed = 1; seed <= 100; seed++) {
  const n = 1 + seed % 5;
  const m = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => ((seed * (i + 3) + j * 7 + i * j) % 13 - 6) + '/' + (1 + (seed + i + j) % 3)));
  const sum = E.permutationTerms(m).reduce((s, t) => E.add(s, t.value), E.parse(0));
  assert.ok(E.eq(E.determinant(m), sum), 'seed ' + seed); checks++;
}
console.log('DetEngine: ' + checks + ' checks passed.');
