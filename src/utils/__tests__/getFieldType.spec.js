import getFieldType from '../getFieldType';


describe('utils#getFieldType()', () => {
  test('Should be get field type with props', () => {
    const table = [
      {
        value: 'text',
        params: {},
        result: 'text',
      },
      {
        value: 'number',
        params: {},
        result: 'number',
      },
      {
        value: 'select',
        params: {},
        result: 'select',
      },
      {
        value: 'select',
        params: { multiple: false },
        result: 'select',
      },
      {
        value: 'select',
        params: { multiple: true },
        result: 'select-multiple',
      },
    ];

    table.forEach(({ value, params, result }) => {
      expect(getFieldType(value, params)).toBe(result);
    });
  });
});
