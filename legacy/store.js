import { renderProgressUI } from './render.js';

const fireState = {
  expense: Number(sessionStorage.getItem('fire_expense')) || 50000,
  savings: Number(sessionStorage.getItem('fire_savings')) || 1200000
};

// 導出強大的狀態引擎
export const state = new Proxy(fireState, {
  set(target, key, value) {
    target[key] = value;
    renderProgressUI(target); // 自動驅動渲染
    sessionStorage.setItem(`fire_${key}`, value);
    return true;
  }
});
