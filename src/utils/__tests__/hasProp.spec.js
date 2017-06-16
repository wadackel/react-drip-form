import hasProp from '../hasProp';


describe('utils#hasProp()', () => {
  class Hoge {
    field = 'field';
  }


  test('Should be return true', () => {
    const table = [
      {
        value: {
          key: 'value',
        },
        key: 'key',
      },
      {
        value: new Hoge(),
        key: 'field',
      },
      {
        value: ['0', '1'],
        key: 1,
      },
    ];

    table.forEach(({ value, key }) => {
      expect(hasProp(value, key)).toBe(true);
    });
  });


  test('Should be return false', () => {
    const table = [
      {
        value: {
          key: 'value',
        },
        key: 'foo',
      },
      {
        value: new Hoge(),
        key: 'bar',
      },
      {
        value: Hoge,
        key: 'field',
      },
      {
        value: ['0', '1'],
        key: 2,
      },
    ];

    table.forEach(({ value, key }) => {
      expect(hasProp(value, key)).toBe(false);
    });
  });
});
