import React from 'react';

const Features = () => {
  const features = [
    {
      emoji: "📊",
      title: "資產看板",
      desc: "一目了然你的淨資產變化，掌握每一分錢的去向，讓理財不再是流水帳。",
      bgColor: "bg-emerald-100"
    },
    {
      emoji: "🔥",
      title: "FIRE 計算機",
      desc: "輸入你的支出與儲蓄，精確算出你的退休數字，縮短你與自由的距離。",
      bgColor: "bg-blue-100"
    },
    {
      emoji: "🚀",
      title: "投資策略",
      desc: "根據你的風險承受度，提供最適合的資產配置建議，實現被動收入最大化。",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            為什麼選擇 HiHoMoney <span className="text-emerald-500">2.0</span>？
          </h2>
          <p className="mt-4 text-lg text-slate-600">專為追求財務自由的你，打造最直覺的理財工具。</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((item, idx) => (
            <div key={idx} className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl active:scale-95 active:shadow-inner">
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bgColor} text-2xl`}>
                {item.emoji}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
