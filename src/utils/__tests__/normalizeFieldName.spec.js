import normalizeFieldName from '../normalizeFieldName';


describe('utils#normalizeFieldName()', () => {
  test('Should be normalize field name', () => {
    const table = [
      {
        value: 'foo',
        result: 'foo',
      },
      {
        value: 'foo.bar',
        result: 'foo.bar',
      },
      {
        value: 'foo["bar"].baz',
        result: 'foo["bar"].baz',
      },
      {
        value: 'foo.1.0',
        result: 'foo.1.0',
      },
      {
        value: 'foo[]',
        result: 'foo',
      },
      {
        value: 'foo.bar[]',
        result: 'foo.bar',
      },
    ];

    table.forEach(({ value, result }) => {
      expect(normalizeFieldName(value)).toBe(result);
    });
  });
});
