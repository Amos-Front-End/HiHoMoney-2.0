// 進口所有需要的零件
import { updateExchangeDashboard, initRateEvents } from './api.js';
import { state } from './store.js';
import { renderProgressUI, renderHistory, getAppTemplate } from './render.js';

// --- 【歷史紀錄邏輯：CEO 親自監督】 ---
const saveHistory = () => {
  const s = state.savings;
  const e = state.expense;
  const p = document.querySelector('#percentNumber').textContent;
  let history = JSON.parse(sessionStorage.getItem('fire_history')) || [];
  const newRecord = { s, e, p, id: Date.now() };
  if (history.length > 0 && history[0].s === s && history[0].e === e) return;
  history.unshift(newRecord);
  history = history.slice(0, 4);
  sessionStorage.setItem('fire_history', JSON.stringify(history));
  renderHistory();
};

// 讓 HTML 按鈕依然能找到這個 function
window.loadHistory = (s, e) => {
  document.querySelector('#savingsInput').value = s;
  document.querySelector('#expenseInput').value = e;
  state.savings = s;
  state.expense = e;
};

// --- 【初始化與接線】 ---
const setupEventListeners = () => {
  document.querySelector('#savingsInput').addEventListener('input', (e) => {
    state.savings = Number(e.target.value) || 0;
  });
  document.querySelector('#expenseInput').addEventListener('input', (e) => {
    state.expense = Number(e.target.value) || 0;
  });
  document.querySelector('#saveBtn').addEventListener('click', saveHistory);
};

const initApp = () => {
  const app = document.querySelector('#fire-app');
  if (!app) return;

  // 從渲染部門拿模板，並填入目前資料
  app.innerHTML = getAppTemplate(state.expense, state.savings);

  setupEventListeners();
  renderProgressUI(state);
  renderHistory();
};

// 總啟動
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateExchangeDashboard();
    initRateEvents();
});
