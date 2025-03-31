export function changeSign() {
  const display = document.querySelector('.display');
  const currentValue = display.textContent;

  if (currentValue === '0' || currentValue === 'Error') return;

  if (/^-?\d+\.?\d*%?$/.test(currentValue)) {
    if (currentValue.includes('%')) {
      const num = currentValue.replace('%', '');
      display.textContent = num.startsWith('-')
        ? num.substring(1) + '%'
        : '-' + num + '%';
    } else {
      display.textContent = currentValue.startsWith('-')
        ? currentValue.substring(1)
        : '-' + currentValue;
    }
    return;
  }

  const multDivNegativeRegex = /([x÷])(-)(\d+\.?\d*%?)$/;
  if (multDivNegativeRegex.test(currentValue)) {
    display.textContent = currentValue.replace(multDivNegativeRegex, '$1$3');
    return;
  }

  const multDivPositiveRegex = /([x÷])(\d+\.?\d*%?)$/;
  if (multDivPositiveRegex.test(currentValue)) {
    display.textContent = currentValue.replace(multDivPositiveRegex, '$1-$2');
    return;
  }

  const operatorPercentRegex = /([-+])(\d+\.?\d*%)$/;
  const operatorPercentMatch = currentValue.match(operatorPercentRegex);
  if (operatorPercentMatch) {
    const [, operator, percent] = operatorPercentMatch;
    const newOperator = operator === '+' ? '-' : '+';
    display.textContent = currentValue.replace(
      operatorPercentRegex,
      `${newOperator}${percent}`
    );
    return;
  }

  const operatorNumberRegex = /([-+])(\d+\.?\d*)$/;
  const operatorNumberMatch = currentValue.match(operatorNumberRegex);
  if (operatorNumberMatch) {
    const [, operator, number] = operatorNumberMatch;
    const newOperator = operator === '+' ? '-' : '+';
    display.textContent = currentValue.replace(
      operatorNumberRegex,
      `${newOperator}${number}`
    );
    return;
  }
}

export function safeEval(expr) {
  let processedExpr = expr
    .replace(/÷/g, '/')
    .replace(/x/g, '*')
    .replace(/%/g, '/100');

  processedExpr = processedExpr.replace(/\+-/g, '-').replace(/--/g, '+');

  processedExpr = processedExpr.replace(/[^\d+\-*/.()]/g, '');

  try {
    const result = new Function('return ' + processedExpr)();
    if (!isFinite(result)) throw new Error('Division by zero');
    return result % 1 === 0
      ? result.toString()
      : result.toFixed(8).replace(/\.?0+$/, '');
  } catch {
    return 'Error';
  }
}
