import {
  Signs,
  isAnswer,
  changeIsAnswer,
  MAX_DISPLAY_LENGTH,
  shouldResetDisplay,
  isLastNumber,
  isLastSign,
  checkExponentiation,
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

    case textContent === 'x²':
      display.textContent = checkExponentiation(currentDisplay, '^2');
      break;

    case textContent === 'x³':
      display.textContent = checkExponentiation(currentDisplay, '^3');
      break;
    case textContent === 'xʸ':
      display.textContent = checkExponentiation(currentDisplay, '^');
      break;

    case textContent === '10ˣ':
      display.textContent = isLastSign(currentDisplay, '10^');
      break;

    case textContent === '√':
      if (shouldResetDisplay(currentDisplay)) {
        display.textContent = '√';
        changeIsAnswer(false);
      } else display.textContent = isLastSign(currentDisplay, '√');
      break;

    case textContent === '∛':
      if (shouldResetDisplay(currentDisplay)) {
        display.textContent = '∛';
        changeIsAnswer(false);
      } else display.textContent = isLastSign(currentDisplay, '∛');
      break;
    case textContent === 'ʸ√':
      isAnswer ? changeIsAnswer(false) : null;
      display.textContent = isLastNumber(currentDisplay, '√');
      break;
    case textContent === 'x!':
      display.textContent = isLastNumber(currentDisplay, '!');
      break;

    case textContent === '=':
      handleEquals();
      break;

    default:
      if (currentDisplay.endsWith('%') || currentDisplay.endsWith('!')) {
        return;
      }
      display.textContent = shouldResetDisplay(currentDisplay)
        ? textContent === '.'
          ? '0.'
          : textContent
        : handleNumberInput(currentDisplay, textContent);
      if (isAnswer) changeIsAnswer(false);
  }
}

function handleNumberInput(currentDisplay, newInput) {
  if (shouldResetDisplay(currentDisplay)) {
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

//! changeSign for √
//! 5√, 10^, x^  можно только число проверку сделать      проверить changeSign
//! 0√ нельзя
//? 1/x сделать
//? -4^2 check
