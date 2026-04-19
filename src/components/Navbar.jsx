import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo 區塊 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            HiHoMoney <span className="text-emerald-500">2.0</span>
          </span>
        </div>

        {/* 桌面版選單 */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-500">理財工具</a>
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-500">FIRE 攻略</a>
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-500">關於我們</a>
          <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95">
            立即開始
          </button>
        </div>

        {/* 行動版選單按鈕 (漢堡選單) */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
