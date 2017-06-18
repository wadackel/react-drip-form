/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { shallow, mount } from 'enzyme';
import dripFormField from '../dripFormField';


const mockEvent = (params = {}) => ({
  stopPropagation: () => {},
  preventDefault: () => {},
  ...params,
});

const mockContext = (context = {}) => ({
  dripForm: true,
  register: () => {},
  unregister: () => {},
  updateValue: () => {},
  updateTouched: () => {},
  updateDirty: () => {},
  updateValidations: () => {},
  updateNormalizers: () => {},
  updateLabel: () => {},
  updateMessages: () => {},
  validating: [],
  values: {},
  errors: {},
  dirties: [],
  touches: [],
  ...context,
});

const mockComponent = (WrappedComponent, options = {}) => (
  dripFormField(options)(WrappedComponent)
);

const mockRender = (useShallow, WrappedComponent, props = {}, context, options = {}) => {
  const Component = mockComponent(WrappedComponent, options);

  return (useShallow ? shallow : mount)(<Component {...props} />, {
    context: mockContext(context),
  });
};

const mockShallow = (WrappedComponent, props = {}, context = {}, options = {}) => (
  mockRender(true, WrappedComponent, props, context, options)
);

const mockMount = (WrappedComponent, props = {}, context = {}, options = {}) => (
  mockRender(false, WrappedComponent, props, context, options)
);


