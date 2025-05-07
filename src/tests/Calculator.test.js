import { Calculator } from '../features/Calculator.js';

describe('Calculator core operations', () => {
  let calc;
  let mockDisplay;

  beforeEach(() => {
    mockDisplay = { textContent: '' };
    calc = new Calculator(mockDisplay);
  });

  test('inputDigit appends numbers correctly', () => {
    calc.inputDigit('5');
    expect(calc.value).toBe('5');
    calc.inputDigit('3');
    expect(calc.value).toBe('53');
  });

  test('inputDigit handles leading zero and dot correctly', () => {
    calc.inputDigit('.');
    expect(calc.value).toBe('0.');
    calc.inputDigit('1');
    expect(calc.value).toBe('0.1');
  });

  test('inputOperator appends operator correctly', () => {
    calc.inputDigit('6');
    calc.inputOperator('+');
    expect(calc.value).toBe('6+');
    calc.inputOperator('-');
    expect(calc.value).toBe('6-');
  });

  test('evaluate simple expression', () => {
    calc.inputDigit('8');
    calc.inputOperator('*');
    calc.inputDigit('5');
    calc.evaluate();
    expect(calc.value).toBe('40');
  });

  test('evaluate with square root', () => {
    calc.value = '√9';
    calc.evaluate();
    expect(calc.value).toBe('3');
  });

  test('evaluate with cube root', () => {
    calc.value = '∛27';
    calc.evaluate();
    expect(calc.value).toBe('3');
  });

  test('evaluate factorial', () => {
    calc.value = '5!';
    calc.evaluate();
    expect(calc.value).toBe('120');
  });

  test('evaluate power', () => {
    calc.value = '2^3';
    calc.evaluate();
    expect(calc.value).toBe('8');
  });

  test('changeSign toggles sign for simple number', () => {
    calc.value = '25';
    calc.changeSign();
    expect(calc.value).toBe('-25');
    calc.changeSign();
    expect(calc.value).toBe('25');
  });

  test('percent appends percent sign', () => {
    calc.value = '75';
    calc.percent();
    expect(calc.value).toBe('75%');
  });

  test('inverse transforms to 1/x', () => {
    calc.value = '4';
    calc.inverse();
    expect(calc.value).toBe('1/4');
  });

  test('applyPower appends ^ correctly', () => {
    calc.value = '5';
    calc.applyPower(2);
    expect(calc.value).toBe('5^2');
  });

  test('applyRoot adds √ for square root', () => {
    calc.value = '4';
    calc.applyRoot(2);
    expect(calc.value).toBe('4√');
  });

  test('factorial appends "!" correctly', () => {
    calc.value = '6';
    calc.factorial();
    expect(calc.value).toBe('6!');
  });

  test('evaluate division by zero gives Undefined', () => {
    calc.value = '5/0';
    calc.evaluate();
    expect(calc.value).toBe('Undefined');
  });
});
