const calculationHistory =
  JSON.parse(localStorage.getItem('calcHistory')) || [];

const historyOverlay = document.querySelector('.history-overlay');

const historyPanel = document.querySelector('.history-panel');
const historyList = document.querySelector('.history-list');
const historyBtn = document.querySelector('.history');
const clearHistoryBtn = document.querySelector('.clear-history');
const display = document.querySelector('.display');

historyBtn.addEventListener('click', () => {
  historyOverlay.classList.add('visible');
  historyPanel.classList.add('visible');
  document.body.style.overflow = 'hidden';
});

historyOverlay.addEventListener('click', () => {
  historyOverlay.classList.remove('visible');
  historyPanel.classList.remove('visible');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && historyPanel.classList.contains('visible')) {
    historyOverlay.classList.remove('visible');
    historyPanel.classList.remove('visible');
    document.body.style.overflow = '';
  }
});

clearHistoryBtn.addEventListener('click', () => {
  calculationHistory.length = 0;
  localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
  clearHistoryBtn.disabled = true;
  updateHistoryList();
});

export function addToHistory(expression, result) {
  const entry = `${expression} = ${result}`;

  if (calculationHistory.length > 0 && calculationHistory[0] === entry) {
    return;
  }

  calculationHistory.unshift(entry);
  if (calculationHistory.length > 20) {
    calculationHistory.pop();
  }
  localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
  updateHistoryList();
}

export function updateHistoryList() {
  clearHistoryBtn.disabled = calculationHistory.length > 0 ? false : true;
  historyList.innerHTML = calculationHistory
    .map((entry) => `<li>${entry}</li>`)
    .join('');
}

historyList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const entry = e.target.textContent;
    const expression = entry.split(' = ')[0];
    display.textContent = expression;
    historyOverlay.classList.remove('visible');
    historyPanel.classList.remove('visible');
  }
});
