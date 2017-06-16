import isEvent from '../isEvent';


describe('utils#isEvent()', () => {
  test('Should be return true', () => {
    const table = [
      {
        stopPropagation: () => {},
        preventDefault: () => {},
      },
    ];

    table.forEach((value) => {
      expect(isEvent(value)).toBe(true);
    });
  });


  test('Should be return false', () => {
    const table = [
      null,
      true,
      false,
      'string',
      0,
      [],
      { preventDefault: () => {} },
      { stopPropagation: () => {} },
    ];

    table.forEach((value) => {
      expect(isEvent(value)).toBe(false);
    });
  });
});
