/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { shallow, mount } from 'enzyme';
import dripFormGroup from '../dripFormGroup';
import {
  mockContext,
} from './mock';


const mockComponent = (WrappedComponent, options = {}) => (
  dripFormGroup(options)(WrappedComponent)
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


describe('dripFormGroup()', () => {
  test('Should be create field group', () => {
    const wrapper = mockShallow(() => (
      <div>FieldGroup</div>
    ), {
      name: 'foo',
    });

    expect(wrapper.html()).toBe('<div>FieldGroup</div>');
  });


  test('Should not be create field group from outside DripForm component', () => {
    const original = global.console.error;
    global.console.error = () => {};

    expect(() => {
      const FieldGroup = mockComponent(() => <div />);
      shallow(<FieldGroup name="foo" />);
    }).toThrow();

    global.console.error = original;
  });


  test('Should not be create field group without name props', () => {
    const original = global.console.error;
    global.console.error = () => {};

    expect(() => {
      mockShallow(() => <div />);
    }).toThrow();

    global.console.error = original;
  });


  test('Should be wrap displayName', () => {
    expect(mockComponent(() => <div />).displayName).toBe('dripFormGroup(Component)');
    expect(mockComponent(class Foo extends React.Component {
      render() {
        return <span />;
      }
    }).displayName).toBe('dripFormGroup(Foo)');
  });


  test('Should be pass original props', () => {
    const FieldGroup = mockComponent(() => <div />);
    const wrapper = shallow(
      <FieldGroup
        id="foo-bar"
        className="hoge-fuga"
        name="foo"
      />
      , {
        context: mockContext(),
      });

    expect(wrapper.prop('id')).toBe('foo-bar');
    expect(wrapper.prop('className')).toBe('hoge-fuga');
    expect(wrapper.prop('name')).toBe(undefined);
  });


  test('Should be pass field props', () => {
    let wrapper;

    wrapper = mockShallow(() => <div />, { name: 'foo' });

    expect(wrapper.prop('meta')).toEqual({
      name: 'foo',
      label: null,
      value: null,
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

    wrapper = mockShallow(() => <div />, {
      multiple: false,
      name: 'bar',
      label: 'BAR',
      validations: { key: { key: 'values' } },
      normalizers: { key: { key: 'values' } },
      messages: { key: { key: 'values' } },
    });

    expect(wrapper.prop('meta')).toEqual({
      name: 'bar',
      label: 'BAR',
      value: null,
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


  test('Should be pass defaultProps', () => {
    const Component = mockComponent(() => <div />, {
      defaultProps: {
        foo: 'foo',
        bar: 'bar',
        originalProp: 10,
      },
    });

    expect(Component.defaultProps).toEqual({
      multiple: false,
      value: null,
      label: null,
      validations: null,
      normalizers: null,
      messages: null,
      foo: 'foo',
      bar: 'bar',
      originalProp: 10,
    });
  });


  test('Should be register field group in context.group', () => {
    let formGroup;

    formGroup = mockShallow(() => <div />, { name: 'foo', multiple: false }).instance();
    expect(formGroup.getChildContext().group).toEqual({
      name: 'foo',
      multiple: false,
    });

    formGroup = mockShallow(() => <div />, { name: 'bar', multiple: true }).instance();
    expect(formGroup.getChildContext().group).toEqual({
      name: 'bar',
      multiple: true,
    });
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


  test('Should be update value in willMount', () => {
    const updateValue = jest.fn();

    mockShallow(() => <div />, {
      name: 'foo',
    }, {
      updateValue,
    });

    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValue.mock.calls[0]).toEqual(['foo', null, false, true]);

    mockShallow(() => <div />, {
      name: 'bar',
      value: 'props value',
    }, {
      updateValue,
    });

    expect(updateValue.mock.calls.length).toBe(2);
    expect(updateValue.mock.calls[1]).toEqual(['bar', 'props value', false, true]);
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
      validations: null,
      normalizers: null,
      messages: null,
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

    wrapper.setProps({ value: 'changed value' });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(0);
    expect(updateNormalizers.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateValue.mock.calls[0]).toEqual([
      name,
      'changed value',
      true,
      true,
    ]);

    wrapper.setProps({ validations: { key: 'update!' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateValidations.mock.calls[0]).toEqual([
      name,
      { key: 'update!' },
      true,
    ]);

    wrapper.setProps({ normalizers: { key: 'new normalizers' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(0);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateNormalizers.mock.calls[0]).toEqual([
      name,
      { key: 'new normalizers' },
      true,
    ]);

    wrapper.setProps({ messages: { key: 'new messages' } });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls.length).toBe(0);
    expect(updateMessages.mock.calls[0]).toEqual([
      name,
      { key: 'new messages' },
      true,
    ]);

    wrapper.setProps({ label: 'new label' });
    expect(updateValue.mock.calls.length).toBe(1);
    expect(updateValidations.mock.calls.length).toBe(1);
    expect(updateNormalizers.mock.calls.length).toBe(1);
    expect(updateMessages.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls.length).toBe(1);
    expect(updateLabel.mock.calls[0]).toEqual([
      name,
      'new label',
      true,
    ]);
  });


  test('Should be get context value', () => {
    let fieldGroup;

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo',
    }, {
      values: {
        foo: 'normal name',
        bar: 'test',
      },
    }).instance();
    expect(fieldGroup.getValue()).toBe('normal name');

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo.bar',
    }, {
      values: {
        foo: {
          bar: 'nest name',
          baz: 'test',
        },
        test: 'value',
      },
    }).instance();
    expect(fieldGroup.getValue()).toBe('nest name');

    fieldGroup = mockShallow(() => <div />, {
      name: 'array.0',
    }, {
      values: {
        array: [1, 2, 3],
        arr: [3, 2, 1],
      },
    }).instance();
    expect(fieldGroup.getValue()).toBe(1);

    fieldGroup = mockShallow(() => <div />, {
      name: 'deep.2.key',
    }, {
      values: {
        deep: [
          { key: 'test' },
          { key: 'test' },
          { key: 'deep nest value' },
        ],
      },
    }).instance();
    expect(fieldGroup.getValue()).toBe('deep nest value');

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo',
    }, {
      values: {},
    }).instance();
    expect(fieldGroup.getValue()).toBe(null);
  });


  test('Should be get context errors', () => {
    let fieldGroup;

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo',
    }, {
      errors: {
        foo: ['err1', 'err2'],
        bar: ['error'],
      },
    }).instance();
    expect(fieldGroup.getErrors()).toEqual(['err1', 'err2']);

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo.bar',
    }, {
      errors: {
        'foo.bar': ['err1'],
        'bar.baz': [],
        foo: { bar: [] },
      },
    }).instance();
    expect(fieldGroup.getErrors()).toEqual(['err1']);

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo.bar',
    }, {
      errors: {},
    }).instance();
    expect(fieldGroup.getErrors()).toEqual(undefined);
  });


  test('Should be get context first error', () => {
    let fieldGroup;

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo',
    }, {
      errors: {
        foo: ['err1', 'err2', 'err3'],
      },
    }).instance();
    expect(fieldGroup.getError()).toBe('err1');

    fieldGroup = mockShallow(() => <div />, {
      name: 'foo',
    }, {
      errors: {},
    }).instance();
    expect(fieldGroup.getError()).toBe(undefined);
  });


  test('Should be get validation state', () => {
    const name = 'foo';
    const wrapper = mockShallow(() => <div />, { name });
    const fieldGroup = wrapper.instance();

    wrapper.setContext(mockContext({
      errors: { bar: ['error'] },
      touches: ['bar'],
      dirties: ['bar'],
      validating: ['bar'],
    }));

    expect(fieldGroup.isValid()).toBe(true);
    expect(fieldGroup.isInvalid()).toBe(false);
    expect(fieldGroup.isValidating()).toBe(false);
    expect(fieldGroup.isTouched()).toBe(false);
    expect(fieldGroup.isUntouched()).toBe(true);
    expect(fieldGroup.isDirty()).toBe(false);
    expect(fieldGroup.isPristine()).toBe(true);

    wrapper.setContext(mockContext({
      errors: { [name]: ['err'], bar: ['error'] },
      touches: [name, 'bar'],
      dirties: [name, 'bar'],
      validating: [name, 'bar'],
    }));

    expect(fieldGroup.isValid()).toBe(false);
    expect(fieldGroup.isInvalid()).toBe(true);
    expect(fieldGroup.isValidating()).toBe(true);
    expect(fieldGroup.isTouched()).toBe(true);
    expect(fieldGroup.isUntouched()).toBe(false);
    expect(fieldGroup.isDirty()).toBe(true);
    expect(fieldGroup.isPristine()).toBe(false);
  });
});
