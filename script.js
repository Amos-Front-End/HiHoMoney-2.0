const initApp = () => {
  const app = document.querySelector('#fire-app');
  if (!app) return;

  // 1. 渲染初始結構
  app.innerHTML = `
    <div class="w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden">
      <div class="flex flex-col md:flex-row">
          <div class="flex-1 p-12 border-b md:border-b-0 md:border-r border-slate-50 flex flex-col justify-center text-center md:text-left">
              <h3 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">FIRE Progress</h3>
              <div class="mb-8">
                  <span id="percentNumber" class="text-8xl font-black text-slate-900 tracking-tighter">0.0</span>
                  <span class="text-3xl font-bold text-orange-500 ml-1">%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-6">
                  <div id="progressBar" class="bg-orange-500 h-full transition-all duration-500" style="width: 0%"></div>
              </div>
              <p id="goalText" class="text-slate-400 text-sm italic font-medium">目標金額：計算中...</p>
          </div>
          <div class="flex-1 p-12 bg-slate-50/50 space-y-8 flex flex-col justify-center">
              <div class="space-y-6">
                  <div>
                      <label class="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">預期月支出 (TWD)</label>
                      <input type="number" id="expenseInput" value="50000" 
                             class="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all">
                  </div>
                  <div>
                      <label class="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">目前總存款 (TWD)</label>
                      <input type="number" id="savingsInput" value="1200000" 
                             class="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all">
                  </div>
              </div>
              <div id="statusTag" class="text-center py-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm transition-colors">
                  輸入數據開始試算
              </div>
          </div>
      </div>
    </div>
  `;

  setupEventListeners();
  updateUI();
};

const updateUI = () => {
  const s = Number(document.querySelector('#savingsInput').value) || 0;
  const e = Number(document.querySelector('#expenseInput').value) || 0;

  const fireGoal = e * 12 * 25;
  const rawPercent = fireGoal > 0 ? (s / fireGoal) * 100 : 0;
  const displayPercent = Math.min(rawPercent, 100).toFixed(1);

  // 精準抓取零件並修改
  document.querySelector('#percentNumber').textContent = displayPercent;
  document.querySelector('#goalText').textContent = `目標金額：$ ${(fireGoal / 10000).toLocaleString()} 萬`;
  document.querySelector('#progressBar').style.width = `${displayPercent}%`;

  const tagEl = document.querySelector('#statusTag');
  if (rawPercent >= 100) {
    tagEl.textContent = "🎉 您已達成 FIRE！";
    tagEl.className = "text-center py-3 rounded-xl bg-green-100 text-green-700 font-bold text-sm transition-colors";
  } else {
    tagEl.textContent = "繼續加油，離自由不遠了！";
    tagEl.className = "text-center py-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm transition-colors";
  }
};

const setupEventListeners = () => {
  ['#savingsInput', '#expenseInput'].forEach(id => {
    document.querySelector(id).addEventListener('input', updateUI);
  });
};

initApp();
