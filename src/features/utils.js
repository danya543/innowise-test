import {
  isAnswer,
  checkExponentiation,
  isLastSign,
  shouldResetDisplay,
  changeIsAnswer,
  isLastNumber,
  Signs,
} from './constants';

const display = document.querySelector('.display');
export function handleMathFunctions(textContent) {
  const currentDisplay = display.textContent;
  switch (textContent) {
    case 'x²':
      display.textContent = checkExponentiation(currentDisplay, '^2');
      break;
    case 'x³':
      display.textContent = checkExponentiation(currentDisplay, '^3');
      break;
    case 'xʸ': {
      display.textContent = checkExponentiation(currentDisplay, '^');
      break;
    }

    case '10ˣ':
      display.textContent = isLastSign(currentDisplay, '10^');
      break;
    case '1/x':
      if (isAnswer) {
        changeIsAnswer(false);
        display.textContent = '1/';
        break;
      }
      display.textContent = isLastSign(currentDisplay, '1/');
      break;

    case '√':
      if (shouldResetDisplay(currentDisplay)) {
        display.textContent = '√';
        changeIsAnswer(false);
      } else display.textContent = isLastSign(currentDisplay, '√');
      break;
    case '∛':
      if (shouldResetDisplay(currentDisplay)) {
        display.textContent = '∛';
        changeIsAnswer(false);
      } else display.textContent = isLastSign(currentDisplay, '∛');
      break;
    case 'ʸ√':
      isAnswer ? changeIsAnswer(false) : null;
      display.textContent = isLastNumber(currentDisplay, '√');
      break;

    case 'x!':
      display.textContent = isLastNumber(currentDisplay, '!');
      break;
  }
}

export function handleOperatorsAndNumbers(textContent) {
  const currentDisplay = display.textContent;
  const lastChar = currentDisplay[currentDisplay.length - 1];
  if (Signs.includes(textContent)) {
    if (
      currentDisplay.endsWith('^') ||
      currentDisplay.endsWith('√') ||
      currentDisplay.endsWith('∛') ||
      display.textContent === 'Error'
    )
      return;
    else {
      if (isAnswer) changeIsAnswer(false);
      display.textContent = Signs.includes(lastChar)
        ? currentDisplay.slice(0, -1) + textContent
        : currentDisplay + textContent;
    }
  } else {
    if (currentDisplay.endsWith('%') || currentDisplay.endsWith('!')) return;

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
