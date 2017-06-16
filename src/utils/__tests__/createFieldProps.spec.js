import createFieldProps from '../createFieldProps';

const mock = (input = {}, status = {}, props = {}) => ({
  input: {
    value: 'value',
    onChange: null,
    onFocus: null,
    onBlur: null,
    onDragStart: null,
    onDrop: null,
    ...input,
  },
  status: {
    error: {},
    errors: {},
    valid: {},
    invalid: false,
    touched: false,
    untouched: false,
    dirty: false,
    pristine: false,
    ...status,
  },
  props: {
    ...props,
  },
});


describe('utils#createFieldProps()', () => {
  let type;
  let props;


  test('Should be create checkbox props', () => {
    type = 'checkbox';

    props = mock({
      value: 'string value',
    });

    expect(createFieldProps(type, props)).toEqual(mock({
      value: true,
    }));

    props = mock({
      value: false,
    });

    expect(createFieldProps(type, props)).toEqual(mock({
      value: false,
    }));

    props = mock({
      value: null,
    });

    expect(createFieldProps(type, props)).toEqual(mock({
      value: false,
    }));
  });


  test('Should be create radio props', () => {
    type = 'radio';

    props = mock({
      value: 'value',
    }, {}, {
      value: 'value',
    });

    expect(createFieldProps(type, props)).toEqual(mock({
      value: 'value',
    }, {}, {
      checked: true,
    }));

    props = mock({
    }, {}, {
      value: 'bar',
    });

    expect(createFieldProps(type, props)).toEqual(mock({
      value: 'bar',
    }, {}, {
      checked: false,
    }));
  });
});
