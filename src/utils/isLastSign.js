export function isLastSign(expr, operator) {
  const isValid = /^[-+/*]$/.test(expr.slice(-1));

  if (expr !== 'Error' && expr !== '0' && isValid) {
    return expr + operator;
  } else {
    return expr === '0' ? operator : expr;
  }
}
