import React, { useState, useEffect } from 'react';

const FireCalculator = () => {
  // 1. 狀態初始化 (從 sessionStorage 抓取或給預設值)
  const [expense, setExpense] = useState(() => Number(sessionStorage.getItem('fire_expense')) || 50000);
  const [savings, setSavings] = useState(() => Number(sessionStorage.getItem('fire_savings')) || 1200000);
  const [history, setHistory] = useState(() => JSON.parse(sessionStorage.getItem('fire_history')) || []);

  // 2. 衍生資料計算 (這就是原本的 renderProgressUI 邏輯)
  // 公式：$$Goal = Expense \times 12 \times 25$$ (4% 法則的倒數)
  const fireGoal = expense * 12 * 25;
  const rawPercent = fireGoal > 0 ? (savings / fireGoal) * 100 : 0;
  const displayPercent = Math.min(rawPercent, 100).toFixed(1);
  const isReached = rawPercent >= 100;

  // 3. 自動持久化 (這就是原本 Proxy 的功能)
  useEffect(() => {
    sessionStorage.setItem('fire_expense', expense);
    sessionStorage.setItem('fire_savings', savings);
  }, [expense, savings]);

  useEffect(() => {
    sessionStorage.setItem('fire_history', JSON.stringify(history));
  }, [history]);

  // 4. 行為邏輯
  const handleSave = () => {
    const newRecord = { s: savings, e: expense, p: displayPercent, id: Date.now() };
    // 檢查重複
    if (history.length > 0 && history[0].s === savings && history[0].e === expense) return;
    setHistory(prev => [newRecord, ...prev].slice(0, 4));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* 左側：進度看板 */}
        <div className="flex-1 p-12 border-b md:border-b-0 md:border-r border-slate-50 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">FIRE Progress</h3>
          <div className="mb-8">
            <span className="text-8xl font-black text-slate-900 tracking-tighter">{displayPercent}</span>
            <span className="text-3xl font-bold text-orange-500 ml-1">%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-6">
            <div 
              className="bg-orange-500 h-full transition-all duration-500" 
              style={{ width: `${displayPercent}%` }}
            ></div>
          </div>
          <p className="text-slate-400 text-sm italic font-medium">
            目標金額：$ {(fireGoal / 10000).toLocaleString()} 萬
          </p>
        </div>

        {/* 右側：輸入與控制 */}
        <div className="flex-1 p-12 bg-slate-50/50 space-y-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">預期月支出 (TWD)</label>
              <input 
                type="number" 
                value={expense}
                onChange={(e) => setExpense(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3 ml-1">目前總存款 (TWD)</label>
              <input 
                type="number" 
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 p-5 rounded-2xl text-xl font-bold outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div className={`text-center py-3 rounded-xl font-bold text-sm transition-colors ${
            isReached ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
          }`}>
            {isReached ? "🎉 您已達成 FIRE！" : "繼續加油，離自由不遠了！"}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase">近期試算劇本</span>
              <button onClick={handleSave} className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition-all">
                儲存目前結果
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setSavings(item.s); setExpense(item.e); }}
                  className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-500 hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm"
                >
                  💸 {item.e/1000}k / 💰 {item.s/10000}萬
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireCalculator;
