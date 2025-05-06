import {
  changeIsAnswer,
  MAX_DISPLAY_LENGTH,
  shouldResetDisplay,
  SPECIAL_FUNCTIONS,
  MEMORY_OPERATIONS,
  MATH_OPERATIONS,
} from './constants.js';
import { handleMathFunctions } from './utils.js';
import { addToHistory } from './history.js';
import { safeEval, changeSign } from '../math/expressions.js';
import { handleMemoryOperations } from './memory.js';
import { handleOperatorsAndNumbers } from './utils.js';

const display = document.querySelector('.display');

export function handleButtonClick() {
  if (this.textContent === '') {
    return;
  }
  if (display.textContent.length >= MAX_DISPLAY_LENGTH) {
    confirm(
      'Limit of expression length, solve it? If not, the field will be cleared.'
    )
      ? handleEquals()
      : (display.textContent = '0');
    return;
  }

  const { textContent } = this;

  if (display.textContent !== 'Error') {
    if (SPECIAL_FUNCTIONS.includes(textContent)) {
      handleSpecialFunctions(textContent);
    } else if (MEMORY_OPERATIONS.includes(textContent)) {
      handleMemoryOperations(textContent);
    } else if (MATH_OPERATIONS.includes(textContent)) {
      handleMathFunctions(textContent);
    } else {
      handleOperatorsAndNumbers(textContent);
    }
  } else {
    if (/^\d$/.test(textContent)) handleOperatorsAndNumbers(textContent);
  }
}

export function handleEquals() {
  const expr = display.textContent;
  display.textContent = safeEval(expr);
  display.textContent !== 'Error' && addToHistory(expr, display.textContent);
  changeIsAnswer(true);
}

function handleSpecialFunctions(textContent) {
  const currentDisplay = display.textContent;
  switch (textContent) {
    case 'AC':
      display.textContent = '0';
      break;
    case '+/-':
      changeSign();
      break;
    case '%':
      if (
        /\d$/.test(currentDisplay) &&
        !currentDisplay.endsWith('%') &&
        !currentDisplay.endsWith('.')
      ) {
        display.textContent = currentDisplay + '%';
      }
      break;
    case '=':
      handleEquals();
      break;
  }
}
