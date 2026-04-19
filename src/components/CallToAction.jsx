import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-emerald-600 px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl leading-tight font-bold text-white md:text-5xl">
          準備好開啟你的財務自由之路了嗎？
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-emerald-50 md:text-xl">
          加入超過 10,000 位使用者的行列，透過 HiHoMoney 2.0 重新掌握金錢主導權。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="w-full rounded-2xl bg-white px-10 py-4 text-center font-bold text-emerald-600 shadow-xl transition-all hover:bg-emerald-50 active:scale-95 md:w-auto">
            立即免費註冊
          </button>
          <button className="w-full rounded-2xl border-2 border-emerald-400 px-10 py-4 text-center font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 md:w-auto">
            瞭解更多細節
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
