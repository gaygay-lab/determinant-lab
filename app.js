(() => {
  'use strict';
  const $=id=>document.getElementById(id), G=window.SymbolicGame, E=window.DetEngine, S=window.LabSound;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sub=['₁','₂','₃','₄','₅','₆'];
  const problemOrder=[61,62,63,64,65,66,67,68,69,70,2,3,4,6,9,11,18,19,20,23,31,32,39,45,47,50,51,52,54,55,57,59,60,1]; const orderRank=new Map(problemOrder.map((id,i)=>[id,i])); const problems=[...window.PROBLEMS].sort((a,b)=>(orderRank.get(a.id)??999+a.id)-(orderRank.get(b.id)??999+b.id)); let problem=problems[0], savedGames={};
  const pretty=s=>String(s).replace(/([RC])([1-6])/g,(_,a,b)=>a.toLowerCase()+sub[Number(b)-1]).replace(/\+ \(-1\)/g,'− ').replace(/\+ \(1\)/g,'+ ').replace(/-/g,'−');
  let history=[{state:G.stateFromMatrix(problem.matrix),label:'原式',reason:'选择自己的第一步。'}],index=0;
  let axis='column',target=0,source=1,type='add',numeric=false,x=2,preview=false,compact=false,won=false;
  let animationTimer=null,toastTimer=null,hintCount=0, idleTimer=null, advanceTimer=null, demoVisible=false, answerCandidate=null, manualCoefficient=false, longPressTimer=null, longPressFired=false;
  S.init();
  const current=()=>history[index].state;
  const n=()=>current().matrix.length;
  const indices=()=>Array.from({length:n()},(_,i)=>i);
  const levelIndex=()=>problems.findIndex(p=>p.id===problem.id)+1;
  const levelLabel=()=>String(levelIndex()).padStart(2,'0');
  const linePolys=()=>{const s=current();return axis==='row'?s.matrix[target]:s.matrix.map(row=>row[target]);};
  const factorInfo=()=>{const line=linePolys();if(!line.length||line.every(p=>p.every(E.isZero)))return null;const hasX=line.every(p=>p.length>1&&E.isZero(p[0]));if(hasX)return {kind:'x',value:'x',label:'提取 x'};if(line.some(p=>p.length!==1))return null;let nums=line.map(p=>p[0]).filter(v=>!E.isZero(v));if(!nums.length)return null;const abs=v=>E.compare(v,0)<0?E.neg(v):v;const gcd=(a,b)=>{a=BigInt(a);b=BigInt(b);while(b){const t=a%b;a=b;b=t;}return a<0n?-a:a};const lcm=(a,b)=>a/gcd(a,b)*b;let gn=0n,ld=1n;for(const v of nums){const f=E.parse(v);const nn=BigInt(f.n<0?'-'+f.n.slice(1):f.n),dd=BigInt(f.d);gn=gn?gcd(gn,nn):nn;ld=lcm(ld,dd);}const factor=E.parse(gn.toString()+'/'+ld.toString());if(E.eq(factor,1)||E.eq(factor,-1))return null;return {kind:'constant',value:E.fmt(factor),label:'提取公因子 '+E.fmt(factor)};};
  function autoFactor(){
    if(type==='add'){
      const s=current().matrix, targetLine=axis==='row'?s[target]:s.map(row=>row[target]), sourceLine=axis==='row'?s[source]:s.map(row=>row[source]);
      for(let i=0;i<targetLine.length;i++){const a=targetLine[i],b=sourceLine[i];if(a.length===1&&b.length===1&&!E.isZero(a[0])&&!E.isZero(b[0]))return E.div(E.neg(a[0]),b[0]);}
    }
    if(type==='scale'){const line=linePolys();for(const p of line){if(p.length===1&&!E.isZero(p[0]))return E.div(1,p[0]);}}
    return null;
  }
  function syncCoefficient(){if(manualCoefficient||!['add','scale'].includes(type))return;const k=autoFactor();if(k){$('coefficient').value=E.fmt(k);$('coefficientHelp').textContent='已自动计算；可按“自动计算”重新同步。';}else{$('coefficientHelp').textContent='当前选项不能自动确定倍数；可手动输入整数或分数。';}}
  const effectiveOp=()=>{const base=op(),info=type==='extractX'?factorInfo():null;if(type==='extractX'&&info?.kind==='constant'){base.type='scale';base.factor=E.fmt(E.div(1,info.value));}return base;};
  function armIdle(){clearTimeout(idleTimer);demoVisible=false;$('demoAssist').hidden=true;$('demoPanel').hidden=true;idleTimer=setTimeout(()=>{demoVisible=true;$('demoAssist').hidden=false;feedback('已经尝试一分钟了。需要时可以打开黄色的最短演示；也可以继续自己探索。');},60000);}
  function resetIdle(){armIdle();}

  const op=()=>({type,axis,target,source,factor:$('coefficient').value.trim().replace('−','-')});
  const zero=p=>G.equals(p,0);
  function persist(){try{savedGames[problem.id]={history,index,solved:!!savedGames[problem.id]?.solved};localStorage.setItem('det-lab-bank-v4',JSON.stringify({version:4,active:problem.id,games:savedGames}));}catch{$('saveStatus').textContent='当前浏览器暂不能保存路线。';}}
  try{const saved=JSON.parse(localStorage.getItem('det-lab-bank-v4'));if(saved?.version===4&&saved.games){savedGames=saved.games;problem=problems.find(p=>p.id===saved.active)||problems[0];const route=savedGames[problem.id];if(route&&Array.isArray(route.history)&&route.history.length<500&&Number.isInteger(route.index)&&route.index>=0&&route.index<route.history.length&&G.equals(G.determinantPolynomial(route.history[route.index].state),problem.expected)){history=route.history;index=route.index;}else{history=[{state:G.stateFromMatrix(problem.matrix),label:'原式',reason:'选择自己的第一步。'}];index=0;}}}catch{problem=problems[0];history=[{state:G.stateFromMatrix(problem.matrix),label:'原式',reason:'选择自己的第一步。'}];index=0;}
  if(savedGames[problem.id]?.solved){const nextUnsolved=problems.find(p=>!savedGames[p.id]?.solved);if(nextUnsolved){problem=nextUnsolved;history=[{state:G.stateFromMatrix(problem.matrix),label:'原式',reason:'开始下一关。'}];index=0;}}
  function countTerms(matrix){let count=0;function walk(r,used){if(r===matrix.length){count++;return;}for(let c=0;c<matrix.length;c++)if(!(used&(1<<c))&&!zero(matrix[r][c]))walk(r+1,used|(1<<c));}walk(0,0);return count;}
  function getZeroBlocks(matrix){
    const candidates=[];for(let r=0;r<matrix.length;r++)for(let c=0;c<matrix.length;c++)for(let h=1;r+h<=matrix.length;h++)for(let w=1;c+w<=matrix.length;w++)if(h*w>=3){let all=true;for(let i=r;i<r+h;i++)for(let j=c;j<c+w;j++)if(!zero(matrix[i][j]))all=false;if(all)candidates.push({r,c,h,w,area:h*w});}
    candidates.sort((a,b)=>b.area-a.area);const taken=new Set(),result=[];
    for(const b of candidates){const ids=[];for(let r=b.r;r<b.r+b.h;r++)for(let c=b.c;c<b.c+b.w;c++)ids.push(r*matrix.length+c);if(ids.every(id=>!taken.has(id))){result.push(b);ids.forEach(id=>taken.add(id));}}
    return result;
  }
  function candidate(){try{return {move:G.apply(current(),effectiveOp())};}catch(e){return {error:e.message};}}
  function feedback(text,kind=''){clearTimeout(toastTimer);$('feedback').textContent=text;$('feedback').className='play-feedback'+(kind?' is-'+kind:'');}
  function labelForOp(){const a=(axis==='row'?'r':'c'),t=a+sub[target],s=a+sub[source],k=$('coefficient').value.trim()||'?';return {add:`${t} ← ${t} + (${k})${s}`,sum:`${t} ← ${indices().map(i=>a+sub[i]).join(' + ')}`,swap:`${t} ↔ ${s}`,scale:`${t} ← (${k})${t}`,extractX:(factorInfo()?.label||`从 ${t} 提取公因子`),transpose:'行 ↔ 列；D 不变'}[type];}
  function describe(){const v=candidate();$('operationPreview').textContent=v.move?pretty(v.move.label):labelForOp();$('operationReason').textContent=v.move?v.move.reason:v.error;$('operationReason').classList.toggle('error',!!v.error);$('formula').textContent=preview?(v.error?'这一步暂不可用':pretty(v.move.label)):(index?pretty(history[index].label):'选择位置，再选择一个动作。');return v;}
  function render(){
    syncCoefficient();
    const state=current(),v=describe(),shown=preview&&v.move?v.move.state:state,withSource=type==='add'||type==='swap';
    $('boardWrap').style.setProperty('--n',n());
    $('boardWrap').classList.toggle('order-5',n()>=5);
    $('axis').value=axis;
    for(const id of ['target','source']){$(id).innerHTML=indices().map(i=>`<option value="${i}">${axis==='row'?'r':'c'}${sub[i]}</option>`).join('');$(id).value=id==='target'?target:source;}
    $('source').disabled=!withSource;$('sourceLabel').classList.toggle('inactive',!withSource);$('target').disabled=type==='transpose';$('axis').disabled=type==='transpose';
    $('coefficientLabel').hidden=!['add','scale'].includes(type);
    const fi=factorInfo(), extractButton=document.querySelector('[data-op="extractX"]');
    if(extractButton){const available=!!fi;extractButton.disabled=!available;extractButton.classList.toggle('unavailable',!available);extractButton.setAttribute('aria-label',available?fi.label:'当前选中行列没有可提取的公因子');$('extractTitle').firstChild.textContent=available?fi.label:'提出公因子';$('extractHint').textContent=available?'点击即可提出 '+fi.value:'选中含共同因子的行列后可用';}

    document.querySelectorAll('[data-op]').forEach(b=>{b.classList.toggle('active',b.dataset.op===type);b.setAttribute('aria-pressed',String(b.dataset.op===type));});
    for(const a of ['column','row'])$(a==='column'?'columnHandles':'rowHandles').innerHTML=indices().map(i=>`<button class="matrix-handle ${axis===a&&target===i&&type!=='transpose'?'is-target':''} ${axis===a&&source===i&&withSource?'is-source':''}" data-axis="${a}" data-index="${i}" aria-label="选择第 ${i+1} ${a==='row'?'行':'列'}" aria-pressed="${axis===a&&target===i&&type!=='transpose'}">${a==='row'?'r':'c'}${sub[i]}</button>`).join('');
    const blocks=compact?getZeroBlocks(shown.matrix):[],covered=new Set();for(const b of blocks)for(let r=b.r;r<b.r+b.h;r++)for(let c=b.c;c<b.c+b.w;c++)covered.add(r*n()+c);
    const affected=new Set(preview&&v.move?v.move.affected.map(p=>p.r*n()+p.c):[]);
    $('matrix').innerHTML=shown.matrix.map((row,r)=>row.map((p,c)=>{const z=zero(p),line=axis==='row'?r:c,value=numeric?E.fmt(G.evaluate(p,x)):G.format(p),full=esc(value);return `<button class="play-cell ${line===target&&type!=='transpose'?'is-target':''} ${withSource&&line===source?'is-source':''} ${z?'is-zero':''} ${value.length>14?'very-long':value.length>7?'long':''} ${covered.has(r*n()+c)?'covered':''} ${affected.has(r*n()+c)?'previewed':''}" data-r="${r}" data-c="${c}" title="第${r+1}行，第${c+1}列：${full}" aria-label="第${r+1}行第${c+1}列，${full}">${numeric?full:G.format(p,{html:true})}</button>`;}).join('')).join('');
    $('blocks').innerHTML=blocks.map(b=>`<div class="zero-group" style="left:${b.c*100/n()}%;top:${b.r*100/n()}%;width:${b.w*100/n()}%;height:${b.h*100/n()}%"><span>0</span><small>${b.h} × ${b.w} 零块</small></div>`).join('');
    $('matrix').setAttribute('aria-label',(preview?'预览中的行列式：':'当前行列式：')+shown.matrix.map(row=>row.map(p=>numeric?E.fmt(G.evaluate(p,x)):G.format(p)).join('，')).join('；'));
    const factor=numeric?E.fmt(G.evaluate(shown.factor,x)):G.format(shown.factor);
    $('lhs').innerHTML=G.equals(shown.factor,1)?'D =':`D = (${esc(factor)}) ·`;
    $('compress').setAttribute('aria-pressed',String(compact));$('compress').textContent=compact?'▧ 展开零块':'▧ 收起零块';$('compress').disabled=getZeroBlocks(shown.matrix).length===0;
    if($('compress').disabled)compact=false;
    $('previewToggle').setAttribute('aria-pressed',String(preview));$('previewToggle').textContent=preview?'退出预览':'预览变化';
    const parameter=problem.matrix.some(row=>row.some(v=>String(v).includes('x')));
    $('numericMode').hidden=!parameter;$('symbolicMode').textContent=parameter?'符号':'矩阵';
    $('numericControls').hidden=!numeric||!parameter;$('numericMode').classList.toggle('active',numeric);$('symbolicMode').classList.toggle('active',!numeric);$('numericMode').setAttribute('aria-pressed',String(numeric));$('symbolicMode').setAttribute('aria-pressed',String(!numeric));
    if(numeric){$('xOutput').textContent=x;$('numericResult').textContent='当前数值 D = '+E.fmt(E.mul(E.determinant(G.matrixAt(shown,x)),G.evaluate(shown.factor,x)));}
    $('zeroCount').innerHTML=G.zeros(shown)+' <small>/ '+(n()*n())+'</small>';$('termCount').innerHTML=countTerms(shown.matrix)+' <small>/ '+indices().reduce((a,i)=>a*(i+1),1)+'</small>';
    $('undo').disabled=index===0;$('redo').disabled=index>=history.length-1;$('historyCount').textContent=index+' 步';
    $('history').innerHTML=history.map((entry,i)=>`<button class="history-item ${i===index?'current':i>index?'future':''}" data-history="${i}" ${i===index?'aria-current="step"':''}><small>${String(i).padStart(2,'0')}</small>${esc(pretty(entry.label))}</button>`).join('');
    const st=G.structure(shown),ready=st.type!=='none';$('stage').classList.toggle('readable',ready);$('structureText').textContent=st.description;$('readResult').classList.toggle('ready',ready);$('readResult').disabled=preview;$('readResult').firstChild.textContent=preview?'退出预览后读取结果 ':'我能读出结果了 ';
    $('stageCaption').textContent=preview?'预览：深色格子是这个动作将产生的结果。':ready?'结构已经可以读值；也可以继续尝试另一种化简。':numeric?'数值在变化；下方统计仍按符号结构计算。':`已选${axis==='row'?'行':'列'} ${axis==='row'?'r':'c'}${sub[target]} 为目标，你可以随时换位置。`;
    $('matrix').classList.toggle('success',won);$('result').hidden=!(won||answerCandidate);$('answerGate').hidden=!(answerCandidate&&!won);if(answerCandidate&&!won){$('answerFeedback').textContent='结构已读出，请填写答案后进入下一关。';}
    updateSound(); renderBank();
  }
  function startLongPress(e, element){const b=e.target.closest('[data-axis]')||e.target.closest('[data-r]');if(!b)return;if(e.button!==undefined&&e.button!==0&&e.button!==2)return;clearTimeout(longPressTimer);longPressFired=false;longPressTimer=setTimeout(()=>{longPressFired=true;const sourcePick=e.button===2;if(b.dataset.axis)selected(b.dataset.axis,Number(b.dataset.index),sourcePick);else selected(axis,Number(b.dataset[axis==='row'?'r':'c']),sourcePick);feedback(`长按已选中整${(b.dataset.axis||axis)==='row'?'行':'列'}，可以直接操作。`,'good');element?.classList.add('long-pressed');S.play('select');},420);}
  function endLongPress(element){clearTimeout(longPressTimer);if(element)setTimeout(()=>element.classList.remove('long-pressed'),520);}
  function selected(a,i,isSource=false){axis=a;if(isSource){source=i;if(source===target)target=(source+1)%n();}else{target=i;if(source===target)source=(target+1)%n();}preview=false;render();S.play('select');}
  function addMotionGhosts(oldState,operation){
    if(reduced.matches||!['add','sum'].includes(operation.type))return;
    const wrap=$('boardWrap'),matrix=$('matrix'),layer=document.createElement('div');layer.className='motion-layer';wrap.appendChild(layer);const wr=wrap.getBoundingClientRect(),sources=operation.type==='sum'?indices().filter(i=>i!==operation.target):[operation.source];let ghostIndex=0;
    for(const sourceLine of sources){for(let i=0;i<n();i++){const r=operation.axis==='row'?sourceLine:i,c=operation.axis==='column'?sourceLine:i,tr=operation.axis==='row'?operation.target:i,tc=operation.axis==='column'?operation.target:i;const from=matrix.querySelector(`[data-r="${r}"][data-c="${c}"]`),to=matrix.querySelector(`[data-r="${tr}"][data-c="${tc}"]`);if(!from||!to)continue;const fr=from.getBoundingClientRect(),toRect=to.getBoundingClientRect(),ghost=document.createElement('div');ghost.className='motion-ghost';ghost.textContent=G.format(oldState.matrix[r][c]);ghost.style.left=(fr.left-wr.left)+'px';ghost.style.top=(fr.top-wr.top)+'px';ghost.style.width=fr.width+'px';ghost.style.height=fr.height+'px';ghost.style.setProperty('--dx',(toRect.left-fr.left)+'px');ghost.style.setProperty('--dy',(toRect.top-fr.top)+'px');ghost.style.setProperty('--delay',(ghostIndex*42)+'ms');layer.appendChild(ghost);to.classList.add('target-pulse');ghostIndex++;}}
    setTimeout(()=>{layer.remove();matrix.querySelectorAll('.target-pulse').forEach(el=>el.classList.remove('target-pulse'));},900+ghostIndex*42);
  }
  function animate(move,oldState,operation){
    clearTimeout(animationTimer);$('actionArrows').innerHTML='';if(reduced.matches)return;addMotionGhosts(oldState,operation);
    const wrap=$('boardWrap'),style=getComputedStyle(wrap),cell=parseFloat(style.getPropertyValue('--cell')),row=parseFloat(style.getPropertyValue('--row'));
    move.affected.forEach(({r,c},i)=>{const el=$('matrix').querySelector(`[data-r="${r}"][data-c="${c}"]`);if(!el)return;const newZero=zero(move.state.matrix[r][c])&&!zero(oldState.matrix[r][c]);el.classList.add(newZero?'new-zero':'changed');let dx=0,dy=0;
      if(operation.type==='transpose'){dx=(r-c)*cell;dy=(c-r)*row;}
      else if(operation.type==='swap'){const from=operation.axis==='row'?r:c;const d=from===operation.target?operation.source-operation.target:operation.target-operation.source;if(operation.axis==='column')dx=d*cell;else dy=d*row;}
      else if(operation.axis==='column')dx=(operation.source-operation.target)*10||12;else dy=(operation.source-operation.target)*10||12;
      el.style.setProperty('--dx',dx+'px');el.style.setProperty('--dy',dy+'px');el.style.setProperty('--delay',Math.min(i,4)*25+'ms');
    });
    const w=wrap.offsetWidth+60,h=wrap.offsetHeight+70,points=[];const a=operation.axis;
    if(['add','swap','sum'].includes(operation.type)){
      const sources=operation.type==='sum'?indices().filter(i=>i!==operation.target):[operation.source];
      sources.forEach((s,i)=>{if(a==='column'){const x1=37+(s+.5)*cell,x2=37+(operation.target+.5)*cell;points.push(`M${x1} 48 Q${(x1+x2)/2} ${-8-i*9} ${x2} 48`);}else{const y1=41+(s+.5)*row,y2=41+(operation.target+.5)*row;points.push(`M40 ${y1} Q${-3-i*8} ${(y1+y2)/2} 40 ${y2}`);}});
    }
    $('actionArrows').setAttribute('viewBox',`0 0 ${w} ${h}`);$('actionArrows').innerHTML='<defs><marker id="moveHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" style="fill:currentColor;stroke:none;animation:none"/></marker></defs>'+points.map(d=>`<path d="${d}" marker-end="url(#moveHead)"/>`).join('');
    animationTimer=setTimeout(()=>{$('actionArrows').innerHTML='';document.querySelectorAll('.changed,.new-zero').forEach(el=>el.classList.remove('changed','new-zero'));},850);
  }
  function apply(){
    const requestedType=type,extractedInfo=requestedType==='extractX'?factorInfo():null,before=current(),operation=effectiveOp();let move;
    try{move=G.apply(before,operation);}catch(e){preview=false;render();feedback(e.message,'error');S.play('invalid');return;}
    if(requestedType==='extractX'&&extractedInfo?.kind==='constant'){move.label='从 '+(axis==='row'?'r':'c')+(target+1)+' 提取公因子 '+extractedInfo.value;move.reason='目标'+(axis==='row'?'行':'列')+'的每个元素都含公因子 '+extractedInfo.value+'，一键提出；外因子同步补偿。';}
    if(JSON.stringify(move.state)===JSON.stringify(before)){feedback('这个动作没有改变结构。你仍然可以换一个倍数或位置。');S.play('select');return;}
    history=history.slice(0,index+1);history.push({state:move.state,label:move.label,reason:move.reason});index++;if(requestedType==='extractX')type='add';answerCandidate=null;resetIdle();
    preview=false;won=false;persist();render();
    const delta=G.zeros(move.state)-G.zeros(before),terms=countTerms(move.state.matrix);
    feedback((delta>0?`新出现 ${delta} 个零。`:delta<0?`零少了 ${-delta} 个；这条路也可以继续探索。`:'结构变了；不必每一步都马上变简单。')+(terms===1?'现在只剩一个可能非零的乘积项。':''),delta>0?'good':'');
    animate(move,before,operation);
    const sound=requestedType==='swap'?'swap':requestedType==='extractX'?'extract':delta>0?'zero':'move';
    S.play(sound,{pan:operation.axis==='column'?Math.max(-.7,Math.min(.7,(operation.target-operation.source)*.22)):0});
    $('srStatus').textContent=pretty(move.label)+'。'+move.reason;
  }
  function travel(i){if(i<0||i>=history.length||i===index)return;const backwards=i<index;index=i;preview=false;won=false;answerCandidate=null;resetIdle();persist();render();feedback(`${backwards?'退回':'恢复'}到第 ${index} 步。${history[index].reason}`);S.play('undo');}
  $('apply').addEventListener('click',apply);
  $('operations').addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b||b.disabled)return;type=b.dataset.op;manualCoefficient=false;preview=false;if(type==='extractX'&&factorInfo())apply();else{render();S.play('select');if(type==='scale')$('coefficient').select();}});
  $('axis').addEventListener('change',e=>{axis=e.target.value;manualCoefficient=false;preview=false;render();S.play('select');});
  $('target').addEventListener('change',e=>{manualCoefficient=false;selected(axis,Number(e.target.value));});
  $('source').addEventListener('change',e=>{manualCoefficient=false;selected(axis,Number(e.target.value),true);});
  document.querySelectorAll('.column-handles,.row-handles').forEach(el=>{el.addEventListener('pointerdown',e=>startLongPress(e,el));el.addEventListener('pointerup',()=>endLongPress(el));el.addEventListener('pointercancel',()=>endLongPress(el));el.addEventListener('click',e=>{if(longPressFired){longPressFired=false;e.preventDefault();return;}const b=e.target.closest('[data-axis]');if(b)selected(b.dataset.axis,Number(b.dataset.index),false);});el.addEventListener('contextmenu',e=>{e.preventDefault();const b=e.target.closest('[data-axis]');if(b)selected(b.dataset.axis,Number(b.dataset.index),true);});});
  $('matrix').addEventListener('pointerdown',e=>startLongPress(e,$('matrix')));$('matrix').addEventListener('pointerup',()=>endLongPress($('matrix')));$('matrix').addEventListener('pointercancel',()=>endLongPress($('matrix')));
  $('matrix').addEventListener('click',e=>{if(longPressFired){longPressFired=false;e.preventDefault();return;}const c=e.target.closest('[data-r]');if(c)selected(axis,Number(c.dataset[axis==='row'?'r':'c']),false);});
  $('matrix').addEventListener('contextmenu',e=>{e.preventDefault();const c=e.target.closest('[data-r]');if(c)selected(axis,Number(c.dataset[axis==='row'?'r':'c']),true);});
  $('coefficient').maxLength=12;$('coefficient').addEventListener('input',()=>{manualCoefficient=true;if(preview)render();else describe();});$('coefficientAuto').addEventListener('click',()=>{manualCoefficient=false;syncCoefficient();describe();$('coefficient').focus();});
  $('coefficient').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();apply();}});
  $('previewToggle').addEventListener('click',()=>{preview=!preview;render();if(preview&&candidate().error)feedback(candidate().error,'error');else feedback(preview?'这只是预览，还没有改变你的路线。':'已回到当前状态。');});
  $('numericMode').addEventListener('click',()=>{numeric=true;render();});$('symbolicMode').addEventListener('click',()=>{numeric=false;render();});
  $('xValue').addEventListener('input',e=>{x=Number(e.target.value);render();});
  $('undo').addEventListener('click',()=>travel(index-1));$('redo').addEventListener('click',()=>travel(index+1));
  $('history').addEventListener('click',e=>{const b=e.target.closest('[data-history]');if(b)travel(Number(b.dataset.history));});
  $('compress').addEventListener('click',()=>{compact=!compact;render();S.play(compact?'zero':'undo');feedback(compact?'连续的零被收成了块。行列没有被删除，矩阵阶数不变。':'零块已展开。');});
  $('reset').addEventListener('click',()=>{if(index===0)return;travel(0);feedback('回到了原式；刚才的路线仍在记录里，可以重做或尝试新分支。');S.play('reset');});

  $('hint').addEventListener('click',()=>{hintCount++;const ready=G.structure(current()).type!=='none';$('hintText').hidden=false;$('hintText').textContent=ready?'结构已经可以读值了。':hintCount===1?problem.hint:(problem.note||problem.hint);$('hint').lastElementChild.textContent='−';});
  $('readResult').addEventListener('click',()=>{const result=G.readResult(current());if(result===null){feedback('当前结构还不能直接读值。可以先制造更多的零；这不是失败，继续试试。');$('structureText').textContent='目前还有 '+countTerms(current().matrix)+' 个可能非零的乘积项。尝试化为三角结构，或让排列展开只剩一项。';S.play('invalid');return;}answerCandidate=result;render();$('result').innerHTML=`<strong>你已经把结构化简到可以读值。</strong><span class="math">D = ${G.format(result,{html:true})}</span><small>${esc(G.structure(current()).description)}<br>现在把这个值填进答案框，答对后才会进入下一关。</small>`;feedback('答案已经露出来了，填写它，完成这一关。','good');$('answerInput').focus();S.play('extract');});
  function submitAnswer(){if(!answerCandidate)return;const raw=$('answerInput').value.trim().replace(/^D\s*=\s*/i,'');try{if(!G.equals(G.polynomial(raw),problem.expected)){throw new Error('答案还不对，再检查主对角线乘积和交换次数。');}won=true;if(!savedGames[problem.id])savedGames[problem.id]={};savedGames[problem.id].solved=true;persist();render();$('result').innerHTML=`<strong>答案正确，过关。</strong><span class="math">D = ${G.format(answerCandidate,{html:true})}</span><small>${esc(G.structure(current()).description)}<br>你用了 ${index} 次动作；下一关即将开始。</small>`;feedback('答对了，准备进入下一关。','good');S.play('success');resetIdle();clearTimeout(advanceTimer);advanceTimer=setTimeout(()=>{const next=problems[problems.findIndex(p=>p.id===problem.id)+1];if(next)switchProblem(next.id);},1400);}catch(err){$('answerFeedback').textContent=err.message;$('answerFeedback').className='answer-error';feedback('答案还不对，继续看结构。','error');S.play('invalid');}}
  $('answerSubmit').addEventListener('click',submitAnswer);$('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submitAnswer();}});
  function updateSound(){const on=S.isEnabled();$('soundToggle').setAttribute('aria-pressed',String(on));$('soundToggle').lastElementChild.textContent=on?'音效开':'音效关';}
  $('soundToggle').addEventListener('click',()=>{S.setEnabled(!S.isEnabled());updateSound();if(S.isEnabled())S.play('select');});window.addEventListener('labsoundchange',updateSound);
  let dialogTrigger=null;
  const sounds=[['select','选中','轻木击'],['move','移动','短促纸面摩擦'],['swap','交换','一来一回'],['zero','归零','轻轻落位'],['extract','提出因子','清脆单音'],['undo','撤销','回拨'],['invalid','条件不符','柔和提示'],['success','完成','短和弦'],['reset','重来','轻收束']];
  const dialogs={note:{title:'从这张笔记，走出自己的路线。',html:'<img src="note.jpg" width="1920" height="1092" alt="第一题手写笔记：四阶行列式，经汇总和消元求得 x 的四次方。"><p>笔记提供了一条思路，但自由实验不要求你照着它走。先转置、先交换、先从行入手，都可以。</p>'},help:{title:'你的选择，会真的改变矩阵。',html:'<ol><li><strong>选位置：</strong>左键点击矩阵边上的 r 或 c 选目标，右键点击选来源。也可以使用操作台下拉菜单。</li><li><strong>选动作：</strong>倍加、全部汇入、交换、提 x、倍乘、转置都可以尝试。倍加和交换还要选来源。</li><li><strong>先看后做：</strong>「预览变化」只预览结果；「执行这个动作」才会改变当前路线。</li><li><strong>走自己的路：</strong>零变多或变少都会如实显示。任何一步都能撤销、重做；退回后执行新动作会产生新的路线。</li><li><strong>结束挑战：</strong>当矩阵成为三角、反三角或排列展开只剩一项时，点「我能读出结果了」。</li></ol><p><span class="key">Ctrl Z</span> 撤销；<span class="key">Ctrl Y</span> 重做；<span class="key">T</span> 重置，<span class="key">A</span> 汇入第一列。完成后自动进入下一关；60 秒没有完成会出现黄色最短演示。</p><div class="callout">外面的因子会自动记录：交换变号、倍乘的补偿、提出的 x 都不会丢。每一步保持原始 D 不变。零格与乘积项统计按符号结构计算。</div><p>题库包含多种结构，提示只提供一种思路，不限制你的操作顺序。</p>'}};
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{dialogTrigger=b;const name=b.dataset.open;if(name==='sound'){
    $('dialogTitle').textContent='给每个动作，一点不同的触感。';$('dialogContent').innerHTML=`<p>声音只在操作时出现。你可以逐个试听，再决定整体音量。</p><label class="volume-control">音量 <input type="range" id="volume" min="0" max="100" value="${Math.round(S.getVolume()*100)}" aria-label="音效音量"><output id="volumeOutput">${Math.round(S.getVolume()*100)}%</output></label><div class="sound-demo-grid">${sounds.map(([id,name,feel])=>`<button class="sound-demo" data-sound="${id}">${name}<small>${feel}</small></button>`).join('')}</div><p id="soundStatus" class="sound-status" role="status">${S.isEnabled()?'点击任意音色试听。':'当前静音；点击试听会开启音效。'}</p><p class="sound-credit">设计参考：<a href="https://github.com/dannyjpwilliams/ui-sound-design-skill" target="_blank" rel="noopener">UI Sound Design Skill</a> · <a href="https://github.com/raphaelsalaja/skill/blob/main/skills/sounds-on-the-web/SKILL.md" target="_blank" rel="noopener">Sounds on the Web</a></p>`;
    $('volume').addEventListener('input',e=>{S.setVolume(Number(e.target.value)/100);$('volumeOutput').textContent=e.target.value+'%';});
    document.querySelectorAll('[data-sound]').forEach(b=>b.addEventListener('click',async()=>{if(!S.isEnabled())S.setEnabled(true);b.classList.add('playing');const ok=await S.preview(b.dataset.sound,{pan:b.dataset.sound==='move'?-.5:0});$('soundStatus').textContent=ok?'正在试听：'+sounds.find(x=>x[0]===b.dataset.sound)[1]:'浏览器未能播放；可以再点击一次，或检查音量。';setTimeout(()=>b.classList.remove('playing'),650);}));
  }else{$('dialogTitle').textContent=dialogs[name].title;$('dialogContent').innerHTML=dialogs[name].html;}$('infoDialog').showModal();}));
  $('closeDialog').addEventListener('click',()=>$('infoDialog').close());$('infoDialog').addEventListener('close',()=>dialogTrigger?.focus());
  $('infoDialog').addEventListener('click',e=>{if(e.target!==$('infoDialog'))return;const r=$('infoDialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('infoDialog').close();});
  document.addEventListener('keydown',e=>{if($('infoDialog').open||['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;const k=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&k==='z'){e.preventDefault();travel(index+(e.shiftKey?1:-1));return;}if((e.ctrlKey||e.metaKey)&&k==='y'){e.preventDefault();travel(index+1);return;}if(e.ctrlKey||e.metaKey||e.altKey)return;if(k==='t'){e.preventDefault();type='transpose';apply();}else if(k==='a'){e.preventDefault();axis='column';target=0;type='sum';source=source===0?1:source;apply();}else if(k==='r'){e.preventDefault();axis='row';render();feedback('已切换为按行操作。');}else if(k==='c'){e.preventDefault();axis='column';render();feedback('已切换为按列操作。');}else if(k==='m'){e.preventDefault();type='add';manualCoefficient=false;render();feedback('已选择倍加；左键目标，右键来源。');}else if(k==='x'){e.preventDefault();type='extractX';if(factorInfo())apply();else{render();feedback('当前选中行列没有可提取的公因子。','error');}}else if(k==='s'){e.preventDefault();type='swap';apply();}else if(k==='v'){e.preventDefault();$('reset').click();}});
  $('showDemo').addEventListener('click',()=>{const ops=problem.suggestedOps||[];$('demoPanel').hidden=false;$('demoPanel').innerHTML='<strong>最短参考路线</strong>'+ops.map((item,i)=>`<div class="demo-step"><b>${i+1}</b><span>${esc(item.type==='extractX'?'提取 x':item.type==='sum'?'全部汇入':item.type==='transpose'?'转置':item.type==='swap'?'交换':item.type==='scale'?'倍乘':'倍加')} · ${item.axis?((item.axis==='row'?'R':'C')+(item.target+1)):''}</span></div>`).join('')+'<small>这是参考路线，不会替你执行。</small>';$('showDemo').textContent='已显示最短演示';S.play('select');});
  $('bankToggle').addEventListener('click',()=>{const open=$('bankToggle').getAttribute('aria-expanded')==='true';$('bankToggle').setAttribute('aria-expanded',String(!open));$('bankToggle').innerHTML=open?'选择关卡 <span>⌄</span>':'收起题库 <span>⌃</span>';$('bankMenu').hidden=open;document.querySelector('.bank-sidebar').classList.toggle('bank-open',!open);});
  function openTutorial(){if(levelIndex()!==1)return;let seen=false;try{seen=localStorage.getItem('det-lab-tutorial-v1')==='seen';}catch{}if(!seen){$('tutorialOverlay').hidden=false;document.body.classList.add('tutorial-active');}}
  $('tutorialNext').addEventListener('click',()=>{try{localStorage.setItem('det-lab-tutorial-v1','seen');}catch{}$('tutorialOverlay').hidden=true;document.body.classList.remove('tutorial-active');S.play('select');});
  $('tutorialSkip').addEventListener('click',()=>{$('tutorialNext').click();});
  function renderBank(){
    const family=$('bankFilter').value;
    const list=problems.filter(p=>family==='all'||p.family===family);
    $('problemList').innerHTML=list.map(p=>`<button class="problem-link ${p.id===problem.id?'current':''}" data-problem="${p.id}" ${p.id===problem.id?'aria-current="page"':''}><span class="problem-index">${String(problems.findIndex(x=>x.id===p.id)+1).padStart(2,'0')}</span><span>${esc(p.title)}<small>${esc(p.family)} · ${esc(p.difficulty)}</small></span><span class="solved-mark">${savedGames[p.id]?.solved?'✓':''}</span></button>`).join('');
    $('bankProgress').textContent=problems.filter(p=>savedGames[p.id]?.solved).length+' / '+problems.length;
    $('problemTitle').textContent=levelLabel()+' · '+problem.title;
    $('problemNote').textContent=n()+' 阶 · '+problem.family+' · '+problem.difficulty; const pc=$('principleCard');pc.hidden=!problem.demoPrinciple;if(problem.demoPrinciple){$('principleTitle').textContent=problem.demoPrinciple.title;$('principleText').textContent=problem.demoPrinciple.text;}
    $('currentCategory').textContent=problem.family;
    $('problemPicker').value=problem.id;
    $('previousProblem').disabled=problem.id===problems[0].id;
    $('nextProblem').disabled=problem.id===problems[problems.length-1].id;
  }
  function switchProblem(id){
    if(id===problem.id)return;persist();const next=problems.find(p=>p.id===id);if(!next)return;
    problem=next;const route=savedGames[id];
    try{if(!route||!G.equals(G.determinantPolynomial(route.history[route.index].state),problem.expected))throw new Error();history=route.history;index=route.index;}catch{history=[{state:G.stateFromMatrix(problem.matrix),label:'原式',reason:'原始题目。'}];index=0;}
    axis='column';target=0;source=1;type='add';numeric=false;preview=false;compact=false;won=false;answerCandidate=null;hintCount=0;if(levelIndex()===1){axis='row';target=1;source=0;}resetIdle();$('hintText').hidden=true;$('hint').lastElementChild.textContent='＋';$('coefficient').value='-1';$('actionArrows').innerHTML='';persist();render();feedback(index?'已恢复这题上次的路线。':'选择目标、来源和动作。');S.play('select');
  }
  $('bankFilter').innerHTML='<option value="all">全部题型</option>'+[...new Set(problems.map(p=>p.family))].map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('');
  $('problemPicker').innerHTML=problems.map((p,i)=>`<option value="${p.id}">${String(i+1).padStart(2,'0')} · ${esc(p.title)}</option>`).join('');
  $('bankFilter').addEventListener('change',renderBank);$('problemPicker').addEventListener('change',e=>switchProblem(Number(e.target.value)));
  $('problemList').addEventListener('click',e=>{const b=e.target.closest('[data-problem]');if(b)switchProblem(Number(b.dataset.problem));});
  $('previousProblem').addEventListener('click',()=>switchProblem(problems[problems.findIndex(p=>p.id===problem.id)-1]?.id));
  $('nextProblem').addEventListener('click',()=>switchProblem(problems[problems.findIndex(p=>p.id===problem.id)+1]?.id));
  if(levelIndex()===1){axis='row';target=1;source=0;type='add';manualCoefficient=false;}render();armIdle();openTutorial();if(index)feedback('已恢复你上次停下的位置；所有动作仍可撤销。');
})();

