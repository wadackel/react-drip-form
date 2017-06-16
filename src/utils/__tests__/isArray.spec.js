import isArray from '../isArray';


describe('utils#isArray()', () => {
  test('Should be return true', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
  });


  test('Should be return false', () => {
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray('string')).toBe(false);
  });
});
