// 1. 渲染進度條與狀態
export const renderProgressUI = (data) => {
  const fireGoal = data.expense * 12 * 25;
  const rawPercent = fireGoal > 0 ? (data.savings / fireGoal) * 100 : 0;
  const displayPercent = Math.min(rawPercent, 100).toFixed(1);

  const percentEl = document.querySelector('#percentNumber');
  const barEl = document.querySelector('#progressBar');
  const goalEl = document.querySelector('#goalText');
  const tagEl = document.querySelector('#statusTag');

  if (!percentEl) return;

  percentEl.textContent = displayPercent;
  barEl.style.width = `${displayPercent}%`;
  goalEl.textContent = `目標金額：$ ${(fireGoal / 10000).toLocaleString()} 萬`;

  if (rawPercent >= 100) {
    tagEl.textContent = "🎉 您已達成 FIRE！";
    tagEl.className = "text-center py-3 rounded-xl bg-green-100 text-green-700 font-bold text-sm transition-colors";
  } else {
    tagEl.textContent = "繼續加油，離自由不遠了！";
    tagEl.className = "text-center py-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm transition-colors";
  }
};

// 2. 渲染歷史紀錄
export const renderHistory = () => {
  const history = JSON.parse(sessionStorage.getItem('fire_history')) || [];
  const listEl = document.querySelector('#historyList');
  if (!listEl) return;
  
  listEl.innerHTML = history.map(item => `
    <button onclick="loadHistory(${item.s}, ${item.e})" 
            class="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm">
      💸 ${Number(item.e)/1000}k / 💰 ${Number(item.s)/10000}萬
    </button>
  `).join('');
};

// 3. 把那大串 HTML 模板也搬過來，讓 script.js 變乾淨
export const getAppTemplate = (expense, savings) => `
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
                      <input type="number" id="expenseInput" value="${expense}" 
                             class="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all">
                  </div>
                  <div>
                      <label class="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">目前總存款 (TWD)</label>
                      <input type="number" id="savingsInput" value="${savings}" 
                             class="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all">
                  </div>
              </div>
              <div id="statusTag" class="text-center py-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm transition-colors">
                  輸入數據開始試算
              </div>
              <div class="pt-4 border-t border-slate-200">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">近期試算劇本</span>
                  <button id="saveBtn" class="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition-all">儲存目前結果</button>
                </div>
                <div id="historyList" class="flex flex-wrap gap-2"></div>
              </div>
          </div>
      </div>
    </div>
`;
