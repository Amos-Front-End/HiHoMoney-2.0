// --- 【匯率 API 功能模組】 ---
const apiURL = 'https://open.er-api.com/v6/latest/TWD';
const toTWD = (rate, fixed = 2) => (1 / rate).toFixed(fixed);

export const updateExchangeDashboard = async () => {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const { rates: { USD, JPY, EUR, CNY } } = data;
        document.getElementById('rate-usd').textContent = toTWD(USD);
        document.getElementById('rate-jpy').textContent = toTWD(JPY, 3);
        document.getElementById('rate-eur').textContent = toTWD(EUR);
        document.getElementById('rate-cny').textContent = toTWD(CNY);
    } catch (error) {
        console.error("匯率抓取失敗", error);
    }
};

export const initRateEvents = () => {
    const rateContainer = document.getElementById('rate-container');
    if (!rateContainer) return;
    rateContainer.addEventListener('click', (e) => {
        const card = e.target.closest('[data-code]');
        if (!card) return;
        document.querySelectorAll('#rate-container > div').forEach(el => {
            el.classList.remove('ring-2', 'ring-emerald-500', 'shadow-md', 'scale-[1.02]', 'bg-slate-50');
        });
        card.classList.add('ring-2', 'ring-emerald-500', 'shadow-md', 'scale-[1.02]', 'bg-slate-50');
    });
};
