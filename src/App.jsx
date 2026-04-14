import React from 'react';

// 目前只啟用 Navbar
import Navbar from './components/Navbar';

// 下列組件暫時註解，待逐一重構後再放行
// import Hero from './components/Hero';
// import ExchangeSection from './components/ExchangeSection';
// import FireCalculator from './components/FireCalculator';
// import Features from './components/Features';
// import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      
      {/* 第一步：重構導覽列 */}
      <Navbar />

      <main>
        {/* 暫時註解其他區塊，確保開發環境乾淨
          <Hero />
          <ExchangeSection />
          <FireCalculator />
          <Features />
        */}
        
        {/* 你可以在這裡放一個暫時的佔位符，確認內容區有出來 */}
        <div className="flex items-center justify-center py-20 text-slate-400">
          導覽列開發中，其他區塊已暫時隱藏...
        </div>
      </main>

      {/* <Footer /> */}
      
    </div>
  );
}

export default App;
