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

  test('unsupported operation throws', () => {
    expect(() => compute('mod', 5, 2)).toThrow('Unsupported operation');
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
