import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-slate-50 px-6 py-12 md:py-20">
      {/* 右側裝飾性背景 */}
      <div className="absolute top-0 right-0 h-full w-1/3 -translate-x-1/4 -skew-x-12 bg-emerald-500/5 transition-all duration-1000"></div>
      
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <header className="space-y-8 text-center md:text-left">
          <div className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
            🔥 FIRE 運動實踐中
          </div>
          
          <h1 className="text-5xl leading-[1.1] font-black text-slate-900 md:text-7xl">
            陪你一起實踐 <br />
            <span className="text-6xl text-emerald-500 italic md:text-8xl">FIRE</span>
            <span className="text-slate-800"> 運動</span>
          </h1>
          
          <p className="mx-auto max-w-md text-xl leading-relaxed text-slate-600 md:mx-0">
            財務自由、提早退休。我們不僅提供知識，更提供工具與策略，讓你拿回生活的主控權。
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <button className="rounded-2xl bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95">
              免費加入社群
            </button>
            <button className="rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500 active:scale-95">
              探索理財工具
            </button>
          </div>
        </header>

        {/* 右側裝飾圖示 */}
        <div className="hidden justify-center lg:flex">
          <div className="flex h-80 w-80 rotate-3 items-center justify-center rounded-[4rem] bg-white text-9xl shadow-2xl transition-transform duration-700 hover:rotate-0">
            💰
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
