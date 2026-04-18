import React from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExchangeSection from './components/ExchangeSection';
import FireCalculator from './components/FireCalculator';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar />

      <main>
        <Hero />
        <ExchangeSection />
        <FireCalculator />
        <Features />
        <CallToAction />                             
      </main>

      <Footer />
    </div>
  );
}

export default App;
