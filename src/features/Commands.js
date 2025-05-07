class Command {
  execute() {}
}

export class DigitCommand extends Command {
  constructor(calculator, digit) {
    super();
    this.calculator = calculator;
    this.digit = digit;
  }

  execute() {
    this.calculator.inputDigit(this.digit);
  }
}

export class OperatorCommand extends Command {
  constructor(calculator, operator) {
    super();
    this.calculator = calculator;
    this.operator = operator;
  }

  execute() {
    this.calculator.inputOperator(this.operator);
  }
}

export class PowerCommand {
  constructor(calculator, exponent = null) {
    this.calculator = calculator;
    this.exponent = exponent;
  }

  execute() {
    this.calculator.applyPower(this.exponent);
  }
}

export class RootCommand {
  constructor(calculator, degree = null) {
    this.calculator = calculator;
    this.degree = degree;
  }

  execute() {
    this.calculator.applyRoot(this.degree);
  }
}

export class EvaluateCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.evaluate();
  }
}

export class ChangeSignCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }
  execute() {
    this.calculator.changeSign();
  }
}

export class PercentCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }
  execute() {
    this.calculator.percent();
  }
}

export class TenPowerCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }
  execute() {
    this.calculator.tenPower();
  }
}

export class InverseCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }
  execute() {
    this.calculator.inverse();
  }
}

export class FactorialCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }
  execute() {
    this.calculator.factorial();
  }
}

export class ClearCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.clear();
  }
}

export class MemoryCommand extends Command {
  constructor(calculator, type) {
    super();
    this.calculator = calculator;
    this.type = type;
  }
  execute() {
    this.calculator.memory(this.type);
  }
}
