import isNumeric from '../isNumeric';


describe('utils#isNumeric()', () => {
  test('Should be return true', () => {
    const table = [
      0,
      10,
      10.01,
      -0,
      -5,
      -5.12,
      0xff,
      '0',
      '10',
      '10.01',
      '-0',
      '-5',
      '-5.12',
      '0xff',
    ];

    table.forEach((value) => {
      expect(isNumeric(value)).toBe(true);
    });
  });


  test('Should be return false', () => {
    const table = [
      NaN,
      Infinity,
      'string',
      {},
      new Date(),
      isNumeric,
    ];

    table.forEach((value) => {
      expect(isNumeric(value)).toBe(false);
    });
  });
});
