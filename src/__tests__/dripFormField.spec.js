/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { shallow, mount } from 'enzyme';
import dripFormField from '../dripFormField';
import {
  mockEvent,
  mockContext,
} from './mock';


const mockComponent = (type = 'text', WrappedComponent, options = {}) => (
  dripFormField(type, options)(WrappedComponent)
);

const mockRender = (useShallow, type = 'text', WrappedComponent, props = {}, context, options = {}) => {
  const Component = mockComponent(type, WrappedComponent, options);

  return (useShallow ? shallow : mount)(<Component {...props} />, {
    context: mockContext(context),
  });
};

const mockShallow = (type = 'text', WrappedComponent, props = {}, context = {}, options = {}) => (
  mockRender(true, type, WrappedComponent, props, context, options)
);

const mockMount = (type = 'text', WrappedComponent, props = {}, context = {}, options = {}) => (
  mockRender(false, type, WrappedComponent, props, context, options)
);


describe('dripFormField()', () => {
  test('Should be create field', () => {
    const wrapper = mockShallow('text', () => (
      <div>Field</div>
    ), {
      name: 'foo',
    });

    expect(wrapper.html()).toBe('<div>Field</div>');
  });


  test('Should not be create field from outside DripForm component', () => {
    const original = global.console.error;
    global.console.error = () => {};

    expect(() => {
      const Field = mockComponent('text', () => <div />);
      shallow(<Field name="foo" />);
    }).toThrow();

    global.console.error = original;
  });


  test('Should not be create field without name props', () => {
    const original = global.console.error;
    global.console.error = () => {};

    expect(() => {
      mockShallow('text', () => <div />);
    }).toThrow();

    global.console.error = original;
  });


  test('Should be wrap displayName', () => {
    expect(mockComponent('text', () => <div />).displayName).toBe('dripFormField(Component)');
    expect(mockComponent('text', class Foo extends React.Component {
      render() {
        return <span />;
      }
    }).displayName).toBe('dripFormField(Foo)');
  });


  test('Should be pass original props', () => {
    const Field = mockComponent('text', () => <div />);
    const wrapper = shallow(
      <Field
        id="foo-bar"
        className="hoge-fuga"
        name="foo"
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
    let wrapper = mockShallow('text', () => <div />, { name: 'foo' });
    let input = wrapper.prop('input');

    expect(input.name).toBe('foo');
    expect(input.value).toBe('');
    expect(input.onChange).toBeInstanceOf(Function);
    expect(input.onFocus).toBeInstanceOf(Function);
    expect(input.onBlur).toBeInstanceOf(Function);
    expect(Object.keys(input).length).toBe(5);

    expect(wrapper.prop('meta')).toEqual({
      label: null,
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

    wrapper = mockShallow('text', () => <div />, {
      name: 'foo',
      label: 'Label',
      className: 'foo',
    });
    input = wrapper.prop('input');

    expect(input.name).toBe('foo');
    expect(input.value).toBe('');
    expect(wrapper.prop('meta').label).toBe('Label');
  });


  test('Should be call "register" function in the constructor.', () => {
    const register = jest.fn();

    const Field = mockComponent('text', () => <div />);
    const wrapper = shallow(<Field name="foobar" />, {
      context: mockContext({
        register,
      }),
    });

    expect(register.mock.calls[0][0]).toBe('foobar');
    expect(register.mock.calls[0][1]).toEqual(wrapper.instance());
  });


  test('Should be call "unregister" function when unmounting', () => {
    const unregister = jest.fn();

    const Field = mockComponent('text', () => <div />);
    const wrapper = shallow(<Field name="testname" />, {
      context: mockContext({
        unregister,
      }),
    });

    expect(unregister.mock.calls.length).toBe(0);

    wrapper.unmount();

    expect(unregister.mock.calls[0]).toEqual(['testname']);
  });


  test('Should be call updateValue in willMount', () => {
    const updateValue = jest.fn();
    const name = 'fieldName';

    mockShallow('text', () => <div />, {
      name,
    }, {
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, null, false]);

    updateValue.mockClear();
    mockShallow('text', () => <div />, {
      name,
    }, {
      values: { [name]: 'value!!' },
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, 'value!!', false]);

    updateValue.mockClear();
    mockShallow('text', () => <div />, {
      name,
      value: 'value',
    }, {
      values: {},
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, 'value', false]);

    updateValue.mockClear();
    mockShallow('radio', () => <div />, {
      name,
      value: 'value',
    }, {
      values: {},
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, null, false]);

    updateValue.mockClear();
    mockShallow('radio', () => <div />, {
      name,
      value: 'value',
    }, {
      values: { [name]: 'radio value' },
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, 'radio value', false]);

    updateValue.mockClear();
    mockShallow('checkbox', () => <div />, {
      name,
      value: 'value',
    }, {
      values: {},
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, null, false]);

    updateValue.mockClear();
    mockShallow('checkbox', () => <div />, {
      name,
      value: 'value',
    }, {
      values: { [name]: 'checkbox value' },
      updateValue,
    });
    expect(updateValue.mock.calls[0]).toEqual([name, 'checkbox value', false]);
  });


  test('Should not be call update meta values if in field group', () => {
    const updateValidations = jest.fn();
    const updateNormalizers = jest.fn();
    const updateMessages = jest.fn();
    const updateLabel = jest.fn();

    const name = 'fieldName';
    const validations = { validate: true };
    const normalizers = { normalize: true };
    const label = 'Field Name';
    const messages = { message: 'message' };

    mockShallow('text', () => <div />, {
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
      group: {
        name: `group${name}`,
        multiple: false,
      },
    });

    expect(updateValidations.mock.calls.length).toBe(0);
    expect(updateNormalizers.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
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

    mockShallow('text', () => <div />, {
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
    expect(updateValidations.mock.calls[0]).toEqual([
      name,
      validations,
      false,
    ]);
    expect(updateValidations.mock.calls[0]).toEqual(updateValidations.mock.calls[1]);

    expect(updateNormalizers.mock.calls.length).toBe(2);
    expect(updateNormalizers.mock.calls[0]).toEqual([
      name,
      normalizers,
      false,
    ]);
    expect(updateNormalizers.mock.calls[0]).toEqual(updateNormalizers.mock.calls[1]);

    expect(updateMessages.mock.calls.length).toBe(2);
    expect(updateMessages.mock.calls[0]).toEqual([
      name,
      messages,
      false,
    ]);
    expect(updateMessages.mock.calls[0]).toEqual(updateMessages.mock.calls[1]);

    expect(updateLabel.mock.calls.length).toBe(2);
    expect(updateLabel.mock.calls[0]).toEqual([
      name,
      label,
      false,
    ]);
    expect(updateLabel.mock.calls[0]).toEqual(updateLabel.mock.calls[1]);
  });


  test('Should be call update data functions when receive props', () => {
    const register = jest.fn();
    const unregister = jest.fn();
    const updateValue = jest.fn();
    const updateValidations = jest.fn();
    const updateNormalizers = jest.fn();
    const updateMessages = jest.fn();
    const updateLabel = jest.fn();

    const name = 'fieldName';

    const wrapper = mockShallow('text', () => <div />, {
      name,
      value: null,
      validations: {},
      normalizers: {},
      messages: {},
      label: null,
    }, {
      register,
      unregister,
      updateValue,
      updateValidations,
      updateNormalizers,
      updateMessages,
      updateLabel,
    });

    register.mockReset();
    unregister.mockReset();
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

    wrapper.setProps({ name: 'changed name' });
    expect(unregister.mock.calls.length).toBe(1);
    expect(unregister.mock.calls[0]).toEqual([name]);
    expect(register.mock.calls.length).toBe(1);
    expect(register.mock.calls[0]).toEqual(['changed name', wrapper.instance()]);
  });


  test('Should be set initialValue', () => {
    const name = 'initialValueField';
    let wrapper;

    wrapper = mockShallow('text', () => <div />, {
      name,
      value: null,
    });

    expect(wrapper.instance().initialValue).toBe(null);
    wrapper = mockShallow('text', () => <div />, {
      name,
      value: 'prop value',
    });
    expect(wrapper.instance().initialValue).toBe('prop value');

    wrapper = mockShallow('text', () => <div />, {
      name,
    }, {
      values: {
        [name]: 'context value',
      },
    });

    expect(wrapper.instance().initialValue).toBe('context value');

    wrapper = mockShallow('text', () => <div />, {
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

    wrapper = mockShallow('checkbox', () => <div />, {
      name,
      value: 'check1',
    }, {
      values: {
        [name]: ['check1', 'check2'],
      },
    });

    expect(wrapper.instance().initialValue).toEqual(['check1', 'check2']);
  });


  test('Should be set initialValue if in field group', () => {
    const name = 'initialValueField';
    const group = { name, multiple: true };
    let wrapper;

    wrapper = mockShallow('text', () => <div />, {
      name,
      value: null,
    }, {
      group,
    });

    expect(wrapper.instance().initialValue).toBe(null);
    wrapper.setProps({ value: 'props value' });
    expect(wrapper.instance().initialValue).toBe('props value');

    wrapper = mockShallow('checkbox', () => <div />, {}, {
      values: {
        [name]: ['ctx', 'context'],
      },
      group,
    });
    expect(wrapper.instance().initialValue).toEqual(['ctx', 'context']);
  });


  test('Should be get context value', () => {
    const flat = mockShallow('text', () => <div />, {
      name: 'fieldName',
    }, {
      values: {
        fieldName: 'value',
      },
    });

    expect(flat.instance().getValue()).toBe('value');

    const nest = mockShallow('text', () => <div />, {
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

    const array1 = mockShallow('text', () => <div />, {
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

    const array2 = mockShallow('text', () => <div />, {
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

    const array3 = mockShallow('text', () => <div />, {
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


  test('Should be get field type', () => {
    const name = 'fieldName';
    let wrapper;

    wrapper = mockShallow('text', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('text');

    wrapper = mockShallow('number', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('number');

    wrapper = mockShallow('email', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('email');

    wrapper = mockShallow('radio', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('radio');

    wrapper = mockShallow('checkbox', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('checkbox');

    wrapper = mockShallow('select', () => <div />, { name });
    expect(wrapper.instance().getType()).toBe('select');

    wrapper = mockShallow('select', () => <div />, { name, multiple: false });
    expect(wrapper.instance().getType()).toBe('select');

    wrapper = mockShallow('select', () => <div />, { name, multiple: true });
    expect(wrapper.instance().getType()).toBe('select-multiple');
  });


  test('Should be get errors', () => {
    const flat = mockShallow('text', () => <div />, {
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

    const deep = mockShallow('text', () => <div />, {
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

    const failure = mockShallow('text', () => <div />, {
      name: 'notfoundkey',
    }, {
      errors: {},
    });

    expect(failure.instance().getErrors()).toBe(undefined);
  });


  test('Should be get first error', () => {
    const flat = mockShallow('text', () => <div />, {
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

    const deep = mockShallow('text', () => <div />, {
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

    const failure = mockShallow('text', () => <div />, {
      name: 'notfoundkey',
    }, {
      errors: {},
    });

    expect(failure.instance().getError()).toBe(undefined);
  });


  test('Should be return validation status', () => {
    const name = 'fieldName';
    const wrapper = mockShallow('text', () => <div />, {
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
    const wrapper = mockShallow('text', () => <div />, {
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

    const wrapper = mockShallow('text', () => <div />, {
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

    const wrapper = mockShallow('text', () => <div />, {
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

    const wrapper = mockMount('text',
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
    const updateTouched = jest.fn();

    const wrapper = mockMount('text',
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
        updateTouched,
      }
    );

    updateValue.mockReset();
    updateDirty.mockReset();
    updateTouched.mockReset();

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

    expect(updateTouched.mock.calls.length).toBe(0);

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

    expect(updateTouched.mock.calls.length).toBe(0);
  });


  test('Should be handle radio onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();
    const updateTouched = jest.fn();

    const wrapper = mockMount('radio', ({ input, props }) => (
      <input
        {...props}
        {...input}
        type="radio"
      />
    ), {
      name,
      value: 'text value',
      checked: false,
    }, {
      updateValue,
      updateTouched,
    });

    updateValue.mockReset();
    updateTouched.mockReset();

    wrapper.find('input').simulate('change', mockEvent({
      target: {
        type: 'radio',
        value: 'text value',
        checked: true,
      },
    }));

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      'text value',
      true,
    ]);

    expect(updateTouched.mock.calls.length).toBe(1);
    expect(updateTouched.mock.calls[0]).toEqual([
      name,
      true,
      false,
    ]);

    wrapper.find('input').simulate('change', mockEvent({
      target: {
        type: 'radio',
        value: 'text value',
        checked: false,
      },
    }));

    expect(updateValue.mock.calls.length).toBe(2);
    expect(updateValue.mock.calls[1]).toEqual([
      name,
      'text value',
      true,
    ]);

    expect(updateTouched.mock.calls.length).toBe(2);
    expect(updateTouched.mock.calls[1]).toEqual([
      name,
      true,
      false,
    ]);
  });


  test('Should be handle checkbox onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();
    const updateTouched = jest.fn();

    const wrapper = mockMount('checkbox', ({ input, props }) => (
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
      updateTouched,
    });

    updateValue.mockReset();
    updateTouched.mockReset();

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
      'text value',
      true,
    ]);

    expect(updateTouched.mock.calls.length).toBe(1);
    expect(updateTouched.mock.calls[0]).toEqual([
      name,
      true,
      false,
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

    expect(updateTouched.mock.calls.length).toBe(2);
    expect(updateTouched.mock.calls[1]).toEqual([
      name,
      true,
      false,
    ]);
  });


  test('Should be handle file onChange', () => {
    const name = 'fieldName';
    const updateValue = jest.fn();

    const wrapper = mockMount('file', ({ input, props }) => (
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

    const wrapper = mockMount('select', ({ input, props }) => (
      <select
        {...props}
        {...input}
        value={[]}
      />
    ), {
      name,
      multiple: true,
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


  test('Should be handle onBlur', () => {
    const name = 'blurFieldName';
    const onBlur = jest.fn();
    const wrapper = mockMount('text', ({ input, props }) => (
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
    const wrapper = mockMount('text', ({ input, props }) => (
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


  test('Should be parse value', () => {
    const name = 'testField';
    const parser = jest.fn((v, k) => `${k} ${v}`);
    const updateValue = jest.fn();
    const wrapper = mockMount('text', ({ input, props }) => (
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


  test('Should be format value', () => {
    const name = 'formatField';
    const formatter = jest.fn((v, k) => `${k} ${v}`);

    const wrapper = mockMount('text', ({ input, props }) => (
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
});
