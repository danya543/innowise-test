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
    expect(calc.currentValue).toBe('5');
    calc.inputDigit('3');
    expect(calc.currentValue).toBe('53');
  });

  test('inputDigit handles leading zero and dot correctly', () => {
    calc.inputDigit('.');
    expect(calc.currentValue).toBe('0.');
    calc.inputDigit('1');
    expect(calc.currentValue).toBe('0.1');
  });

  test('inputDigit handles leading zero and number correctly', () => {
    calc.inputDigit('0');
    calc.inputDigit('1');
    expect(calc.currentValue).toBe('1');
    calc.inputOperator('+');
    calc.inputDigit('0');
    calc.inputDigit('2');
    expect(calc.currentValue).toBe('1+2');
  });

  test('inputDigit handles operators priority', () => {
    calc.inputDigit('1');
    expect(calc.currentValue).toBe('1');
    calc.inputOperator('+');
    calc.inputDigit('2');
    expect(calc.currentValue).toBe('1+2');
    calc.inputOperator('*');
    calc.inputDigit('3');
    expect(calc.currentValue).toBe('1+2*3');
    calc.inputOperator('/');
    calc.inputDigit('4');
    expect(calc.currentValue).toBe('1+2*3/4');
    calc.inputOperator('+');
    expect(calc.currentValue).toBe('2.5+');
  });

  test('inputOperator handles changing sign', () => {
    calc.currentValue = '2';
    calc.inputOperator('+');
    expect(calc.currentValue).toBe('2+');
    calc.inputOperator('*');
    expect(calc.currentValue).toBe('2*');
    calc.inputOperator('-');
    expect(calc.currentValue).toBe('2-');
    calc.inputOperator('/');
    expect(calc.currentValue).toBe('2/');
  });

  test('inputOperator appends operator correctly', () => {
    calc.inputDigit('6');
    calc.inputOperator('+');
    expect(calc.currentValue).toBe('6+');
    calc.inputOperator('-');
    expect(calc.currentValue).toBe('6-');
  });

  test('evaluate simple expression', () => {
    calc.inputDigit('8');
    calc.inputOperator('*');
    calc.inputDigit('5');
    calc.evaluate();
    expect(calc.currentValue).toBe('40');
  });

  test('evaluate with square root', () => {
    calc.currentValue = '√9';
    calc.evaluate();
    expect(calc.currentValue).toBe('3');
  });

  test('evaluate with cube root', () => {
    calc.currentValue = '∛27';
    calc.evaluate();
    expect(calc.currentValue).toBe('3');
  });

  test('evaluate factorial', () => {
    calc.currentValue = '5!';
    calc.evaluate();
    expect(calc.currentValue).toBe('120');
  });

  test('evaluate power', () => {
    calc.currentValue = '2^3';
    calc.evaluate();
    expect(calc.currentValue).toBe('8');
  });

  test('changeSign toggles sign for simple number', () => {
    calc.currentValue = '25';
    calc.changeSign();
    expect(calc.currentValue).toBe('-25');
    calc.changeSign();
    expect(calc.currentValue).toBe('25');
  });

  test('percent appends percent sign', () => {
    calc.currentValue = '75';
    calc.percent();
    expect(calc.currentValue).toBe('75%');
  });

  test('inverse transforms to 1/x', () => {
    calc.currentValue = '4+';
    calc.inverse();
    expect(calc.currentValue).toBe('4+1/');
  });

  test('applyPower appends ^ correctly', () => {
    calc.currentValue = '5';
    calc.applyPower(2);
    expect(calc.currentValue).toBe('5^2');
  });

  test('applyRoot adds √ for square root', () => {
    calc.currentValue = '4';
    calc.applyRoot();
    expect(calc.currentValue).toBe('4√');
  });

  test('factorial appends "!" correctly', () => {
    calc.currentValue = '6';
    calc.factorial();
    expect(calc.currentValue).toBe('6!');
  });

  test('evaluate division by zero gives Undefined', () => {
    calc.currentValue = '5/0';
    calc.evaluate();
    expect(calc.currentValue).toBe('Undefined');
  });
});
//add new tests for errors
