import createFieldProps from '../createFieldProps';

const mock = (input = {}, meta = {}, props = {}) => ({
  input: {
    name: 'name',
    value: 'value',
    onChange: null,
    onFocus: null,
    onBlur: null,
    onDragStart: null,
    onDrop: null,
    ...input,
  },
  meta: {
    error: {},
    errors: {},
    valid: {},
    invalid: false,
    touched: false,
    untouched: false,
    dirty: false,
    pristine: false,
    ...meta,
  },
  props: {
    ...props,
  },
});


describe('utils#createFieldProps()', () => {
  let type;
  let props;


  test('Should be create text type props', () => {
    type = 'text';

    props = mock({
      value: 'string value',
    });

    expect(createFieldProps(type, 'string value', props)).toEqual(mock({
      value: 'string value',
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, 'bar', props)).toEqual(mock({
      value: 'bar',
    }));
  });


  test('Should be create checkbox props', () => {
    type = 'checkbox';

    props = mock({
      value: 'string value',
    });

    expect(createFieldProps(type, 'string value', props)).toEqual(mock({
      value: 'string value',
      checked: true,
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, 'bar', props)).toEqual(mock({
      value: 'foo',
      checked: false,
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, ['foo', 'bar'], props)).toEqual(mock({
      value: 'foo',
      checked: true,
    }));

    props = mock({
      value: 'baz',
    });

    expect(createFieldProps(type, ['foo', 'bar'], props)).toEqual(mock({
      value: 'baz',
      checked: false,
    }));
  });


  test('Should be create radio props', () => {
    type = 'radio';

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, 'foo', props)).toEqual(mock({
      value: 'foo',
      checked: true,
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, 'bar', props)).toEqual(mock({
      value: 'foo',
      checked: false,
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, null, props)).toEqual(mock({
      value: 'foo',
      checked: false,
    }));

    props = mock({
      value: 'foo',
    });

    expect(createFieldProps(type, [1, 'foo', 2], props)).toEqual(mock({
      value: 'foo',
      checked: false,
    }));
  });

  // @TODO: select-multiple
  // @TODO: file
});
