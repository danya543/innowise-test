import { Calculator } from './features/Calculator.js';
import { ButtonHandler } from './features/ButtonHandler.js';
import {
  DigitCommand,
  OperatorCommand,
  ClearCommand,
  EvaluateCommand,
  PowerCommand,
  RootCommand,
  FactorialCommand,
  InverseCommand,
  TenPowerCommand,
  ChangeSignCommand,
  PercentCommand,
  MemoryCommand,
} from './features/Commands.js';

const display = document.querySelector('#display');
const calculator = new Calculator(display);
const handler = new ButtonHandler();

//calculator commands
//basic commands
['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'].forEach((d) =>
  handler.setCommand(d, new DigitCommand(calculator, d))
);
//operands
[
  ['+', '+'],
  ['-', '-'],
  ['x', '*'],
  ['÷', '/'],
].forEach(([key, op]) =>
  handler.setCommand(key, new OperatorCommand(calculator, op))
);
//special operators
[
  ['1/x', InverseCommand],
  ['10ˣ', TenPowerCommand],
  ['x!', FactorialCommand],
  ['+/-', ChangeSignCommand],
  ['%', PercentCommand],
  ['=', EvaluateCommand],
  ['AC', ClearCommand],
].forEach(([key, CommandClass]) =>
  handler.setCommand(key, new CommandClass(calculator))
);
//memory commands
['MR', 'MC', 'M+', 'M-'].forEach((key) =>
  handler.setCommand(key, new MemoryCommand(calculator, key))
);
//power commands
handler.setCommand('x²', new PowerCommand(calculator, 2));
handler.setCommand('x³', new PowerCommand(calculator, 3));
handler.setCommand('xʸ', new PowerCommand(calculator));
handler.setCommand('√', new RootCommand(calculator, 2));
handler.setCommand('∛', new RootCommand(calculator, 3));
handler.setCommand('ʸ√', new RootCommand(calculator));

document.querySelectorAll('.buttons button').forEach((btn) => {
  btn.addEventListener('click', () => {
    handler.handle(btn.textContent);
  });
});

const undoBtn = document.getElementsByClassName('history')[0];
undoBtn.addEventListener('click', () => calculator.undo());
