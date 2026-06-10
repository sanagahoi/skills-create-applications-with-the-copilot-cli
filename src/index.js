#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - Addition:        + or add
//  - Subtraction:     - or sub
//  - Multiplication:  * or x or X or mul
//  - Division:        / or ÷ or div

const [,, arg1, operator, arg2] = process.argv;

function printUsage() {
  console.log('Usage: calc <number> <operator> <number>');
  console.log('Operators: +, -, *, / (also: add, sub, mul, div)');
}

function parseNumber(s) {
  const n = Number(s);
  if (Number.isNaN(n)) {
    console.error(`Invalid number: ${s}`);
    process.exit(2);
  }
  return n;
}

if (!arg1 || !operator || !arg2) {
  printUsage();
  process.exit(1);
}

const a = parseNumber(arg1);
const b = parseNumber(arg2);

let result;
const op = operator.toLowerCase();

switch (op) {
  case '+':
  case 'add':
    result = a + b;
    break;
  case '-':
  case 'sub':
    result = a - b;
    break;
  case '*':
  case 'x':
  case '×':
  case 'mul':
    result = a * b;
    break;
  case '/':
  case '÷':
  case 'div':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(3);
    }
    result = a / b;
    break;
  default:
    console.error(`Unsupported operator: ${operator}`);
    printUsage();
    process.exit(4);
}

// Print result to stdout
console.log(result);
