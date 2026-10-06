const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const G=require('../symbolic.js');
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../problems.js'),'utf8'),sandbox);
const problems=sandbox.window.PROBLEMS;
assert.equal(problems.length,78);
assert.equal(JSON.stringify(Array.from(problems.slice(0,20),p=>p.id)),JSON.stringify([61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,2,3]),'前20关顺序必须保持');
assert.ok(problems.slice(20).every(p=>p.sourceKind==='exam-determinant'&&[2011,2012,2013,2014,2015,2019,2020,2022,2023,2024].includes(p.sourceYear)),'第21关起必须来自所给期末资料');
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

