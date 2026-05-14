const { compute, toNumberOrError } = require('../calculator');

describe('Calculator basic operations', () => {
  test('adds 2 + 3 => 5', () => {
    expect(compute('add', 2, 3)).toBe(5);
  });

  test('subtracts 10 - 4 => 6', () => {
    expect(compute('subtract', 10, 4)).toBe(6);
  });

  test('multiplies 45 * 2 => 90', () => {
    expect(compute('multiply', 45, 2)).toBe(90);
  });

  test('divides 20 / 5 => 4', () => {
    expect(compute('divide', 20, 5)).toBe(4);
  });

  test('division by zero throws an error', () => {
    expect(() => compute('divide', 1, 0)).toThrow('Division by zero');
  });

  test('modulo 10 % 3 => 1', () => {
    expect(compute('mod', 10, 3)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => compute('mod', 5, 0)).toThrow('Modulo by zero');
  });

  test('power 2 ^ 8 => 256', () => {
    expect(compute('pow', 2, 8)).toBe(256);
  });

  test('power fractional exponent pow(9, 0.5) => 3', () => {
    expect(compute('pow', 9, 0.5)).toBeCloseTo(3);
  });

  test('sqrt 16 => 4', () => {
    expect(compute('sqrt', 16)).toBe(4);
  });

  test('sqrt 2 is close to Math.sqrt(2)', () => {
    expect(compute('sqrt', 2)).toBeCloseTo(Math.sqrt(2));
  });

  test('sqrt negative throws an error', () => {
    expect(() => compute('sqrt', -1)).toThrow('Square root of negative number');
  });

  test('toNumberOrError accepts numeric strings', () => {
    expect(toNumberOrError('42', 'a')).toBe(42);
  });

  test('toNumberOrError rejects invalid numbers', () => {
    expect(() => toNumberOrError('foo', 'a')).toThrow('Invalid number');
  });

  test('handles negative and decimal values', () => {
    expect(compute('add', -1.5, 2.25)).toBeCloseTo(0.75);
  });
});

test('modulo 5 % 2 => 1', () => {
  expect(compute('mod', 5, 2)).toBe(1);
});

test('power 2 ^ 3 => 8', () => {
  expect(compute('pow', 2, 3)).toBe(8);
});
