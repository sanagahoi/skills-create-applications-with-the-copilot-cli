const { add, subtract, multiply, divide, modulo, power, squareRoot, compute } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
    expect(compute(2, '+', 3)).toBe(5);
    expect(compute(2, 'add', 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
    expect(compute(10, '-', 4)).toBe(6);
    expect(compute(10, 'sub', 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
    expect(compute(45, '*', 2)).toBe(90);
    expect(compute(45, 'x', 2)).toBe(90);
    expect(compute(45, 'mul', 2)).toBe(90);
    // unicode multiplication symbol
    expect(compute(45, '×', 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
    expect(compute(20, '/', 5)).toBe(4);
    expect(compute(20, 'div', 5)).toBe(4);
    // unicode division symbol
    expect(compute(20, '÷', 5)).toBe(4);
  });

  test('division by zero throws for divide and compute variants', () => {
    expect(() => divide(1, 0)).toThrow('division by zero');
    expect(() => compute(1, '/', 0)).toThrow('division by zero');
    expect(() => compute(1, 'div', 0)).toThrow('division by zero');
    expect(() => compute(1, '÷', 0)).toThrow('division by zero');
  });

  test('unsupported operator throws', () => {
    expect(() => compute(1, '@', 2)).toThrow('Unsupported operator');
  });

  // Additional edge cases
  test('modulo, power, and square root operations', () => {
    // modulo
    expect(modulo(10, 3)).toBe(1);
    expect(compute(10, '%', 3)).toBe(1);
    expect(compute(10, 'mod', 3)).toBe(1);
    expect(() => modulo(1, 0)).toThrow('modulo by zero');

    // power
    expect(power(2, 3)).toBe(8);
    expect(compute(2, '**', 3)).toBe(8);
    expect(compute(2, '^', 3)).toBe(8);
    expect(compute(2, 'pow', 3)).toBe(8);

    // square root
    expect(squareRoot(9)).toBe(3);
    expect(compute(9, 'sqrt')).toBe(3);
    expect(compute(9, '√')).toBe(3);
    expect(() => squareRoot(-1)).toThrow('square root of negative number');
  });
  test('negative numbers and mixed signs', () => {
    expect(add(-5, -3)).toBe(-8);
    expect(add(-5, 3)).toBe(-2);
    expect(subtract(-5, 3)).toBe(-8);
    expect(multiply(-4, 5)).toBe(-20);
    expect(divide(-20, 4)).toBe(-5);
  });

  test('floating point precision with toBeCloseTo', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
    expect(divide(0.3, 0.1)).toBeCloseTo(3, 10);
  });

  test('multiply by zero and zero edge cases', () => {
    expect(multiply(12345, 0)).toBe(0);
    expect(multiply(0, 0)).toBe(0);
    expect(divide(0, 5)).toBe(0);
  });

  test('large numbers arithmetic', () => {
    const a = Number.MAX_SAFE_INTEGER;
    const b = 1;
    // addition result compared to JS arithmetic (may exceed safe integer precision)
    expect(add(a, b)).toBe(a + b);
    const subResult = subtract(a + 10, 10);
    // subtraction may lose integer precision; ensure result is numeric and finite
    expect(Number.isFinite(subResult)).toBe(true);
    expect(typeof subResult).toBe('number');
  });

  test('compute respects string operator casing', () => {
    expect(compute(2, 'ADD', 3)).toBe(5);
    expect(compute(10, 'SuB', 4)).toBe(6);
  });
});
