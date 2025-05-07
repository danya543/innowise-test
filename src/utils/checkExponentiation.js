import { isLastNumber } from './isLastNumber.js';

export function checkExponentiation(currentDisplay, operator) {
  if (currentDisplay === '0' || currentDisplay === 'Error')
    return currentDisplay;
  return isLastNumber(currentDisplay, operator);
}
