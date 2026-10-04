/* First lesson: the symbolic steps are deliberately authored and numerically verified. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const E = window.DetEngine;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let step = 0, numeric = false, x = 2, compact = false, busy = false, playing = false, timer = null, motionTimer = null;
  const states = [
    [['1','−1','1','x−1'],['1','−1','x+1','−1'],['1','x−1','1','−1'],['x+1','−1','1','−1']],
    [['x','−1','1','x−1'],['x','−1','x+1','−1'],['x','x−1','1','−1'],['x','−1','1','−1']],
    [['1','−1','1','x−1'],['1','−1','x+1','−1'],['1','x−1','1','−1'],['1','−1','1','−1']],
    [['1','0','0','x'],['1','0','x','0'],['1','x','0','0'],['1','0','0','0']],
    [['0','0','0','x'],['0','0','x','0'],['0','x','0','0'],['1','0','0','0']],
    [['0','0','0','x'],['0','0','x','0'],['0','x','0','0'],['1','0','0','0']]
  ];
  const lessons = [
    {title:'让所有列，向左靠拢。',description:'不急着展开。把其余三列加到第一列，看看那些 1 和 −1 会发生什么。',formula:'c₁ ← c₁ + c₂ + c₃ + c₄',caption:'观察：每一行的元素之和，都等于 x',note:'试着把第 2、3、4 列，一起加到第 1 列。',button:'向左合并',gesture:'←',motion:'left',invariant:'列的倍加，行列式的值不变。',why:'依次执行 c₁ ← c₁ + c₂、c₁ ← c₁ + c₃、c₁ ← c₁ + c₄。每一次都是把另一列加到目标列，因此行列式不变；其余三列保持原样。',observation:'这些看起来不同的行，<br>其实藏着同一个和。'},
    {title:'四个 x，只提出一个。',description:'第一列变得整齐了。把这一整列的公因子 x 提到行列式外，里面就留下四个 1。',formula:'D = x · |第一列全为 1 的行列式|',caption:'发现：第一列现在全都是 x',note:'从一列中提取公因子，只在外面乘一个 x。',button:'提出公因子 x',gesture:'↙',motion:'extract',invariant:'外面的系数 × 新行列式，始终等于 D。',why:'行列式对每一列是线性的，所以整列乘 x，行列式只乘 x，不是 x⁴。这里是因式分解，不需要假设 x ≠ 0；x = 0 时原行列式有一整列零，也等于 0。',observation:'一整列的共同因子，<br>只需带出去一次。'},
    {title:'用一列 1，制造一片零。',description:'第 2、4 列加上第 1 列，第 3 列减去第 1 列。那些重复出现的 ±1 就被消去了。',formula:'c₂ += c₁；c₃ −= c₁；c₄ += c₁',caption:'工具：第一列的 1，正好能消去其余的 ±1',note:'三次倍加共用第一列；第一列保持不变。',button:'继续造零',gesture:'→',motion:'left',invariant:'三次列倍加，行列式的值都不变。',why:'c₂ 中的 −1 加上 1 变成 0；c₃ 中的 1 减去 1 变成 0；c₄ 中的 −1 加上 1 变成 0。x−1 或 x+1 则变成 x，形成一条反对角线。',observation:'保留有用的 x，<br>把重复的常数消掉。'},
    {title:'再向上一步，结构更清楚。',description:'最后一行只有一个 1。让上面的三行都减去它，第一列就只剩最下面的 1。',formula:'r₁ −= r₄；r₂ −= r₄；r₃ −= r₄',caption:'结构：三个 x 已经落在反对角线上',note:'可以先点「收起零块」，看看右下角如何压缩。',button:'向上消元',gesture:'↑',motion:'up',invariant:'行的倍加，同样不改变行列式。',why:'行与列在这些性质上是对称的。第四行是 (1, 0, 0, 0)，用它消掉前三行的首项，不会影响其他位置的 x。',observation:'零越多，<br>需要追踪的信息就越少。'},
    {title:'只剩一条路线。',description:'每行、每列各选一个元素。唯一非零的乘积沿着反对角线，它对应排列 4、3、2、1。',formula:'D = x · (−1)⁶ · x³ = x⁴',caption:'读数：逆序数 3 + 2 + 1 = 6，符号为正',note:'别漏掉前面提出来的那个 x。',button:'读出结果',gesture:'↗',motion:'diagonal',invariant:'排列的逆序数是偶数，因此取正号。',why:'4321 有 6 个逆序对，因此符号为 (−1)⁶ = +1。反对角线上的乘积是 x·x·x·1 = x³，再乘外面的公因子 x，得到 x⁴。',observation:'不是把所有项都算完，<br>而是让多数项自动归零。'},
    {title:'你把这道题，变简单了。',description:'先找到共同的和，再提因子、造零、读出反对角线。五次动作，把结构变成了答案。',formula:'D = x⁴',caption:'推演完成：这个结论对所有实数 x 都成立',note:'切换到「数字验证」，换几个 x 检验你的直觉。',button:'再推演一次',gesture:'✓',motion:'left',invariant:'包括 x = 0；提取公因子不等于除以 x。',why:'整个过程只使用合法的行列倍加、单列公因子提取和排列定义。没有除以可能为零的表达式，所以无需遗漏 x = 0 的情形。',observation:'下一次遇见相似的结构，<br>先试着寻找共同的和。'}
  ];
  function val(s){if(s==='x')return x;if(s==='x−1')return x-1;if(s==='x+1')return x+1;return Number(s.replace('−','-'));}
  function numberMatrix(s){return states[s].map(row=>row.map(val));}
  function setText(id, text){$(id).textContent=text;}
  function activeCell(r,c){if(step<2)return c===0;if(step===2)return c>0;if(step===3)return r<3&&c===0;return c===3-r;}
  function drawArrows(motion=false){
    const paths = [];
    if(step===0 || (motion && step===1)){
      paths.push('M284 43 Q170 -2 79 42','M216 36 Q148 8 77 41','M150 35 Q106 21 76 42');
    }else if(step===1){paths.push('M80 70 Q19 28 4 91');}
    else if(step===2){paths.push('M79 42 Q128 12 149 43','M79 42 Q170 -2 216 43','M79 42 Q220 -16 284 43');}
    else if(step===3 || (motion&&step===4)){paths.push('M33 241 Q6 159 33 80','M34 240 Q10 181 33 132','M35 240 Q19 217 34 185');}
    else if(step>=4){paths.push('M277 79 L81 241');}
    $('arrowPaths').innerHTML=paths.map((p,i)=>`<path d="${p}" class="motion-path" style="animation-delay:${i*80}ms"/>`).join('');
  }
  function render(){
    const l=lessons[step];
    $('matrix').innerHTML=states[step].map((row,r)=>row.map((s,c)=>{
      const isZero=s==='0', covered=compact&&step>=3&&r>=2&&c>=2;
      return `<span class="cell ${s.includes('x')&&!numeric?'':'constant'} ${isZero?'zero':''} ${covered?'covered':''} ${activeCell(r,c)?'highlight':''} ${activeCell(r,c)?'affected':''}" data-row="${r}" data-col="${c}">${numeric?String(val(s)).replace('-','−'):s}</span>`;
    }).join('')).join('');
    $('matrix').setAttribute('aria-label',`当前第 ${step+1} 步，四阶行列式：`+states[step].map(row=>row.map(s=>numeric?val(s):s).join('，')).join('；'));
    $('lhs').innerHTML=step>=2?`D = ${numeric?`(${x})`: 'x'} ·`:'D =';
    $('finalAnswer').hidden=step!==5;
    $('finalAnswer').innerHTML=numeric?`= ${x**4}`:'= x<sup>4</sup>';
    $('lhs').style.fontSize=step>=2?'24px':'';
    for(const [id,key] of [['stepTitle','title'],['stepDescription','description'],['stageCaption','caption'],['canvasNote','note'],['guideFormula','formula'],['operationFormula','formula'],['invariantText','invariant'],['whyDetail','why'],['gesture','gesture'],['actionText','button']])setText(id,l[key]);
    if(step===0)$('guideFormula').innerHTML='c₁ ← c₁ + c₂ + c₃ + c₄';
    if(step===1)$('guideFormula').innerHTML='整列 x → 提出一个 x';
    if(step===1)$('operationFormula').innerHTML='第一列提出公因子 x → 留下一列 1';
    $('observation').innerHTML=l.observation;
    setText('actionArrow',step===5?'↺':l.gesture);
    setText('operationLabel',step===5?'得到的结果':'这一次操作');
    setText('guideNumber',step===5?'完成':`${String(step+1).padStart(2,'0')}—05`);
    setText('stepCurrent',String(step+1).padStart(2,'0'));
    $('prev').disabled=step===0||busy;
    $('next').disabled=step===5||busy;
    $('action').disabled=busy;
    $('compress').disabled=step<3;
    $('compress').setAttribute('aria-pressed',String(compact));
    $('compress').lastChild.textContent=compact?'展开零块':'收起零块';
    $('zeroBlock').hidden=!(compact&&step>=3);
    $('timeline').innerHTML=lessons.map((_,i)=>`<button class="${i===step?'current':i<step?'past':''}" data-step="${i}" aria-label="第 ${i+1} 步：${i===5?'得到答案':lessons[i].title}" ${i===step?'aria-current="step"':''}></button>`).join('');
    $('numericControls').hidden=!numeric;
    $('symbolicMode').classList.toggle('active',!numeric);$('numericMode').classList.toggle('active',numeric);
    $('symbolicMode').setAttribute('aria-pressed',String(!numeric));$('numericMode').setAttribute('aria-pressed',String(numeric));
    if(numeric){const det=E.determinant(numberMatrix(step));const total=step>=2?E.mul(det,x):det;setText('numericResult',`原式 D = ${E.fmt(total)}`);setText('xOutput',x);if(step===5)setText('canvasNote','拖动上方的 x，观察结果是否始终等于 x⁴。');}
    const route=step===0?0:step===1?1:step<=3?2:3;
    for(let i=0;i<4;i++)$('route'+i).classList.toggle('current',i===route);
    drawArrows();
  }
  function stop(){playing=false;clearTimeout(timer);$('play').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg>';$('play').setAttribute('aria-label','自动演示');}
  function cancelMotion(){clearTimeout(motionTimer);busy=false;$('stage').classList.remove('moving');$('stage').querySelector('.end-sweep')?.remove();}
  function go(target,animate=true){
    if(target<0||target>5)return;
    cancelMotion();
    const old=step;step=target;
    if(step<3)compact=false;
    const shouldAnimate=animate&&target===old+1&&!reduced.matches;
    busy=shouldAnimate;
    $('stage').dataset.motion=lessons[old]?.motion||'left';
    render();
    setText('announcement',`第 ${step+1} 步。${lessons[step].title} ${lessons[step].description}`);
    if(shouldAnimate){
      drawArrows(true);
      // Highlight the arriving values belonging to the operation just performed.
      $('matrix').querySelectorAll('.cell').forEach(el=>{const r=+el.dataset.row,c=+el.dataset.col;el.classList.toggle('affected',old<=1?c===0:old===2?c>0:old===3?r<3&&c===0:c===3-r);});
      void $('stage').offsetWidth;$('stage').classList.add('moving');
      if(step===5){const sweep=document.createElement('div');sweep.className='end-sweep';$('stage').appendChild(sweep);}
      motionTimer=setTimeout(()=>{busy=false;$('stage').classList.remove('moving');$('stage').querySelector('.end-sweep')?.remove();render();},1000);
    }
    if(step===5)stop();
  }
  $('action').addEventListener('click',()=>{stop();go(step===5?0:step+1);});
  $('next').addEventListener('click',()=>{stop();go(step+1);});
  $('prev').addEventListener('click',()=>{stop();go(step-1,false);});
  $('reset').addEventListener('click',()=>{stop();go(0,false);});
  $('labNav').addEventListener('click',()=>{$('main').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});});
  $('timeline').addEventListener('click',e=>{const b=e.target.closest('button[data-step]');if(b){stop();go(+b.dataset.step,false);}});
  $('symbolicMode').addEventListener('click',()=>{numeric=false;render();});
  $('numericMode').addEventListener('click',()=>{numeric=true;render();});
  $('xValue').addEventListener('input',e=>{x=Number(e.target.value);render();});
  $('compress').addEventListener('click',()=>{compact=!compact;render();setText('announcement',compact?'右下角四个零收起为一个 2 乘 2 的零块；矩阵阶数不变。':'已展开零块。');});
  $('why').addEventListener('click',()=>{const expanded=$('why').getAttribute('aria-expanded')==='true';$('why').setAttribute('aria-expanded',String(!expanded));$('whyDetail').hidden=expanded;$('why').lastElementChild.textContent=expanded?'＋':'−';});
  $('play').addEventListener('click',()=>{
    if(playing){stop();return;}
    if(step===5)go(0,false);
    playing=true;$('play').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';$('play').setAttribute('aria-label','暂停演示');
    function tick(){if(!playing)return;go(step+1);if(playing)timer=setTimeout(tick,4000);}
    timer=setTimeout(tick,700);
  });
  const dialogs={
    note:{title:'一张手写笔记，是这个实验的起点。',html:'<img src="note.jpg" width="1920" height="1092" alt="用户的行列式手写笔记：先把其他列加到第一列，提出 x，再造零得到反对角结构，最后得 x 的四次方。"><p>模板取自你笔记里的第 1 题。向左汇入、向上消元、用大块表示连续的零，都从这张纸上延伸而来。</p>'},
    idea:{title:'先看结构，再决定怎么计算。',html:'<p>这道题的入口是：<strong>每一行的四个元素相加，都得到 x。</strong>于是把其余三列依次加到第一列，就能造出一整列 x。</p><ol><li><strong>求和：</strong>c₁ ← c₁ + c₂ + c₃ + c₄。</li><li><strong>提取：</strong>第一列提出公因子 x，留下四个 1。</li><li><strong>造零：</strong>c₂ + c₁，c₃ − c₁，c₄ + c₁。</li><li><strong>再消元：</strong>前三行分别减去第四行，只留下反对角线。</li><li><strong>读数：</strong>4321 的逆序数为 6，所以 D = x · x³ = x⁴。</li></ol><div class="callout">若 x = 0，求和后出现整列零，原式立即为 0。这里的公因子提取是多项式恒等式，不需要除以非零的 x。</div><p>「零块」只是把重复的零收起来显示，<strong>不会删去行列，也不会改变阶数</strong>。</p>'},
    help:{title:'亲手推动一次变形。',html:'<p>点右侧黑色按钮，每次只做一个动作。先看数字怎么移动，再看这一步为什么成立。</p><div class="help-row"><span class="key">←</span><span class="key">→</span> 上一步 / 下一步（输入控件中不触发）</div><div class="help-row"><span class="key">▶</span> 自动演示，每步停留 4 秒；再点一次即可暂停。</div><div class="help-row"><strong>数字验证</strong>：选择 −3 到 3 的整数 x，用精确运算核对当前式子。</div><div class="help-row"><strong>收起零块</strong>：出现零块后可用；再次点击恢复每个零。</div><div class="callout">这是用于讨论视觉与操作手感的小模板，目前包含一题和完整推演。后续题库与其他题型尚未加入。</div>'}
  };
  let dialogTrigger=null;
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{stop();dialogTrigger=button;const d=dialogs[button.dataset.open];setText('dialogTitle',d.title);$('dialogContent').innerHTML=d.html;$('infoDialog').showModal();}));
  $('closeDialog').addEventListener('click',()=>$('infoDialog').close());
  $('infoDialog').addEventListener('close',()=>dialogTrigger?.focus());
  $('infoDialog').addEventListener('click',event=>{if(event.target===$('infoDialog')){const box=$('infoDialog').getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)$('infoDialog').close();}});
  document.addEventListener('keydown',event=>{if($('infoDialog').open||['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)||busy)return;if(event.key==='ArrowRight'){event.preventDefault();stop();go(step+1);}if(event.key==='ArrowLeft'){event.preventDefault();stop();go(step-1,false);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  // Cross-check all authored states before exposing numerical verification.
  for(let a=-3;a<=3;a++){x=a;for(let s=0;s<6;s++){let d=E.determinant(numberMatrix(s));if(s>=2)d=E.mul(d,x);if(!E.eq(d,x**4))throw new Error('演示数据校验失败');}}x=2;
  render();
})();
