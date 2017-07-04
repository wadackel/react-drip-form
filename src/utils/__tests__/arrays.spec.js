import * as arrays from '../arrays';


describe('utils#arrays', () => {
  describe('first()', () => {
    test('Should be get first element of array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.first(arr)).toBe(1);
      expect(arr).toEqual(original);

      expect(arrays.first([])).toBe(undefined);
    });
  });


  describe('last()', () => {
    test('Should be get last element of array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.last(arr)).toBe(3);
      expect(arr).toEqual(original);

      expect(arrays.last([])).toBe(undefined);
    });
  });


  describe('includes()', () => {
    test('Should be simulate array.prototype.inclues method', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.includes(arr, 1)).toBe(true);
      expect(arr).toEqual(original);

      expect(arrays.includes(arr, 2)).toBe(true);
      expect(arr).toEqual(original);

      expect(arrays.includes(arr, 3)).toBe(true);
      expect(arr).toEqual(original);

      expect(arrays.includes(arr, 4)).toBe(false);
      expect(arr).toEqual(original);

      expect(arrays.includes(arr, null)).toBe(false);
      expect(arr).toEqual(original);
    });
  });


  describe('push()', () => {
    test('Should be push new element into array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.push(arr, 4)).toEqual([1, 2, 3, 4]);
      expect(arr).toEqual(original);

      expect(arrays.push(arr, 4, 3, 2, 1)).toEqual([1, 2, 3, 4, 3, 2, 1]);
      expect(arr).toEqual(original);
    });
  });


  describe('pop()', () => {
    test('Should be delete last element of array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.pop(arr)).toEqual([1, 2]);
      expect(arr).toEqual(original);

      expect(arrays.pop([])).toEqual([]);
    });
  });


  describe('shift()', () => {
    test('Should be delete first element of array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.shift(arr)).toEqual([2, 3]);
      expect(arr).toEqual(original);

      expect(arrays.shift([])).toEqual([]);
    });
  });


  describe('unshift()', () => {
    test('Should be delete first element of array', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.unshift(arr, 0)).toEqual([0, 1, 2, 3]);
      expect(arr).toEqual(original);

      expect(arrays.unshift(arr, -2, -1, 0)).toEqual([-2, -1, 0, 1, 2, 3]);
      expect(arr).toEqual(original);
    });
  });


  describe('remove()', () => {
    test('Should be delete element at specified index', () => {
      const arr = [1, 2, 3];
      const original = [1, 2, 3];

      expect(arrays.remove(arr, 0)).toEqual([2, 3]);
      expect(arr).toEqual(original);

      expect(arrays.remove(arr, 1)).toEqual([1, 3]);
      expect(arr).toEqual(original);

      expect(arrays.remove(arr, 3)).toEqual([1, 2, 3]);
      expect(arr).toEqual(original);

      expect(arrays.remove(arr, -1)).toEqual([1, 2, 3]);
      expect(arr).toEqual(original);
    });
  });


  describe('swap()', () => {
    test('Should be swapped at specified index of array', () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [1, 2, 3, 4, 5];

      expect(arrays.swap(arr, 1, 1)).toEqual(original);
      expect(arr).toEqual(original);

      expect(arrays.swap(arr, 1, 2)).toEqual([1, 3, 2, 4, 5]);
      expect(arr).toEqual(original);

      expect(arrays.swap(arr, 4, 0)).toEqual([5, 2, 3, 4, 1]);
      expect(arr).toEqual(original);

      expect(arrays.swap(arr, -1, 0)).toEqual(original);
      expect(arr).toEqual(original);

      expect(arrays.swap(arr, 2, -1)).toEqual(original);
      expect(arr).toEqual(original);
    });
  });


  describe('move()', () => {
    test('Should move element to specified index of array', () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [1, 2, 3, 4, 5];

      expect(arrays.move(arr, 0, 0)).toEqual(original);
      expect(arr).toEqual(original);

      expect(arrays.move(arr, 0, 2)).toEqual([2, 3, 1, 4, 5]);
      expect(arr).toEqual(original);

      expect(arrays.move(arr, 4, 1)).toEqual([1, 5, 2, 3, 4]);
      expect(arr).toEqual(original);

      expect(arrays.move(arr, -1, 2)).toEqual(original);
      expect(arr).toEqual(original);

      expect(arrays.move(arr, 0, 10)).toEqual([2, 3, 4, 5, 1]);
      expect(arrays.move(arr, 0, 10).length).toBe(5);
      expect(arr).toEqual(original);
    });
  });
});
