import { handleButtonClick } from './features/handlers.js';
import { updateHistoryList } from './features/history.js';

export function initializeApp() {
  document.querySelectorAll('.buttons button').forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });
  updateHistoryList();
}