describe('dripFormField()', () => {
  test('Should be create field', () => {
    const wrapper = mockShallow(() => (
      <div>Field</div>
    ));

    expect(wrapper.html()).toBe('<div>Field</div>');
  });


  test('Should not be create field from outside DripForm component', () => {
    const original = global.console.error;
    global.console.error = jest.fn();

    expect(() => {
      const Field = mockComponent(() => <div />);
      shallow(<Field />);
    }).toThrow();

    global.console.error.mockRestore();
    global.console.error = original;
  });


  test('Should be wrap displayName', () => {
    expect(mockComponent(() => <div />).displayName).toBe('dripFormField(Component)');
    expect(mockComponent(class Foo extends React.Component {
      render() {
        return <span />;
      }
    }).displayName).toBe('dripFormField(Foo)');
  });


  test('Should be pass original props', () => {
    const Field = mockComponent(() => <div />);
    const wrapper = shallow(
      <Field
        id="foo-bar"
        className="hoge-fuga"
      />
    , {
      context: mockContext(),
    });

    expect(wrapper.prop('props')).toEqual({
      id: 'foo-bar',
      className: 'hoge-fuga',
    });
  });


  test('Should be pass field props', () => {
    const wrapper = mockShallow(() => <div />);

    expect(wrapper.prop('input').value).toBe('');
    expect(wrapper.prop('status')).toEqual({
      error: undefined,
      errors: undefined,
      valid: true,
      invalid: false,
      touched: false,
      untouched: true,
      dirty: false,
      pristine: true,
      validating: false,
    });
  });


  test('Should be call "register" function in the constructor.', () => {
    const register = jest.fn();

    const Field = mockComponent(() => <div />);
    const wrapper = shallow(<Field />, {
      context: mockContext({
        register,
      }),
    });

    expect(register.mock.calls[0][0]).toEqual(wrapper.instance());
  });


  test('Should be call "unregister" function when unmounting', () => {
    const unregister = jest.fn();

    const Field = mockComponent(() => <div />);
    const wrapper = shallow(<Field />, {
      context: mockContext({
        unregister,
      }),
    });

    const instance = wrapper.instance();

    expect(unregister.mock.calls.length).toBe(0);

    wrapper.unmount();

    expect(unregister.mock.calls[0][0]).toEqual(instance);
  });


  test('Should be call update meta data functions in the constructor and willMount', () => {
    const updateValidations = jest.fn();
    const updateNormalizers = jest.fn();
    const updateMessages = jest.fn();
    const updateLabel = jest.fn();

    const name = 'fieldName';
    const validations = { validate: true };
    const normalizers = { normalize: true };
    const label = 'Field Name';
    const messages = { message: 'message' };

    mockShallow(() => <div />, {
      name,
      validations,
      normalizers,
      label,
      messages,
    }, {
      updateValidations,
      updateNormalizers,
      updateMessages,
      updateLabel,
    });

    expect(updateValidations.mock.calls.length).toBe(2);
    expect(updateValidations.mock.calls[0])
      .toEqual([
        name,
        validations,
        false,
      ]);
    expect(updateValidations.mock.calls[0])
      .toEqual(updateValidations.mock.calls[1]);

    expect(updateNormalizers.mock.calls.length).toBe(2);
    expect(updateNormalizers.mock.calls[0])
      .toEqual([
        name,
        normalizers,
        false,
      ]);
    expect(updateNormalizers.mock.calls[0])
      .toEqual(updateNormalizers.mock.calls[1]);

    expect(updateMessages.mock.calls.length).toBe(2);
    expect(updateMessages.mock.calls[0])
      .toEqual([
        name,
        messages,
        false,
      ]);
    expect(updateMessages.mock.calls[0])
      .toEqual(updateMessages.mock.calls[1]);

    expect(updateLabel.mock.calls.length).toBe(2);
    expect(updateLabel.mock.calls[0])
      .toEqual([
        name,
        label,
        false,
      ]);
    expect(updateLabel.mock.calls[0])
      .toEqual(updateLabel.mock.calls[1]);
  });


  test('Should be call updateValue function when willMount', () => {
    const updateValue = jest.fn();
    const name = 'updateValueField';

    mockShallow(() => <div />, {
      name,
    }, {
      updateValue,
    });

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0])
      .toEqual([
        name,
        null,
        false,
      ]);

    updateValue.mockReset();

    mockShallow(() => <div />, {
      name,
      value: 'value',
    }, {
      updateValue,
    });

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0])
      .toEqual([
        name,
        'value',
        false,
      ]);

    updateValue.mockReset();

    mockShallow(() => <div />, {
      name,
    }, {
      updateValue,
      values: {
        [name]: 'context value',
      },
    });

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0])
      .toEqual([
        name,
        'context value',
        false,
      ]);

    updateValue.mockReset();

    mockShallow(() => <div />, {
      name,
      value: 'prop value',
    }, {
      updateValue,
      values: {
        [name]: 'context value',
      },
    });

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0])
      .toEqual([
        name,
        'prop value',
        false,
      ]);
  });


  test('Should be call update data functions when receive props', () => {
    const updateValue = jest.fn();
    const updateValidations = jest.fn();
    const updateNormalizers = jest.fn();
    const updateMessages = jest.fn();
    const updateLabel = jest.fn();

    const name = 'fieldName';

    const wrapper = mockShallow(() => <div />, {
      name,
      value: null,
      validations: {},
      normalizers: {},
      messages: {},
      label: null,
    }, {
      updateValue,
      updateValidations,
      updateNormalizers,
      updateMessages,
      updateLabel,
    });

    updateValue.mockReset();
    updateValidations.mockReset();
    updateNormalizers.mockReset();
    updateMessages.mockReset();
    updateLabel.mockReset();

    wrapper.setProps({ value: 'next value' });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(0);
    expect(updateNormalizers.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      'next value',
      true,
    ]);

    wrapper.setProps({ validations: { validateKey: 'value' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateValidations.mock.calls[0]).toEqual([
      name,
      { validateKey: 'value' },
      true,
    ]);

    wrapper.setProps({ normalizers: { normalizeKey: 'value' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateNormalizers.mock.calls[0]).toEqual([
      name,
      { normalizeKey: 'value' },
      true,
    ]);

    wrapper.setProps({ messages: { messageKey: 'value' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls[0]).toEqual([
      name,
      { messageKey: 'value' },
      true,
    ]);

    wrapper.setProps({ label: 'label' });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls[0]).toEqual([
      name,
      'label',
      true,
    ]);
  });


  test('Should be set initialValue', () => {
    const name = 'initialValueField';
    let wrapper;

    wrapper = mockShallow(() => <div />, {
      name,
      value: null,
    });

    expect(wrapper.instance().initialValue).toBe(null);

    wrapper = mockShallow(() => <div />, {
      name,
      value: 'prop value',
    });

    expect(wrapper.instance().initialValue).toBe('prop value');

    wrapper = mockShallow(() => <div />, {
      name,
    }, {
      values: {
        [name]: 'context value',
      },
    });

    expect(wrapper.instance().initialValue).toBe('context value');

    wrapper = mockShallow(() => <div />, {
      name,
      value: 'prop value',
    }, {
      values: {
        [name]: 'context value',
      },
    });

    expect(wrapper.instance().initialValue).toBe('prop value');

    wrapper.setProps({ value: 'change value' });

    expect(wrapper.instance().initialValue).toBe('change value');
  });


  test('Should be get context value', () => {
    const flat = mockShallow(() => <div />, {
      name: 'fieldName',
    }, {
      values: {
        fieldName: 'value',
      },
    });

    expect(flat.instance().getValue()).toBe('value');

    const nest = mockShallow(() => <div />, {
      name: 'nest.name.field',
    }, {
      values: {
        nest: {
          name: {
            field: 'nest value',
          },
        },
      },
    });

    expect(nest.instance().getValue()).toBe('nest value');

    const array1 = mockShallow(() => <div />, {
      name: 'array.0',
    }, {
      values: {
        array: [
          'array1 value',
          'array2 value',
          'array3 value',
        ],
      },
    });

    expect(array1.instance().getValue()).toBe('array1 value');

    const array2 = mockShallow(() => <div />, {
      name: 'nest.0',
    }, {
      values: {
        nest: [
          'array2 value',
          'array3 value',
          'array3 value',
        ],
        foo: [
          'foo1 value',
          'foo2 value',
          'foo3 value',
        ],
      },
    });

    expect(array2.instance().getValue()).toBe('array2 value');

    const array3 = mockShallow(() => <div />, {
      name: 'deep.0.nest.2',
    }, {
      values: {
        deep: [
          {
            nest: ['array3 value', 'array4 value', 'array5 value'],
          },
          {
            nest: ['array3-2 value', 'array4-2 value', 'array5-2 value'],
          },
        ],
        nest: [
          {
            nest: ['array3-3 value', 'array4-3 value', 'array5-3 value'],
          },
          {
            nest: ['array3-4 value', 'array4-4 value', 'array5-4 value'],
          },
        ],
      },
    });

    expect(array3.instance().getValue()).toBe('array5 value');
  });


  test('Should be get errors', () => {
    const flat = mockShallow(() => <div />, {
      name: 'fieldName',
    }, {
      errors: {
        fieldName: [
          'error 1-1',
          'error 1-2',
          'error 1-3',
        ],
      },
    });

    expect(flat.instance().getErrors()).toEqual([
      'error 1-1',
      'error 1-2',
      'error 1-3',
    ]);

    const deep = mockShallow(() => <div />, {
      name: 'deep.nest',
    }, {
      errors: {
        'deep.nest': [
          'error 2-1',
          'error 2-2',
          'error 2-3',
        ],
      },
    });

    expect(deep.instance().getErrors()).toEqual([
      'error 2-1',
      'error 2-2',
      'error 2-3',
    ]);

    const failure = mockShallow(() => <div />, {
      name: 'notfoundkey',
    }, {
      errors: {},
    });

    expect(failure.instance().getErrors()).toBe(undefined);
  });


  test('Should be get first error', () => {
    const flat = mockShallow(() => <div />, {
      name: 'fieldName',
    }, {
      errors: {
        fieldName: [
          'error 1-1',
          'error 1-2',
          'error 1-3',
        ],
      },
    });

    expect(flat.instance().getError()).toBe('error 1-1');

    const deep = mockShallow(() => <div />, {
      name: 'deep.nest',
    }, {
      errors: {
        'deep.nest': [
          'error 2-1',
          'error 2-2',
          'error 2-3',
        ],
      },
    });

    expect(deep.instance().getError()).toBe('error 2-1');

    const failure = mockShallow(() => <div />, {
      name: 'notfoundkey',
    }, {
      errors: {},
    });

    expect(failure.instance().getError()).toBe(undefined);
  });


  test('Should be return validation status', () => {
    const name = 'fieldName';
    const wrapper = mockShallow(() => <div />, {
      name,
    }, {
      errors: {
        empty: [
          'error1-1',
          'error1-2',
          'error1-3',
        ],
      },
    });

    expect(wrapper.instance().isInvalid()).toBe(false);
    expect(wrapper.instance().isValid()).toBe(true);

    wrapper.setContext(mockContext({
      errors: {
        [name]: [
          'error1-1',
          'error1-2',
          'error1-3',
        ],
      },
    }));

    expect(wrapper.instance().isInvalid()).toBe(true);
    expect(wrapper.instance().isValid()).toBe(false);
  });


  test('Should be return whether being validating', () => {
    const name = 'fieldName';
    const wrapper = mockShallow(() => <div />, {
      name,
    }, {
      validating: [
        'foo',
        'bar',
        'baz',
      ],
    });

    expect(wrapper.instance().isValidating()).toBe(false);

    wrapper.setContext(mockContext({
      validating: [
        'foo',
        'bar',
        'baz',
        name,
      ],
    }));

    expect(wrapper.instance().isValidating()).toBe(true);
  });


  test('Should be return touched status', () => {
    const name = 'fieldName';

    const wrapper = mockShallow(() => <div />, {
      name,
    }, {
      touches: ['foo'],
    });

    expect(wrapper.instance().isTouched()).toBe(false);
    expect(wrapper.instance().isUntouched()).toBe(true);

    wrapper.setContext(mockContext({
      touches: [
        name,
        'foo',
      ],
    }));

    expect(wrapper.instance().isTouched()).toBe(true);
    expect(wrapper.instance().isUntouched()).toBe(false);
  });


  test('Should be return change status', () => {
    const name = 'fieldName';

    const wrapper = mockShallow(() => <div />, {
      name,
    }, {
      dirties: ['foo'],
    });

    expect(wrapper.instance().isDirty()).toBe(false);
    expect(wrapper.instance().isPristine()).toBe(true);

    wrapper.setContext(mockContext({
      dirties: [
        name,
        'foo',
      ],
    }));

    expect(wrapper.instance().isDirty()).toBe(true);
    expect(wrapper.instance().isPristine()).toBe(false);
  });


  test('Should be handle onChange', () => {
    const onChange = jest.fn();

    const wrapper = mockMount(
      ({ input, props }) => (
        <input
          {...props}
          {...input}
        />
      ), {
        name: 'fieldName',
        type: 'text',
        onChange,
      }
    );

    expect(onChange.mock.calls.length).toBe(0);

    wrapper.find('input').simulate('change');

    expect(onChange.mock.calls.length).toBe(1);
  });


  test('Should be update value and dirty when handleChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();
    const updateDirty = jest.fn();

    const wrapper = mockMount(
      ({ input, props }) => (
        <input
          {...props}
          {...input}
        />
      ), {
        type: 'text',
        name,
        value: '',
      }, {
        updateValue,
        updateDirty,
      }
    );

    updateValue.mockReset();
    updateDirty.mockReset();

    wrapper.find('input').simulate('change', mockEvent({
      target: { value: 'text value' },
    }));

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      'text value',
      true,
    ]);

    expect(updateDirty.mock.calls.length).toBe(1);
    expect(updateDirty.mock.calls[0]).toEqual([
      name,
      true,
    ]);

    wrapper.find('input').simulate('change', mockEvent({
      target: { value: '' },
    }));

    expect(updateValue.mock.calls.length).toBe(2);
    expect(updateValue.mock.calls[1]).toEqual([
      name,
      '',
      true,
    ]);

    expect(updateDirty.mock.calls.length).toBe(2);
    expect(updateDirty.mock.calls[1]).toEqual([
      name,
      false,
    ]);
  });


  test('Should be handle checkbox onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();

    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
        type="checkbox"
      />
    ), {
      name,
      value: 'text value',
      checked: false,
    }, {
      updateValue,
    });

    updateValue.mockReset();

    wrapper.find('input').simulate('change', mockEvent({
      target: {
        type: 'checkbox',
        value: 'text value',
        checked: true,
      },
    }));

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      true,
      true,
    ]);

    wrapper.find('input').simulate('change', mockEvent({
      target: {
        type: 'checkbox',
        value: 'text value',
        checked: false,
      },
    }));

    expect(updateValue.mock.calls.length).toBe(2);
    expect(updateValue.mock.calls[1]).toEqual([
      name,
      '',
      true,
    ]);
  });


  test('Should be handle file onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();

    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
        type="file"
      />
    ), {
      name,
    }, {
      updateValue,
    });

    updateValue.mockReset();

    wrapper.find('input').simulate('change', mockEvent({
      target: {
        type: 'file',
        files: [
          'file 1',
          'file 2',
          'file 3',
        ],
      },
    }));

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      [
        'file 1',
        'file 2',
        'file 3',
      ],
      true,
    ]);
  });


  test('Should be handle select-multiple onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();

    const wrapper = mockMount(({ input, props }) => (
      <select
        {...props}
        {...input}
        multiple
        value={[]}
      />
    ), {
      name,
    }, {
      updateValue,
    });

    updateValue.mockReset();

    wrapper.find('select').simulate('change', mockEvent({
      target: {
        type: 'select-multiple',
        options: [
          { selected: true, value: 'select 1' },
          { selected: false, value: 'select 2' },
          { selected: true, value: 'select 3' },
        ],
      },
    }));

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      [
        'select 1',
        'select 3',
      ],
      true,
    ]);
  });


  test('Should be handle original onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();

    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
        multiple
        onChange={() => input.onChange('test value')}
      />
    ), {
      name,
    }, {
      updateValue,
    });

    updateValue.mockReset();

    wrapper.find('input').simulate('change');

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      'test value',
      true,
    ]);
  });


  test('Should be parse value', () => {
    const name = 'testField';
    const parser = jest.fn((v, k) => `${k} ${v}`);
    const updateValue = jest.fn();
    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
      />
    ), {
      type: 'text',
      name,
      parser,
    }, {
      updateValue,
    });

    updateValue.mockReset();

    expect(parser.mock.calls.length).toBe(0);

    wrapper.find('input').simulate('change', mockEvent({
      target: { value: 'changed value' },
    }));

    expect(parser.mock.calls.length).toBe(1);
    expect(parser.mock.calls[0]).toEqual([
      'changed value',
      name,
    ]);

    expect(updateValue.mock.calls[0]).toEqual([
      name,
      `${name} changed value`,
      true,
    ]);
  });


  test('Should be handle onBlur', () => {
    const name = 'blurFieldName';
    const onBlur = jest.fn();
    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
      />
    ), {
      name,
      onBlur,
    });

    expect(onBlur.mock.calls.length).toBe(0);

    wrapper.find('input').simulate('blur');

    expect(onBlur.mock.calls.length).toBe(1);
  });


  test('Should be update touch status when handleBlur', () => {
    const name = 'blurFieldName';
    const updateTouched = jest.fn();
    const wrapper = mockMount(({ input, props }) => (
      <input
        {...input}
        {...props}
      />
    ), {
      name,
    }, {
      updateTouched,
    });

    expect(updateTouched.mock.calls.length).toBe(0);

    wrapper.find('input').simulate('blur');

    expect(updateTouched.mock.calls.length).toBe(1);
    expect(updateTouched.mock.calls[0]).toEqual([
      name,
      true,
      true,
    ]);
  });


  test('Should be format value', () => {
    const name = 'formatField';
    const formatter = jest.fn((v, k) => `${k} ${v}`);

    const wrapper = mockMount(({ input, props }) => (
      <input
        {...props}
        {...input}
      />
    ), {
      value: 'not use',
      name,
      formatter,
    }, {
      values: {
        [name]: 'text value',
      },
    });

    expect(formatter.mock.calls.length).toBe(1);
    expect(formatter.mock.calls[0]).toEqual([
      'text value',
      name,
    ]);

    expect(wrapper.find('input').prop('value')).toBe(`${name} text value`);
  });

  // @TODO: onDragStart, onDrop
});
