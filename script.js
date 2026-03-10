const renderFireCard = (savings, expense) => {
  // 1. 核心邏輯運算
  const currentGoal = expense * 12 * 25;
  const rawPercent = (savings / currentGoal) * 100;
  const displayPercent = Math.min(rawPercent, 100).toFixed(1);
  const isGoalReached = rawPercent >= 100;

  const app = document.querySelector('#fire-app');
  if (!app) return;

  // 2. 注入精緻的 RWD 儀表板佈局
  app.innerHTML = `
      <div class="w-full max-w-4xl mx-auto bg-white border border-zinc-100 rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500">
        <div class="flex flex-col md:flex-row">
            
            <div class="flex-1 p-10 md:p-16 border-b md:border-b-0 md:border-r border-zinc-50 flex flex-col justify-center">
                <div class="flex items-center space-x-2 mb-8">
                    <span class="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                    <h3 class="text-zinc-400 text-xs font-bold uppercase tracking-widest">Live FIRE Progress</h3>
                </div>
                
                <div class="mb-10">
                    <div class="flex items-baseline mb-2">
                        <span class="text-8xl font-black ${isGoalReached ? 'text-green-600' : 'text-zinc-900'} tracking-tighter transition-colors">
                            ${displayPercent}
                        </span>
                        <span class="text-3xl font-bold text-orange-500 ml-2">%</span>
                    </div>
                    <div class="w-full bg-zinc-100 rounded-full h-3 overflow-hidden">
                        <div class="${isGoalReached ? 'bg-green-500' : 'bg-orange-500'} h-full transition-all duration-1000 ease-out shadow-lg" 
                             style="width: ${displayPercent}%"></div>
                    </div>
                </div>

                <div class="space-y-1">
                    <p class="text-zinc-400 text-sm font-medium">目標金額</p>
                    <p class="text-2xl font-bold text-zinc-900">$ ${(currentGoal / 10000).toLocaleString()} 萬</p>
                </div>
            </div>

            <div class="flex-1 p-10 md:p-16 bg-zinc-50/50 space-y-8 flex flex-col justify-center">
                <div class="space-y-6">
                    <div class="group">
                        <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-orange-500 transition-colors">預期月支出 (TWD)</label>
                        <input type="number" id="expenseInput" value="${expense}" 
                               class="w-full bg-white border border-zinc-200 p-5 rounded-2xl text-xl font-bold text-zinc-900 shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all">
                    </div>

                    <div class="group">
                        <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-orange-500 transition-colors">目前總存款 (TWD)</label>
                        <input type="number" id="savingsInput" value="${savings}" 
                               class="w-full bg-white border border-zinc-200 p-5 rounded-2xl text-xl font-bold text-zinc-900 shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all">
                    </div>
                </div>
                
                <button id="calcBtn" class="w-full py-5 ${isGoalReached ? 'bg-green-600 hover:bg-green-700' : 'bg-zinc-900 hover:bg-zinc-800'} text-white rounded-2xl font-black text-lg active:scale-[0.98] transition-all shadow-xl shadow-zinc-200">
                    立即試算
                </button>
                
                <p class="text-[10px] text-zinc-400 text-center leading-relaxed">
                    基於 4% 理財法則計算。請根據您的真實支出動態調整。
                </p>
            </div>
            
        </div>
      </div>
    `;

  // 事件監聽
  document.querySelector('#calcBtn').addEventListener('click', () => {
    const s = document.querySelector('#savingsInput').value;
    const e = document.querySelector('#expenseInput').value;
    renderFireCard(Number(s), Number(e));
  });
};

// 初始啟動
renderFireCard(1000000, 50000);
