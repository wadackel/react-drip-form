import formatFieldValue from '../formatFieldValue';


describe('utils#formatFieldValue()', () => {
  test('Should be return formatted value', () => {
    const table = [
      {
        value: null,
        name: null,
        result: '',
      },
      {
        value: undefined,
        name: null,
        result: '',
      },
      {
        value: 'string',
        name: null,
        result: 'string',
      },
      {
        value: 0,
        name: null,
        result: 0,
      },
      {
        value: 'foo',
        name: 'bar',
        formatter: (v, k) => `${v} ${k}`,
        result: 'foo bar',
      },
    ];

    table.forEach(({ value, name, result, ...rest }) => {
      const args = [value, name];

      if (rest.formatter) {
        args.push(rest.formatter);
      }

      expect(formatFieldValue(...args)).toEqual(result);
    });
  });
});
