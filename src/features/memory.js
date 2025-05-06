import { handleEquals } from './handlers';
import { isAnswer } from './constants';

export function handleMemoryOperations(textContent) {
  const display = document.querySelector('.display');
  switch (textContent) {
    case 'M+':
    case 'M-': {
      handleEquals();
      const memory = localStorage.getItem('memory') || '';
      if (isAnswer) {
        let newValue = display.textContent;
        if (memory) {
          newValue = eval(
            `${memory} ${textContent === 'M+' ? '+' : '-'} ${newValue}`
          );
        }
        localStorage.setItem('memory', newValue);
      }
      break;
    }
    case 'MC':
      localStorage.setItem('memory', '');
      break;
    case 'MR': {
      const memory = localStorage.getItem('memory');
      display.textContent = memory ? memory : '0';
      break;
    }
  }
}
