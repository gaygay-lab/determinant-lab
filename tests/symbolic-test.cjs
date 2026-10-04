'use strict';
const assert = require('node:assert/strict');
const E = require('../engine.js');
const G = require('../symbolic.js');
let checks = 0;
function equal(a, b) { assert.ok(G.equals(a, b), G.format(a) + ' != ' + G.format(b)); checks++; }
function invariant(state) {
  equal(G.determinantPolynomial(state), 'x^4');
  for (const x of [-3, '-1/2', 0, '1/2', 1, 2, 7]) {
    const numeric = E.mul(G.evaluate(state.factor, x), E.determinant(G.matrixAt(state, x)));
    assert.ok(E.eq(numeric, E.mul(E.mul(x, x), E.mul(x, x))), 'x=' + x); checks++;
  }
}
function throws(fn, pattern) { assert.throws(fn, pattern); checks++; }
let state = G.initial();
const original = JSON.stringify(state);
invariant(state);
assert.equal(G.format(G.determinantPolynomial(state)), 'x⁴'); checks++;
assert.equal(G.format(G.determinantPolynomial(state), {html:true}), 'x<sup>4</sup>'); checks++;
assert.equal(G.zeros(state), 0); checks++;
assert.equal(G.structure(state).type, 'none'); checks++;
assert.equal(G.readResult(state), null); checks++;
for (const axis of ['row', 'column']) {
  for (const op of [{type:'add',target:2,source:0,factor:'-3/2'}, {type:'swap',target:0,source:3}, {type:'scale',target:1,factor:'-2/3'}, {type:'sum',target:0}]) {
    const result = G.apply(state, {...op, axis}); invariant(result.state);
    assert.ok(result.affected.length >= 4); checks++;
    assert.equal(result.direction, axis); checks++;
  }
}
invariant(G.apply(state, {type:'transpose'}).state);
assert.equal(JSON.stringify(state), original); checks++;
throws(() => G.apply(state, {type:'scale',target:0,factor:0}), /不能为 0/);
throws(() => G.apply(state, {type:'add',target:0,source:0,factor:2}), /不能是同一/);
throws(() => G.apply(state, {type:'scale',target:0,factor:'x'}), /整数/);
throws(() => G.apply(state, {type:'extractX',target:0}), /并非每个/);

// User's handwritten route: sum columns, extract x, then eliminate constants.
state = G.apply(state, {type:'sum',axis:'column',target:0}).state;
state = G.apply(state, {type:'extractX',axis:'column',target:0}).state;
invariant(state); equal(state.factor, 'x');
for (const [target, factor] of [[1,1], [2,-1], [3,1]]) {
  state = G.apply(state, {type:'add',axis:'column',target,source:0,factor}).state;
  invariant(state);
}
assert.equal(G.structure(state).type, 'antiTriangle'); checks++;
equal(G.readResult(state), 'x^4');
assert.equal(G.zeros(state), 9); checks++;
const restored = JSON.parse(JSON.stringify(state));
invariant(restored); equal(G.readResult(restored), 'x^4');
for (let c = 1; c < 4; c++) state = G.apply(state, {type:'extractX',axis:'column',target:c}).state;
invariant(state); equal(state.factor, 'x^4'); equal(G.readResult(state), 'x^4');

// A different player-chosen route using only row operations.
state = G.apply(G.initial(), {type:'sum',axis:'row',target:0}).state;
invariant(state);
state = G.apply(state, {type:'scale',axis:'row',target:1,factor:'-5/7'}).state;
state = G.apply(state, {type:'swap',axis:'column',target:0,source:2}).state;
state = G.apply(state, {type:'transpose'}).state;
state = G.apply(state, {type:'add',axis:'column',target:3,source:1,factor:'2/3'}).state;
invariant(state);

let custom = G.stateFromMatrix([[1,2,3],[0,2,4],[0,0,'x-1']], '-1/2');
assert.equal(G.structure(custom).type, 'triangular'); checks++;
equal(G.readResult(custom), '-x+1');
custom = G.stateFromMatrix([[0,0,2],[0,'x',1],[3,4,5]], 2);
assert.equal(G.structure(custom).type, 'antiTriangle'); checks++;
equal(G.readResult(custom), '-12x');
custom = G.stateFromMatrix([[0,1,0],[0,0,2],[3,0,0]], 2);
assert.equal(G.structure(custom).type, 'singleTerm'); checks++;
equal(G.readResult(custom), 12);
custom = G.stateFromMatrix([[1,0],[2,0]]);
assert.equal(G.structure(custom).type, 'zeroLine'); checks++;
equal(G.readResult(custom), 0);
throws(() => G.apply(custom, {type:'extractX',axis:'column',target:1}), /已经为 0/);
custom = G.stateFromMatrix([['x^2', '2x'], [0, 1]]);
const extracted = G.apply(custom, {type:'extractX',axis:'row',target:0}).state;
equal(G.determinantPolynomial(extracted), 'x^2');
assert.ok(E.eq(G.evaluate(G.determinantPolynomial(extracted), 0), 0)); checks++;
equal(G.polynomial('1/2x^2-x+3/4'), ['3/4', -1, '1/2']);
assert.equal(G.format(['3/4', -1, '1/2']), '(1/2)x² − x + 3/4'); checks++;
console.log('SymbolicGame: ' + checks + ' checks passed.');
