#!/usr/bin/env node

// Calculator functions module (merged CLI)
// Supported operations:
//  - Addition:        + or add
//  - Subtraction:     - or sub
//  - Multiplication:  * or x or X or mul
//  - Division:        / or ÷ or div

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

function compute(a, operator, b) {
  const op = String(operator).toLowerCase();
  switch (op) {
    case '+':
    case 'add':
      return add(a, b);
    case '-':
    case 'sub':
      return subtract(a, b);
    case '*':
    case 'x':
    case '×':
    case 'mul':
      return multiply(a, b);
    case '/':
    case '÷':
    case 'div':
      return divide(a, b);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  compute,
};

// CLI wrapper: only runs when executed directly
if (require.main === module) {
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

  try {
    const result = compute(a, operator, b);
    console.log(result);
  } catch (err) {
    if (err && String(err.message).includes('division by zero')) {
      console.error('Error: division by zero');
      process.exit(3);
    }
    if (err && String(err.message).includes('Unsupported operator')) {
      console.error(err.message);
      printUsage();
      process.exit(4);
    }
    console.error(err.message || String(err));
    process.exit(1);
  }
}
