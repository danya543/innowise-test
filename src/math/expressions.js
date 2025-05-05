export function changeSign() {
  const display = document.querySelector('.display');
  const currentValue = display.textContent;

  if (currentValue === '0' || currentValue === 'Error') return;

  // common number or with % 5% ↔ -5%, 5 ↔ -5
  if (/^-?\d+\.?\d*%?$/.test(currentValue)) {
    display.textContent = currentValue.startsWith('-')
      ? currentValue.substring(1)
      : '-' + currentValue;
    return;
  }

  // multiplication/division
  const multDivRegex = /([x÷])(-?)(\d+\.?\d*%?)$/;
  const multDivMatch = currentValue.match(multDivRegex);
  if (multDivMatch) {
    const [, operator, minus, number] = multDivMatch;
    const newMinus = minus === '-' ? '' : '-';
    display.textContent = currentValue.replace(
      multDivRegex,
      `${operator}${newMinus}${number}`
    );
    return;
  }

  // for x^y ↔ -x^-y
  const powerRegex = /\^(-?\d+\.?\d*)$/;
  const powerMatch = currentValue.match(powerRegex);
  if (powerMatch) {
    const powerValue = powerMatch[1];
    const newPower = powerValue.startsWith('-')
      ? powerValue.substring(1)
      : '-' + powerValue;
    display.textContent = currentValue.replace(powerRegex, `^${newPower}`);
    return;
  }

  // factorial: 5! → -5!
  if (/^-?\d+\.?\d*!$/.test(currentValue)) {
    display.textContent = currentValue.startsWith('-')
      ? currentValue.substring(1)
      : '-' + currentValue;
    return;
  }

  // factorial: 10-5! ↔ 10+5!
  const operatorFactorialRegex = /([+-])(\d+)!$/;
  const operatorFactorialMatch = currentValue.match(operatorFactorialRegex);
  if (operatorFactorialMatch) {
    const [, operator, number] = operatorFactorialMatch;
    const newOperator = operator === '+' ? '-' : '+';
    display.textContent = currentValue.replace(
      operatorFactorialRegex,
      `${newOperator}${number}!`
    );
    return;
  }

  // common number and with % 10+5% ↔ 10-5%, 10+5 ↔ 10-5
  const operatorRegex = /([-+])(\d+\.?\d*%?)$/;
  const operatorMatch = currentValue.match(operatorRegex);
  if (operatorMatch) {
    const [, operator, number] = operatorMatch;
    const newOperator = operator === '+' ? '-' : '+';
    display.textContent = currentValue.replace(
      operatorRegex,
      `${newOperator}${number}`
    );
    return;
  }
}

export function safeEval(expr) {
  let processedExpr = expr
    .replace(/÷/g, '/')
    .replace(/x/g, '*')
    .replace(/√(\d+(\.\d+)?)/g, '($1^(1/2))')
    .replace(/∛(\d+(\.\d+)?)/g, '($1^(1/3))')
    .replace(/\^/g, '**')
    .replace(/%/g, '/100');
  if (/(\d+(\.\d+)?)!/g.test(processedExpr)) {
    const result = factorial(processedExpr);
    processedExpr = processedExpr.replace(/(\d+(\.\d+)?)!/g, result);
  }

  processedExpr = processedExpr.replace(/\+-/g, '-').replace(/--/g, '+');

  processedExpr = processedExpr.replace(/[^\d+\-*/.^()]/g, '');

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

function factorial(value) {
  const match = value.match(/(\d+(\.\d+)?)!/);
  return countFactorial(+match[1]);
}

function countFactorial(value) {
  if (value === 1) return value;
  return value * countFactorial(--value);
}
