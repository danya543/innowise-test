import { isLastSign } from '../utils/isLastSign.js';
import { isLastNumber } from '../utils/isLastNumber.js';
import { handleNthRootExpr, checkFactorial } from '../math/additional.js';

export class Calculator {
  constructor(display) {
    this.display = display;
    this._value = '0';
    this.history = [];
  }

  set currentValue(val) {
    this._value = val;
    this.updateDisplay();
  }
  get currentValue() {
    return this._value;
  }

  saveState() {
    this.history.push(this.currentValue);
    if (this.history.length > 100) this.history.shift();
  }

  undo() {
    if (this.history.length > 0) {
      this.currentValue = this.history.pop();
    }
  }

  inputDigit(digit) {
    if (
      this.currentValue.endsWith('%') ||
      this.currentValue.endsWith('!') ||
      this.currentValue.endsWith('Undefined')
    )
      return;

    if (digit === '.') {
      const lastNumber = this.currentValue.split(/[-+*/^]/).pop();
      if (!lastNumber.includes('.')) {
        this.saveState();
        if (lastNumber === '') {
          this.currentValue += '0.';
        } else if (this.currentValue === 'Undefined') {
          this.currentValue = '0.';
        } else this.currentValue += '.';
      }
    } else {
      this.saveState();
      this.currentValue =
        this.currentValue === '0' ? digit : this.currentValue + digit;
    }
  }

  inputOperator(operator) {
    if (
      this.currentValue.endsWith('^') ||
      this.currentValue.endsWith('√') ||
      this.currentValue.endsWith('∛') ||
      this.currentValue === 'Undefined'
    )
      return;

    if (this.autoEvaluateOnOperator(operator)) return;

    const lastChar = this.currentValue.slice(-1);
    this.saveState();
    if ('+-*/'.includes(lastChar)) {
      this.currentValue = this.currentValue.slice(0, -1) + operator;
    } else {
      this.currentValue += operator;
    }
  }

  prepareExpression(raw) {
    return handleNthRootExpr(
      checkFactorial(
        raw
          .replace(
            /(^|[+\-*/])√(\d+(\.\d+)?)/g,
            (_, op, num) => `${op}(${num}^(1/2))`
          )
          .replace(/∛(-)?(\d+(\.\d+)?)/g, (_, minus, number) =>
            minus ? `-(${number}^(1/3))` : `(${number}^(1/3))`
          )
          .replace(/^-(\d+(\.\d+)?)\^/, '(-$1)^')
          .replace(/\^/g, '**')
          .replace(/%/g, '/100')
          .replace(/[^\d+\-*/.^()]/g, '')
      )
    );
  }

  evaluate() {
    const expression = this.prepareExpression(this.currentValue);
    try {
      const result = new Function('return ' + expression)();
      if (!isFinite(result)) throw new Error('Division by zero');
      this.currentValue =
        result % 1 === 0
          ? result.toString()
          : result.toFixed(8).replace(/\.?0+$/, '');
    } catch {
      this.currentValue = 'Undefined';
    }
  }

  clear() {
    this.saveState();
    this.currentValue = '0';
  }

