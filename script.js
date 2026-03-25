// --- 【1. 資料狀態中心：Proxy 引擎】 ---
const fireState = {
  expense: Number(sessionStorage.getItem('fire_expense')) || 50000,
  savings: Number(sessionStorage.getItem('fire_savings')) || 1200000
};

const state = new Proxy(fireState, {
  set(target, key, value) {
    target[key] = value;
    // 資料變動，自動執行：更新畫面 + 儲存
    renderProgressUI(target);
    sessionStorage.setItem(`fire_${key}`, value);
    return true;
  }
});

// --- 【2. 畫面渲染引擎：負責把資料畫出來】 ---
const renderProgressUI = (data) => {
  const fireGoal = data.expense * 12 * 25;
  const rawPercent = fireGoal > 0 ? (data.savings / fireGoal) * 100 : 0;
  const displayPercent = Math.min(rawPercent, 100).toFixed(1);

  const percentEl = document.querySelector('#percentNumber');
  const barEl = document.querySelector('#progressBar');
  const goalEl = document.querySelector('#goalText');
  const tagEl = document.querySelector('#statusTag');

  if (!percentEl) return; // 確保 HTML 已經渲染完成才執行

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

// --- 【3. 歷史紀錄邏輯】 ---
const saveHistory = () => {
  const s = state.savings;
  const e = state.expense;
  const p = document.querySelector('#percentNumber').textContent;

  let history = JSON.parse(sessionStorage.getItem('fire_history')) || [];
  const newRecord = { s, e, p, id: Date.now() };

  if (history.length > 0 && history[0].s === s && history[0].e === e) return;

  history.unshift(newRecord);
  history = history.slice(0, 4);
  sessionStorage.setItem('fire_history', JSON.stringify(history));
  renderHistory();
};

const renderHistory = () => {
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

window.loadHistory = (s, e) => {
  document.querySelector('#savingsInput').value = s;
  document.querySelector('#expenseInput').value = e;
  state.savings = s;
  state.expense = e;
};

// --- 【4. 初始化與事件綁定】 ---
const initApp = () => {
  const app = document.querySelector('#fire-app');
  if (!app) return;

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
                      <input type="number" id="expenseInput" value="${state.expense}" 
                             class="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all">
                  </div>
                  <div>
                      <label class="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">目前總存款 (TWD)</label>
                      <input type="number" id="savingsInput" value="${state.savings}" 
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

  setupEventListeners();
  renderProgressUI(state);
  renderHistory();
};

const setupEventListeners = () => {
  document.querySelector('#savingsInput').addEventListener('input', (e) => {
    state.savings = Number(e.target.value) || 0;
  });

  document.querySelector('#expenseInput').addEventListener('input', (e) => {
    state.expense = Number(e.target.value) || 0;
  });
  
  document.querySelector('#saveBtn').addEventListener('click', saveHistory);
};

// --- 【5. 匯率 API 功能】 ---
const apiURL = 'https://open.er-api.com/v6/latest/TWD';
const toTWD = (rate, fixed = 2) => (1 / rate).toFixed(fixed);

const updateExchangeDashboard = async () => {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const { rates: { USD, JPY, EUR, CNY } } = data;
        document.getElementById('rate-usd').textContent = toTWD(USD);
        document.getElementById('rate-jpy').textContent = toTWD(JPY, 3);
        document.getElementById('rate-eur').textContent = toTWD(EUR);
        document.getElementById('rate-cny').textContent = toTWD(CNY);
    } catch (error) {
        console.error("匯率抓取失敗", error);
    }
};

const initRateEvents = () => {
    const rateContainer = document.getElementById('rate-container');
    if (!rateContainer) return;
    rateContainer.addEventListener('click', (e) => {
        const card = e.target.closest('[data-code]');
        if (!card) return;
        document.querySelectorAll('#rate-container > div').forEach(el => {
            el.classList.remove('ring-2', 'ring-emerald-500', 'shadow-md', 'scale-[1.02]', 'bg-slate-50');
        });
        card.classList.add('ring-2', 'ring-emerald-500', 'shadow-md', 'scale-[1.02]', 'bg-slate-50');
    });
};

// --- 【6. 總啟動程式】 ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateExchangeDashboard();
    initRateEvents();
});
