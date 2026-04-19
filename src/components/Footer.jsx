import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-6 py-12 text-slate-300">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-white">H</div>
              <span className="text-xl font-bold tracking-tight text-white">HiHoMoney <span className="text-emerald-500">2.0</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              致力於推廣 FIRE 運動，讓每個人都能透過科學的理財工具，提早拿回人生的主導權。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-6 font-bold text-white">快速連結</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="inline-block transition-colors hover:text-emerald-400 active:scale-95">理財工具</a></li>
              <li><a href="#" className="inline-block transition-colors hover:text-emerald-400 active:scale-95">FIRE 攻略</a></li>
              <li><a href="#" className="inline-block transition-colors hover:text-emerald-400 active:scale-95">關於我們</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-6 font-bold text-white">追蹤我們</h4>
            <div className="flex gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-all hover:bg-emerald-600 active:scale-90">📱</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-all hover:bg-emerald-600 active:scale-90">📧</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-all hover:bg-emerald-600 active:scale-90">📸</button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HiHoMoney 2.0. All rights reserved. Created by Amos .</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
