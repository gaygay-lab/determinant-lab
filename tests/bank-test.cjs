const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const G=require('../symbolic.js');
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../problems.js'),'utf8'),sandbox);
const problems=sandbox.window.PROBLEMS;
assert.equal(problems.length,78);
let moves=0;
for(const problem of problems){
  let state=G.stateFromMatrix(problem.matrix);
  assert.ok(G.equals(G.determinantPolynomial(state),problem.expected),'Initial '+problem.id);
  for(const op of problem.suggestedOps){
    state=G.apply(state,op).state;
    assert.ok(G.equals(G.determinantPolynomial(state),problem.expected),'Invariant '+problem.id);
    moves++;
  }
  const result=G.readResult(state);
  if(problem.special && problem.suggestedOps.length===0){ assert.ok(G.equals(G.determinantPolynomial(state),problem.expected),'Special answer '+problem.id); continue; }
  assert.notEqual(result,null,'Readable '+problem.id);
  assert.ok(G.equals(result,problem.expected),'Answer '+problem.id);
}
console.log(`${problems.length} problems and ${moves} reference moves verified.`);

