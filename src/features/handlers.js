import {
  Signs,
  isAnswer,
  changeIsAnswer,
  MAX_DISPLAY_LENGTH,
} from './constants.js';
import { addToHistory } from './history.js';
import { safeEval, changeSign } from '../math/expressions.js';

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
  const currentDisplay = display.textContent;
  const lastChar = currentDisplay[currentDisplay.length - 1];

  switch (true) {
    case textContent === 'AC':
      display.textContent = '0';
      break;

    case textContent === '%':
      if (
        /\d$/.test(currentDisplay) &&
        !currentDisplay.endsWith('%') &&
        !currentDisplay.endsWith('.')
      ) {
        display.textContent = currentDisplay + '%';
      }
      break;

    case Signs.includes(textContent):
      if (isAnswer) changeIsAnswer(false);
      display.textContent = Signs.includes(lastChar)
        ? currentDisplay.slice(0, -1) + textContent
        : currentDisplay + textContent;
      break;

    case textContent === '+/-':
      changeSign();
      break;

    case textContent === '=':
      handleEquals();
      break;

    default:
      if (currentDisplay.endsWith('%')) {
        return;
      }
      display.textContent = shouldResetDisplay()
        ? textContent === '.'
          ? '0.'
          : textContent
        : handleNumberInput(currentDisplay, textContent);
      if (isAnswer) changeIsAnswer(false);
  }
}

function handleNumberInput(currentDisplay, newInput) {
  if (shouldResetDisplay()) {
    return newInput;
  }

  const parts = currentDisplay.split(/[-+x÷]/);
  const lastNumber = parts[parts.length - 1];

  if (newInput === '0') {
    if (lastNumber === '0') return currentDisplay;
    return currentDisplay + newInput;
  }

  if (newInput === '.') {
    if (lastNumber.includes('.')) {
      return currentDisplay;
    }
    if (lastNumber === '') {
      return currentDisplay + '0.';
    }
    return currentDisplay + '.';
  }

  if (lastNumber === '0') {
    return currentDisplay.slice(0, -1) + newInput;
  }

  return currentDisplay + newInput;
}

function handleEquals() {
  const expr = display.textContent;
  display.textContent = safeEval(expr);
  display.textContent !== 'Error' && addToHistory(expr, display.textContent);
  changeIsAnswer(true);
}

function shouldResetDisplay() {
  return (
    display.textContent === '0' || display.textContent === 'Error' || isAnswer
  );
}
