import React, { useState, useEffect } from 'react';

const ExchangeSection = () => {
  // 1. 定義狀態：存放匯率資料與目前選中的貨幣
  const [rates, setRates] = useState({ USD: '--.--', JPY: '--.---', EUR: '--.--', CNY: '--.--' });
  const [selected, setSelected] = useState(null);

  // 2. 轉換邏輯：保留你原本的 toTWD 計算方式
  const toTWD = (rate, fixed = 2) => (1 / rate).toFixed(fixed);

  // 3. 抓取資料：組件掛載時執行一次
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/TWD');
        const data = await response.json();
        const { rates: r } = data;
        
        setRates({
          USD: toTWD(r.USD),
          JPY: toTWD(r.JPY, 3), // 日幣保留三位
          EUR: toTWD(r.EUR),
          CNY: toTWD(r.CNY)
        });
      } catch (error) {
        console.error("匯率抓取失敗", error);
      }
    };

    fetchRates();
  }, []);

  // 貨幣卡片配置資料
  const currencyConfigs = [
    { code: 'USD', label: '美金', value: rates.USD },
    { code: 'JPY', label: '日幣', value: rates.JPY },
    { code: 'EUR', label: '歐元', value: rates.EUR },
    { code: 'CNY', label: '人民幣', value: rates.CNY },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-slate-800 flex items-center">
          <span className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></span>
          市場即時匯率 (TWD)
        </h2>
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currencyConfigs.map((cur) => (
          <div
            key={cur.code}
            onClick={() => setSelected(cur.code)}
            className={`bg-white p-6 rounded-[2rem] shadow-sm border transition-all duration-300 cursor-pointer 
              ${selected === cur.code 
                ? 'ring-2 ring-emerald-500 shadow-md scale-[1.02] bg-slate-50 border-emerald-200' 
                : 'border-slate-100 hover:border-emerald-200'}`}
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {cur.code} / {cur.label}
            </p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {cur.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExchangeSection;
