export function isLastNumber(expr, operator) {
  const lastChar = expr.slice(-1);
  const isValid = /\d|\)/.test(lastChar);

  if (expr !== 'Error' && isValid) {
    return expr + operator;
  } else {
    return expr === 'Error' ? '0' : expr;
  }
}
