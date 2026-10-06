/* One physical vocabulary for the live board, opening and every replay. */
(() => {
  const G = window.SymbolicGame;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pulse(el, frames, delay = 0, duration = 480) {
    if (!el || reduced()) return null;
    return el.animate(frames, {duration, delay, easing:'cubic-bezier(.22,.7,.25,1)', fill:'none'});
  }
  function cell(board,r,c) { return board.querySelector(`[data-r="${r}"][data-c="${c}"]`); }
  function render(board,state) {
    board.style.setProperty('--n',state.matrix.length);
    board.innerHTML=state.matrix.map((row,r)=>row.map((p,c)=>`<span class="play-cell ${G.equals(p,0)?'is-zero':''}" data-r="${r}" data-c="${c}">${G.format(p,{html:true})}</span>`).join('')).join('');
  }
  function layer(board,name) {
    const el=document.createElement('div');el.className=name;board.append(el);return el;
  }
  function flash(board) {
    if(reduced())return;
    const el=layer(board,'ink-sweep');
    const a=pulse(el,[{transform:'translateX(-150%) skewX(-24deg)',opacity:0},{opacity:.7,offset:.35},{transform:'translateX(650%) skewX(-24deg)',opacity:0}],0,460);
    a.finished.then(()=>el.remove()).catch(()=>el.remove());
  }
  function blocks(board,state,permanent=false) {
    board.querySelectorAll('.structure-block').forEach(e=>e.remove());
    const n=state.matrix.length, used=new Set(), candidates=[];
    for(const value of [0,1])for(let r=0;r<n;r++)for(let c=0;c<n;c++)for(let h=1;r+h<=n;h++)for(let w=1;c+w<=n;w++){
      if(h*w<2)continue;
      if(Array.from({length:h},(_,i)=>Array.from({length:w},(_,j)=>G.equals(state.matrix[r+i][c+j],value)).every(Boolean)).every(Boolean))candidates.push({r,c,h,w,value});
    }
    candidates.sort((a,b)=>b.h*b.w-a.h*a.w);
    let count=0;
    for(const b of candidates){
      const ids=[];for(let i=0;i<b.h;i++)for(let j=0;j<b.w;j++)ids.push((b.r+i)*n+b.c+j);
      if(ids.some(i=>used.has(i)))continue;ids.forEach(i=>used.add(i));
      const first=cell(board,b.r,b.c)?.getBoundingClientRect(),last=cell(board,b.r+b.h-1,b.c+b.w-1)?.getBoundingClientRect(),rect=board.getBoundingClientRect();if(!first||!last)continue;
      const el=layer(board,'structure-block');el.textContent=b.value;el.title=`${b.h}×${b.w} 全 ${b.value} 区域，行列没有删除`;
      Object.assign(el.style,{left:first.left-rect.left+'px',top:first.top-rect.top+'px',width:last.right-first.left+'px',height:last.bottom-first.top+'px'});
      pulse(el,[{transform:'scale(.84)',opacity:0},{transform:'scale(1)',opacity:1}],count++*40,380);
      if(!permanent)setTimeout(()=>el.remove(),1550);
    }
    return count;
  }
  function path(board,permutation) {
    board.querySelectorAll('.reading-cell').forEach(e=>e.classList.remove('reading-cell'));
    permutation.forEach((c,r)=>{const el=cell(board,r,c);el?.classList.add('reading-cell');pulse(el,[{transform:'scale(.96)',opacity:.3},{transform:'scale(1.13)',opacity:1},{transform:'scale(1)',opacity:1}],r*70,400);});
  }
  function animate(board,before,after,operation,factorEl) {
    board.querySelectorAll('.motion-ghost,.motion-arrows').forEach(e=>e.remove());
    const n=after.matrix.length,axis=operation.axis==='row'?'row':'column',rect=board.getBoundingClientRect();
    flash(board);
    const sources=operation.type==='sum'?Array.from({length:n},(_,i)=>i).filter(i=>i!==operation.target):[operation.source];
    if(['add','sum','swap','transpose'].includes(operation.type)&&!reduced()){
      const transfers=[];
      if(operation.type==='transpose')for(let r=0;r<n;r++)for(let c=0;c<n;c++){if(r!==c)transfers.push([r,c,c,r]);}
      else for(const s of sources)for(let i=0;i<n;i++){
        transfers.push(axis==='row'?[s,i,operation.target,i]:[i,s,i,operation.target]);
        if(operation.type==='swap')transfers.push(axis==='row'?[operation.target,i,s,i]:[i,operation.target,i,s]);
      }
      const curves=[];
      transfers.forEach(([r,c,tr,tc],i)=>{
        const from=cell(board,r,c)?.getBoundingClientRect(),to=cell(board,tr,tc)?.getBoundingClientRect();if(!from||!to)return;
        const ghost=layer(board,'motion-ghost');ghost.textContent=G.format(before.matrix[r][c]);
        Object.assign(ghost.style,{left:from.left-rect.left+'px',top:from.top-rect.top+'px',width:from.width+'px',height:from.height+'px',animation:'none'});
        const dx=to.left-from.left,dy=to.top-from.top;
        const a=pulse(ghost,[{transform:'translate(0,0) scale(.94)',opacity:.8},{transform:`translate(${dx*.5}px,${dy*.5-16}px) scale(1.06)`,opacity:1,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(.96)`,opacity:0}],Math.min(i,6)*22,520);
        a.finished.then(()=>ghost.remove()).catch(()=>ghost.remove());
        if(i%n===0){const x1=from.left-rect.left+from.width/2,y1=from.top-rect.top+from.height/2,x2=to.left-rect.left+to.width/2,y2=to.top-rect.top+to.height/2;curves.push(`M${x1},${y1} Q${(x1+x2)/2-16},${(y1+y2)/2-26} ${x2},${y2}`);}
      });
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','motion-arrows');svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);svg.innerHTML='<defs><marker id="inkArrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="currentColor"/></marker></defs>'+curves.map(d=>`<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#inkArrow)"/>`).join('');board.append(svg);
      pulse(svg,[{opacity:0,transform:'scale(.98)'},{opacity:1,offset:.3},{opacity:0,transform:'scale(1)'}],0,600)?.finished.then(()=>svg.remove()).catch(()=>svg.remove());
    }
    after.matrix.forEach((row,r)=>row.forEach((p,c)=>{
      if(G.equals(p,0)&&!G.equals(before.matrix[r][c],0))pulse(cell(board,r,c),[{transform:'scale(.72)',opacity:.2},{transform:'scale(1.18)',opacity:1,offset:.5},{transform:'scale(1)',opacity:1}],160,400);
      if(['scale','extractX'].includes(operation.type)&&(axis==='row'?r:c)===operation.target)pulse(cell(board,r,c),[{transform:'scaleX(.75)',opacity:.5},{transform:'scaleX(1)',opacity:1}],0,400);
    }));
    if(operation.type==='swap')pulse(factorEl,[{transform:'rotateX(0)',opacity:1},{transform:'rotateX(90deg)',opacity:.3},{transform:'rotateX(0)',opacity:1}],0,500);
    else if(['scale','extractX'].includes(operation.type))pulse(factorEl,[{transform:'translate(20px,8px)',opacity:0},{transform:'translate(0,0)',opacity:1}],100,450);
    const structure=G.structure(after);if(structure.permutation)path(board,structure.permutation);
    return blocks(board,after);
  }
  function tridiagonal(board,n){
    board.querySelectorAll('.lattice-line').forEach(e=>e.remove());
    const line=document.createElement('div');line.className='lattice-line';line.textContent='·  ·  ·  ·  ·  ·  ·';board.append(line);
    pulse(line,[{transform:'translateX(-18px)',opacity:0},{transform:'translateX(18px)',opacity:.7},{transform:'translateX(70px)',opacity:0}],0,900);
    for(let i=0;i<n;i++){const el=cell(board,i,i);pulse(el,[{transform:'scale(.85)',opacity:.35},{transform:'scale(1.12)',opacity:1,offset:.55},{transform:'scale(1)',opacity:1}],i*90,520);}
    const band=document.createElement('div');band.className='tridiagonal-band';band.textContent='1  ·  2cos x  ·  1';board.append(band);pulse(band,[{transform:'translateX(-10px)',opacity:0},{transform:'translateX(0)',opacity:1}],180,500);
  }
  function vandermonde(board,state){
    const n=state.matrix.length,a=state.matrix,all=(row,value)=>row.every(p=>G.equals(p,value));
    const firstRow=all(a[0],1),firstCol=a.every(row=>G.equals(row[0],1)),lastRow=all(a[n-1],1);
    board.querySelectorAll('.vandermonde-arrow,.vandermonde-sign').forEach(e=>e.remove());
    const arrow=document.createElement('div');arrow.className='vandermonde-arrow';arrow.textContent=firstRow?'↓':firstCol?'↘':'↕';arrow.title=firstRow?'第一行全为 1：沿幂次向下读取':firstCol?'第一列全为 1：先转置':'最后一行全为 1：翻转行序';board.append(arrow);pulse(arrow,[{transform:'translateY(-8px)',opacity:0},{transform:'translateY(0)',opacity:1}],0,520);
    if(lastRow||(!firstRow&&!firstCol)){const sign=document.createElement('div');sign.className='vandermonde-sign';const exponent=n*(n-1)/2;sign.textContent=`行序翻转：(-1)^${exponent}`;board.append(sign);pulse(sign,[{transform:'translateX(12px)',opacity:0},{transform:'translateX(0)',opacity:1}],120,480);}
    const label=document.createElement('div');label.className='vandermonde-product';label.innerHTML='∏<sub>i&lt;j</sub>(x<sub>j</sub> − x<sub>i</sub>)';board.append(label);pulse(label,[{transform:'scale(.92)',opacity:0},{transform:'scale(1)',opacity:1}],230,520);return {firstRow,firstCol,lastRow,exponent:n*(n-1)/2};
  }
  window.BoardMotion=Object.freeze({render,animate,blocks,path,flash,pulse,vandermonde,tridiagonal});
})();
