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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  // Use Math.pow to handle fractional exponents reliably
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
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
    case '%':
    case 'mod':
      return modulo(a, b);
    case '**':
    case '^':
    case 'pow':
      return power(a, b);
    case 'sqrt':
    case '√':
      // square root is unary: operate on the first argument
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  compute,
};

// CLI wrapper: only runs when executed directly
if (require.main === module) {
  const [,, arg1, operator, arg2] = process.argv;

  function printUsage() {
    console.log('Usage: calc <number> <operator> <number>');
    console.log('Operators: +, -, *, /, %, **, ^, sqrt (also: add, sub, mul, div, mod, pow)');
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
