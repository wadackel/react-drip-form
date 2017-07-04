import getFieldValue from '../getFieldValue';


const mock = (
  type,
  value,
  target = {},
  others = {},
) => getFieldValue(type, {
  stopPropagation: () => {},
  preventDefault: () => {},
  target: {
    type,
    value,
    ...target,
  },
  ...others,
});


describe('utils#getFieldValue', () => {
  test('Should be get checkbox value', () => {
    expect(mock('checkbox', null)).toBe('');
    expect(mock('checkbox', '')).toBe('');
    expect(mock('checkbox', 'foo', { checked: true })).toBe('foo');
    expect(mock('checkbox', 'foo', { checked: false })).toBe('');
    expect(mock('checkbox', '', {})).toBe('');
  });


  test('Should be get file value', () => {
    expect(mock('file', null, { files: 'value' })).toBe('value');
    expect(mock('file', 'string', { files: 'value' })).toBe('value');
    expect(mock('file', null, {}, { dataTransfer: { files: 'test' } })).toBe('test');
    expect(mock('file', null, {}, {})).toBe(undefined);
  });


  test('Should be get select-multiple value', () => {
    expect(mock('select-multiple', null, {
      options: [
      ],
    })).toEqual([
    ]);

    expect(mock('select-multiple', null, {
      options: [
        { selected: false, value: 'value 1' },
        { selected: false, value: 'value 2' },
        { selected: false, value: 'value 3' },
      ],
    })).toEqual([
    ]);

    expect(mock('select-multiple', null, {
      options: [
        { selected: false, value: 'value 1' },
        { selected: true, value: 'value 2' },
        { selected: false, value: 'value 3' },
      ],
    })).toEqual([
      'value 2',
    ]);

    expect(mock('select-multiple', null, {
      options: [
        { selected: true, value: 'value 1' },
        { selected: true, value: 'value 2' },
        { selected: true, value: 'value 3' },
      ],
    })).toEqual([
      'value 1',
      'value 2',
      'value 3',
    ]);
  });


  test('Should be get other type value', () => {
    expect(mock('text', 'text value')).toBe('text value');
    expect(mock('email', 'email value')).toBe('email value');
    expect(mock('password', 'password value')).toBe('password value');
    expect(mock('number', 'number value')).toBe('number value');
  });


  test('Should be get obtain value other than event', () => {
    expect(getFieldValue('text', null)).toBe(null);
    expect(getFieldValue('text', undefined)).toBe(undefined);
    expect(getFieldValue('text', 'string')).toBe('string');
    expect(getFieldValue('text', 100)).toBe(100);
  });
});