  changeSign() {
    if (this.currentValue === '0') return;
    this.saveState();

    // common number or with % 5% ↔ -5%, 5 ↔ -5
    if (/^-?\d+\.?\d*%?$/.test(this.currentValue)) {
      this.currentValue = this.currentValue.startsWith('-')
        ? this.currentValue.substring(1)
        : '-' + this.currentValue;
      return;
    }

    // multiplication/division
    const multDivRegex = /([x÷])(-?)(\d+\.?\d*%?)$/;
    const multDivMatch = this.currentValue.match(multDivRegex);
    if (multDivMatch) {
      const [, operator, minus, number] = multDivMatch;
      const newMinus = minus === '-' ? '' : '-';
      this.currentValue = this.currentValue.replace(
        multDivRegex,
        `${operator}${newMinus}${number}`
      );
      return;
    }

    // for x^y ↔ -x^-y
    const powerRegex = /\^(-?\d+\.?\d*)$/;
    const powerMatch = this.currentValue.match(powerRegex);
    if (powerMatch) {
      const powerValue = powerMatch[1];
      const newPower = powerValue.startsWith('-')
        ? powerValue.substring(1)
        : '-' + powerValue;
      this.currentValue = this.currentValue.replace(powerRegex, `^${newPower}`);
      return;
    }

    // factorial: 5! → -5!
    if (/^-?\d+\.?\d*!$/.test(this.currentValue)) {
      this.currentValue = this.currentValue.startsWith('-')
        ? this.currentValue.substring(1)
        : '-' + this.currentValue;
      return;
    }

    // factorial: 10-5! ↔ 10+5!
    const operatorFactorialRegex = /([+-])(\d+)!$/;
    const operatorFactorialMatch = this.currentValue.match(
      operatorFactorialRegex
    );
    if (operatorFactorialMatch) {
      const [, operator, number] = operatorFactorialMatch;
      const newOperator = operator === '+' ? '-' : '+';
      this.currentValue = this.currentValue.replace(
        operatorFactorialRegex,
        `${newOperator}${number}!`
      );
      return;
    }

    // root: √3 → √-3 → √3
    const rootRegex = /(√|∛)(-?)(\d+\.?\d*)$/;
    const rootMatch = this.currentValue.match(rootRegex);
    if (rootMatch) {
      const [, rootSymbol, minus, number] = rootMatch;
      const newMinus = minus === '-' ? '' : '-';
      this.currentValue = this.currentValue.replace(
        rootRegex,
        `${rootSymbol}${newMinus}${number}`
      );
      return;
    }

    // inverse: 1/x ↔ 1/-x
    const inverseRegex = /1\/(-?)(\d+\.?\d*)$/;
    const inverseMatch = this.currentValue.match(inverseRegex);
    if (inverseMatch) {
      const [, minus, number] = inverseMatch;
      const newMinus = minus === '-' ? '' : '-';
      this.currentValue = this.currentValue.replace(
        inverseRegex,
        `1/${newMinus}${number}`
      );
      return;
    }

    // common number and with % 10+5% ↔ 10-5%, 10+5 ↔ 10-5
    const operatorRegex = /([-+])(\d+\.?\d*%?)$/;
    const operatorMatch = this.currentValue.match(operatorRegex);
    if (operatorMatch) {
      const [, operator, number] = operatorMatch;
      const newOperator = operator === '+' ? '-' : '+';
      this.currentValue = this.currentValue.replace(
        operatorRegex,
        `${newOperator}${number}`
      );
      return;
    }
  }

  percent() {
    if (
      /\d$/.test(this.currentValue) &&
      !this.currentValue.endsWith('%') &&
      !this.currentValue.endsWith('.')
    ) {
      this.saveState();
      this.currentValue = this.currentValue + '%';
    }
  }

  applyPower(exponent) {
    this.saveState();
    if (exponent !== undefined && exponent !== null) {
      this.currentValue = isLastNumber(this.currentValue, `^${exponent}`);
    } else {
      this.currentValue = isLastNumber(this.currentValue, '^');
    }
  }

  tenPower() {
    this.saveState();
    this.currentValue = isLastSign(this.currentValue, '10^');
  }

  inverse() {
    this.saveState();
    this.currentValue = isLastSign(this.currentValue, '1/');
  }

  applyRoot(degree) {
    this.saveState();
    if (degree === 2) {
      this.currentValue =
        this.currentValue === '0' || this.currentValue === 'Undefined'
          ? `√`
          : isLastSign(this.currentValue, '√');
    } else if (degree === 3) {
      this.currentValue =
        this.currentValue === '0' || this.currentValue === 'Undefined'
          ? `∛`
          : isLastSign(this.currentValue, '∛');
    } else {
      this.currentValue = isLastNumber(this.currentValue, '√');
    }
  }

  factorial() {
    this.saveState();
    this.currentValue = isLastNumber(this.currentValue, '!');
  }

  memory(type) {
    this.saveState();
    switch (type) {
      case 'M+':
      case 'M-': {
        this.evaluate();
        const memory = localStorage.getItem('memory') || '';
        let newValue = this.currentValue;
        if (memory) {
          newValue = eval(`${memory} ${type === 'M+' ? '+' : '-'} ${newValue}`);
        }
        localStorage.setItem('memory', newValue);
        break;
      }
      case 'MC':
        localStorage.setItem('memory', '');
        break;
      case 'MR': {
        const memory = localStorage.getItem('memory');
        this.currentValue = memory ? memory : '0';
        break;
      }
    }
  }

  autoEvaluateOnOperator(operator) {
    this.saveState();
    try {
      const expression = this.prepareExpression(this.currentValue);

      const result = new Function('return ' + expression)();
      if (!isFinite(result)) throw new Error('Division by zero');
      const formattedResult =
        result % 1 === 0
          ? result.toString()
          : result.toFixed(8).replace(/\.?0+$/, '');

      this.currentValue = formattedResult + operator;
      return true;
    } catch {
      this.currentValue = 'Undefined';
      return true;
    }
  }

  updateDisplay() {
    this.display.textContent = this.currentValue;
  }
}
