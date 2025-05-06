export const Signs = ['÷', 'x', '-', '+'];
export let isAnswer = false;
export const changeIsAnswer = (newValue) => {
  isAnswer = newValue;
};
export const MAX_DISPLAY_LENGTH = 50;

export const SPECIAL_FUNCTIONS = ['AC', '+/-', '%', '='];
export const MEMORY_OPERATIONS = ['M+', 'M-', 'MC', 'MR'];
export const MATH_OPERATIONS = ['x²', 'x³', 'xʸ', '10ˣ', '√', '∛', 'ʸ√', 'x!'];

export function shouldResetDisplay(currentDisplay) {
  return currentDisplay === '0' || currentDisplay === 'Error' || isAnswer;
}

export function isLastNumber(expr, operator) {
  const lastChar = expr.slice(-1);
  const isValid = /\d|\)/.test(lastChar);

  if (expr !== 'Error' && isValid) {
    return expr + operator;
  } else {
    return expr === 'Error' ? '0' : expr;
  }
}

export function isLastSign(expr, operator) {
  const isValid = /^[+÷\-x]$/.test(expr.slice(-1));

  if (expr !== 'Error' && expr !== '0' && isValid) {
    return expr + operator;
  } else {
    return expr === '0' ? operator : expr;
  }
}

export function checkExponentiation(currentDisplay, operator) {
  if (currentDisplay === '0' || currentDisplay === 'Error')
    return currentDisplay;
  return isLastNumber(currentDisplay, operator);
}
