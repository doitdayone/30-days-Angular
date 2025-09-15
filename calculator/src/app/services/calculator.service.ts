import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private currentOperand: string = '0';
  private previousOperand: string = '';
  private operator: string | null = null;
  constructor() {}

  private isOperator(input: string): boolean {
    return ['+', '-', '*', '/'].includes(input);
  }

  private clearCalculator(): void {
    this.currentOperand = '';
    this.clearOperation();
  }

  private clearOperation(): void {
    this.previousOperand = '';
    this.operator = null;
  }

  getDisplay(): string {
    const previous = this.previousOperand || '';
    const operator = this.operator || '';
    const current = this.currentOperand || '';
    return previous + operator + current;
  }

  private handleNumber(num: string): void {
    this.currentOperand === '0'
      ? (this.currentOperand = num)
      : (this.currentOperand += num);
  }

  private calculate(): void {
    if (!this.operator || !this.previousOperand || !this.currentOperand) {
      return;
    }
    const previousValue = parseFloat(this.previousOperand);
    const currentValue = parseFloat(this.currentOperand);
    let result: number;

    switch (this.operator) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = currentValue === 0 ? NaN : previousValue / currentValue;
        break;
      default:
        return;
    }
    this.currentOperand = isNaN(result) ? 'Error' : result.toString();
    this.clearOperation();
  }

  private handleOperator(op: string): void {
    if (this.currentOperand === '' && this.currentOperand) {
      return;
    }
    if (this.previousOperand && this.currentOperand) {
      this.calculate();
    }

    this.operator = op;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  handleInput(input: string): void {
    if (input === 'C') {
      this.clearCalculator();
    } else if (input === '=') {
      this.calculate();
    } else if (this.isOperator(input)) {
      this.handleOperator(input);
    } else if (!isNaN(parseInt(input))) {
      this.handleNumber(input);
    }
  }
}
