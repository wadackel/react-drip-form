import parseFieldValue from '../parseFieldValue';


describe('utils#parseFieldValue()', () => {
  test('Should be parse field value', () => {
    const table = [
      {
        value: null,
        name: '',
        parser: null,
        result: null,
      },
      {
        value: 'string',
        name: '',
        parser: null,
        result: 'string',
      },
      {
        value: { key: 'value' },
        name: '',
        parser: null,
        result: { key: 'value' },
      },
      {
        value: [1, 2, 3],
        name: '',
        parser: null,
        result: [1, 2, 3],
      },
      {
        value: true,
        name: '',
        parser: v => !v,
        result: false,
      },
      {
        value: 'World',
        name: 'Hello',
        parser: (v, k) => `${k} ${v}`,
        result: 'Hello World',
      },
    ];

    table.forEach(({ value, name, parser, result }) => {
      expect(parseFieldValue(value, name, parser)).toEqual(result);
    });
  });
});
