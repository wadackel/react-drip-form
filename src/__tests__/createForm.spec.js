/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { shallow, mount } from 'enzyme';
import dripForm from '../dripForm';


const mockField = (name, props = {}, initialValue = null) => ({
  _isMockField: true,
  props: {
    name,
    ...props,
  },
  initialValue,
});

const mockComponent = (WrappedComponent, options = {}, methods = {}) => {
  const Component = dripForm(options)(WrappedComponent);

  Object.keys(methods).forEach((method) => {
    Component.prototype[method] = methods[method];
  });

  return Component;
};

const mockShallow = (WrappedComponent, props = {}, options = {}, methods = {}) => {
  const Component = mockComponent(WrappedComponent, options, methods);
  return shallow(<Component {...props} />);
};

const mockEvent = () => ({
  stopPropagation: jest.fn(),
  preventDefault: jest.fn(),
});


describe('dripForm()', () => {
  test('Should be create form', () => {
    const wrapper = mockShallow(() => (
      <div>Form</div>
    ));

    expect(wrapper.html()).toBe('<div>Form</div>');
  });


  test('Should be wrap displayName', () => {
    expect(mockComponent(() => <div />).displayName).toBe('dripForm(Component)');
    expect(mockComponent(class Hoge extends React.Component {
      render() {
        return <div />;
      }
    }).displayName).toBe('dripForm(Hoge)');
  });


  test('Should be pass original props', () => {
    const Form = mockComponent(() => <div />);
    const wrapper = shallow(
      <Form
        id="pass-props"
        className="test-form"
      />
    );

    expect(wrapper.prop('id')).toBe('pass-props');
    expect(wrapper.prop('className')).toBe('test-form');
  });


  test('Should be pass form props', () => {
    const wrapper = mockShallow(() => <div />);

    expect(wrapper.prop('values')).toEqual({});
    expect(wrapper.prop('errors')).toEqual({});
    expect(wrapper.prop('status')).toEqual({
      valid: true,
      invalid: false,
      touched: false,
      untouched: true,
      dirty: false,
      pristine: true,
      validating: false,
    });
  });


  test('Should be call validate when mounted', () => {
    const validate = jest.fn();
    const Component = mockComponent(() => <div />, {}, {
      validate,
    });

    expect(validate.mock.calls.length).toBe(0);

    mount(<Component />);

    expect(validate.mock.calls.length).toBe(1);
  });


  test('Should be pass values from props', () => {
    const values = {
      foo: 'bar',
      hoge: 'fuga',
      array: [1, 2, 3],
    };

    const wrapper = mockShallow(() => <div />, {
      values,
    });

    expect(wrapper.instance().values).toEqual(values);
    expect(wrapper.state('values')).toEqual(values);
  });


  test('Should be pass values when receive props', () => {
    const wrapper = mockShallow(() => <div />, {
      values: {},
    });

    expect(wrapper.state('values')).toEqual({});

    const values = {
      key: 'value',
      deep: {
        nest: [1, 2, 3],
      },
    };

    wrapper.setProps({ values });

    expect(wrapper.state('values')).toEqual(values);
  });


  test('Should be set values', () => {
    const onChange = jest.fn();
    const wrapper = mockShallow(() => <div />, { onChange });
    const form = wrapper.instance();

    onChange.mockClear();

    expect(wrapper.state('values')).toEqual({});
    expect(form.values).toEqual({});
    expect(form.validator.getValues()).toEqual({});
    expect(onChange.mock.calls.length).toBe(0);

    const values = {
      foo: 'bar',
      hoge: 'fuga',
    };

    form.setValues(values);

    expect(wrapper.state('values')).toEqual(values);
    expect(form.values).toEqual(values);
    expect(form.validator.getValues()).toEqual(values);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toEqual([values, form]);
  });


  test('Should be get values', () => {
    const form = mockShallow(() => <div />).instance();
    let values;

    values = {};
    form.setValues(values);
    expect(form.getValues()).toEqual(values);

    values = {
      foo: 'bar',
      hoge: 'fuga',
    };
    form.setValues(values);
    expect(form.getValues()).toEqual(values);
  });


  test('Should be get errors', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    wrapper.setState({ errors: { key: 'value' } });
    expect(form.getErrors()).toEqual({ key: 'value' });

    wrapper.setState({ errors: {} });
    expect(form.getErrors()).toEqual({});
  });


  test('Should be set errors', () => {
    const form = mockShallow(() => <div />).instance();
    let values;

    values = {};
    form.setErrors(values);
    expect(form.getErrors()).toEqual(values);

    values = { key: 'value' };
    form.setErrors(values);
    expect(form.getErrors()).toEqual(values);

    values = {
      foo: 'bar',
      array: [1, 2, 3],
      deep: { nest: 'value' },
    };
    form.setErrors(values);
    expect(form.getErrors()).toEqual(values);
  });


  test('Should be get touch status', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    expect(form.isTouched()).toBe(false);

    wrapper.setState({ touches: ['name1'] });

    expect(form.isTouched()).toBe(true);
  });


  test('Should be get change status', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    expect(form.isDirty()).toBe(false);

    wrapper.setState({ dirties: ['name1'] });

    expect(form.isDirty()).toBe(true);
  });


  test('Should be register field component', () => {
    const form = mockShallow(() => <div />).instance();
    const foo = mockField('foo');
    const bar = mockField('bar');

    expect(form.fields).toEqual({});

    form.register(foo);

    expect(form.fields).toEqual({ foo });

    form.register(bar);

    expect(form.fields).toEqual({
      foo,
      bar,
    });
  });


  test('Should be unregister field component', () => {
    const form = mockShallow(() => <div />).instance();
    const foo = mockField('foo');
    const bar = mockField('bar');

    form.register(foo);
    form.register(bar);

    expect(form.fields).toEqual({
      foo,
      bar,
    });

    form.unregister(foo);

    expect(form.fields).toEqual({ bar });

    form.unregister(bar);

    expect(form.fields).toEqual({});
  });


  test('Should be remove field data when unregistering', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    const flat = mockField('flat');
    const deep = mockField('deep.nest.key');
    const array = mockField('array.0');
    const arrayDeep = mockField('arrayDeep.1.1');

    const flatValue = 'flat-value';
    const deepValue = { nest: { key: 'deep-value' } };
    const arrayValue = ['array-value-1', 'array-value-2', 'array-value-3'];
    const arrayDeepValue = [
      ['array-deep-value-1', 'array-deep-value-2', 'array-deep-value-3'],
      ['array-deep-value-1 2', 'array-deep-value-2 2', 'array-deep-value-3 2'],
    ];

    const flatErrors = ['flat-error-1', 'flat-error-2'];
    const deepErrors = ['deep-error-1', 'deep-error-2'];
    const arrayErrors1 = ['array.0-error-1', 'array.0-error-2'];
    const arrayErrors2 = ['array.1-error-1', 'array.1-error-2'];
    const arrayDeepErrors00 = ['array-deep.0.0-error-1'];
    const arrayDeepErrors01 = ['array-deep.0.1-error-1'];
    const arrayDeepErrors02 = ['array-deep.0.2-error-1'];
    const arrayDeepErrors10 = ['array-deep.1.0-error-1'];

    form.register(flat);
    form.register(deep);
    form.register(array);
    form.register(arrayDeep);

    form.setValues({
      flat: flatValue,
      deep: deepValue,
      array: arrayValue,
      arrayDeep: arrayDeepValue,
    });

    wrapper.setState({
      errors: {
        flat: flatErrors,
        'deep.nest.key': deepErrors,
        'array.0': arrayErrors1,
        'array.1': arrayErrors2,
        'arrayDeep.0.0': arrayDeepErrors00,
        'arrayDeep.0.1': arrayDeepErrors01,
        'arrayDeep.0.2': arrayDeepErrors02,
        'arrayDeep.1.0': arrayDeepErrors10,
      },
      touches: [
        'flat',
        'deep.nest.key',
        'array.0',
        'array.1',
        'arrayDeep.0.0',
        'arrayDeep.0.1',
        'arrayDeep.0.2',
        'arrayDeep.1.0',
      ],
      dirties: [
        'flat',
        'deep.nest.key',
        'array.0',
        'array.1',
        'arrayDeep.0.0',
        'arrayDeep.0.1',
        'arrayDeep.0.2',
        'arrayDeep.1.0',
      ],
    });

    form.unregister(flat);

    expect(wrapper.state('values')).toEqual({
      deep: deepValue,
      array: arrayValue,
      arrayDeep: arrayDeepValue,
    });

    expect(wrapper.state('errors')).toEqual({
      'deep.nest.key': deepErrors,
      'array.0': arrayErrors1,
      'array.1': arrayErrors2,
      'arrayDeep.0.0': arrayDeepErrors00,
      'arrayDeep.0.1': arrayDeepErrors01,
      'arrayDeep.0.2': arrayDeepErrors02,
      'arrayDeep.1.0': arrayDeepErrors10,
    });

    expect(wrapper.state('touches')).toEqual([
      'deep.nest.key',
      'array.0',
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    expect(wrapper.state('dirties')).toEqual([
      'deep.nest.key',
      'array.0',
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    form.unregister(deep);

    expect(wrapper.state('values')).toEqual({
      deep: { nest: {} },
      array: arrayValue,
      arrayDeep: arrayDeepValue,
    });

    expect(wrapper.state('errors')).toEqual({
      'array.0': arrayErrors1,
      'array.1': arrayErrors2,
      'arrayDeep.0.0': arrayDeepErrors00,
      'arrayDeep.0.1': arrayDeepErrors01,
      'arrayDeep.0.2': arrayDeepErrors02,
      'arrayDeep.1.0': arrayDeepErrors10,
    });

    expect(wrapper.state('touches')).toEqual([
      'array.0',
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    expect(wrapper.state('dirties')).toEqual([
      'array.0',
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    form.unregister(array);

    expect(wrapper.state('values')).toEqual({
      deep: { nest: {} },
      array: ['array-value-2', 'array-value-3'],
      arrayDeep: arrayDeepValue,
    });

    expect(wrapper.state('errors')).toEqual({
      'array.1': arrayErrors2,
      'arrayDeep.0.0': arrayDeepErrors00,
      'arrayDeep.0.1': arrayDeepErrors01,
      'arrayDeep.0.2': arrayDeepErrors02,
      'arrayDeep.1.0': arrayDeepErrors10,
    });

    expect(wrapper.state('touches')).toEqual([
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    expect(wrapper.state('dirties')).toEqual([
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    form.unregister(arrayDeep);

    expect(wrapper.state('values')).toEqual({
      deep: { nest: {} },
      array: ['array-value-2', 'array-value-3'],
      arrayDeep: [
        ['array-deep-value-1', 'array-deep-value-2', 'array-deep-value-3'],
        ['array-deep-value-1 2', 'array-deep-value-3 2'],
      ],
    });

    expect(wrapper.state('errors')).toEqual({
      'array.1': arrayErrors2,
      'arrayDeep.0.0': arrayDeepErrors00,
      'arrayDeep.0.1': arrayDeepErrors01,
      'arrayDeep.0.2': arrayDeepErrors02,
      'arrayDeep.1.0': arrayDeepErrors10,
    });

    expect(wrapper.state('touches')).toEqual([
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);

    expect(wrapper.state('dirties')).toEqual([
      'array.1',
      'arrayDeep.0.0',
      'arrayDeep.0.1',
      'arrayDeep.0.2',
      'arrayDeep.1.0',
    ]);
  });


  test('Should be get initial values', () => {
    const form = mockShallow(() => <div />).instance();

    form.register(mockField('foo', {}, 'value1'));
    form.register(mockField('bar.baz', {}, 'value2'));
    form.register(mockField('hoge', {}, null));
    form.register(mockField('fuga', {}, undefined));
    form.register(mockField('array.0', {}, 0));
    form.register(mockField('array.1', {}, 1));

    const values = {
      foo: 'before-value1',
      bar: {
        baz: 'before-value2',
      },
      hoge: 'before-hoge',
      array: [100, 200],
    };

    form.setValues(values);

    expect(form.initialValues()).toEqual({
      foo: 'value1',
      bar: {
        baz: 'value2',
      },
      array: [0, 1],
    });
    expect(form.getValues()).toEqual(values);
  });


  test('Should be clear values', () => {
    const onClear = jest.fn();
    const wrapper = mockShallow(() => <div />, { onClear });
    const form = wrapper.instance();
    let values;

    values = { key: 'value' };
    form.setValues(values);
    expect(form.getValues()).toEqual(values);
    form.clear();
    expect(form.getValues()).toEqual({});
    expect(onClear.mock.calls.length).toBe(1);
    expect(onClear.mock.calls[0]).toEqual([form]);

    values = {
      foo: {
        bar: 'baz',
      },
      array: [1, 2, 3],
    };
    form.setValues(values);
    expect(form.getValues()).toEqual(values);
    form.clear();
    expect(form.getValues()).toEqual({});
    expect(onClear.mock.calls.length).toBe(2);
    expect(onClear.mock.calls[1]).toEqual([form]);
  });


  test('Should be reset values', () => {
    const form = mockShallow(() => <div />).instance();

    form.register(mockField('foo', {}, 'value1'));
    form.register(mockField('bar.baz', {}, 'value2'));
    form.register(mockField('hoge', {}, null));
    form.register(mockField('fuga', {}, undefined));
    form.register(mockField('array.0', {}, 0));
    form.register(mockField('array.1', {}, 1));
    form.register(mockField('deep.0.array.0', {}, 10));

    const values = {
      foo: 'foo',
      bar: {
        baz: 'baz',
      },
      hoge: 'hoge',
      fuga: 'fuga',
      array: [-100, -200],
      deep: [
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
      ],
    };

    form.setValues(values);
    expect(form.getValues()).toEqual(values);

    form.reset();

    expect(form.getValues()).toEqual({
      foo: 'value1',
      bar: {
        baz: 'value2',
      },
      array: [0, 1],
      deep: [
        { array: [10] },
      ],
    });
  });


  test('Should be get field', () => {
    const form = mockShallow(() => <div />).instance();
    const foo = mockField('foo');
    const bar = mockField('bar');

    form.register(foo);
    form.register(bar);

    expect(form.getField('foo')).toEqual(foo);
    expect(form.getField('bar')).toEqual(bar);
    expect(form.getField('notfound')).toBe(undefined);
  });


  test('Should be update value', () => {
    let Component;
    let form;
    const validate = jest.fn();
    const normalize = jest.fn();

    Component = mockComponent(() => <div />, {}, {
      validate,
      normalize,
    });

    form = shallow(<Component />).instance();
    validate.mockClear();
    normalize.mockClear();

    form.setValues({ foo: 'bar' });
    form.updateValue('foo', 'change-bar-1', false);

    expect(form.values).toEqual({ foo: 'change-bar-1' });
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);

    form.updateValue('foo', 'change-bar-2', true);

    expect(form.values).toEqual({ foo: 'change-bar-2' });
    expect(validate.mock.calls.length).toBe(1);

    Component = mockComponent(() => <div />, {
      validateOnChange: false,
      normalizeOnChange: false,
    }, {
      validate,
      normalize,
    });

    form = shallow(<Component />).instance();

    validate.mockClear();
    normalize.mockClear();

    form.setValues({ foo: 'bar' });
    form.updateValue('foo', 'change-value', true);

    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);
  });


  test('Should be update touch status', () => {
    let Component;
    let wrapper;
    let form;
    const validate = jest.fn();
    const normalize = jest.fn();

    Component = mockComponent(() => <div />, {}, {
      validate,
      normalize,
    });

    wrapper = shallow(<Component />);
    form = wrapper.instance();

    validate.mockClear();
    normalize.mockClear();

    wrapper.setState({ touches: ['bar', 'baz'] });

    form.updateTouched('foo', true, false);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz', 'foo']);
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);

    form.updateTouched('foo', true, true);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz', 'foo']);
    expect(validate.mock.calls.length).toBe(1);
    expect(normalize.mock.calls.length).toBe(1);

    form.updateTouched('foo', false, false);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz']);
    expect(validate.mock.calls.length).toBe(1);
    expect(normalize.mock.calls.length).toBe(1);

    form.updateTouched('foo', false, true);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz']);
    expect(validate.mock.calls.length).toBe(2);
    expect(normalize.mock.calls.length).toBe(2);

    Component = mockComponent(() => <div />, {
      validateOnBlur: false,
      normalizeOnBlur: false,
    }, {
      validate,
      normalize,
    });

    wrapper = shallow(<Component />);
    form = wrapper.instance();

    validate.mockClear();
    normalize.mockClear();

    wrapper.setState({ touches: ['bar', 'baz'] });

    form.updateTouched('foo', true, false);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz', 'foo']);
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);

    form.updateTouched('foo', true, true);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz', 'foo']);
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);

    form.updateTouched('foo', false, false);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz']);
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);

    form.updateTouched('foo', false, true);
    expect(wrapper.state('touches')).toEqual(['bar', 'baz']);
    expect(validate.mock.calls.length).toBe(0);
    expect(normalize.mock.calls.length).toBe(0);
  });


  test('Should be update change status', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    wrapper.setState({ dirties: ['bar', 'baz'] });

    form.updateDirty('foo', true);
    expect(wrapper.state('dirties')).toEqual(['bar', 'baz', 'foo']);

    form.updateDirty('foo', true);
    expect(wrapper.state('dirties')).toEqual(['bar', 'baz', 'foo']);

    form.updateDirty('foo', false);
    expect(wrapper.state('dirties')).toEqual(['bar', 'baz']);

    form.updateDirty('foo', false);
    expect(wrapper.state('dirties')).toEqual(['bar', 'baz']);
  });


  test('Should be update validations', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();
    const validator = form.validator;

    validate.mockClear();

    form.updateValidations('foo', {}, true);
    expect(validate.mock.calls.length).toBe(1);
    expect(validator.getRules()).toEqual({
      foo: {},
    });

    form.updateValidations('foo', { key: 'value' }, true);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getRules()).toEqual({
      foo: { key: 'value' },
    });

    form.updateValidations('foo', {}, true);
    expect(validate.mock.calls.length).toBe(3);
    expect(validator.getRules()).toEqual({
      foo: { key: 'value' },
    });

    form.updateValidations('foo', { key2: 'value2' }, true);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateValidations('foo', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateValidations('foo.bar', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {},
    });

    form.updateValidations('foo.bar', { key: 'value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
      },
    });

    form.updateValidations('foo.bar', { key2: 'value2' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateValidations('foo', { key: 'final-value' }, false);
    form.updateValidations('foo.bar', { key: 'final-value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getRules()).toEqual({
      foo: {
        key: 'final-value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'final-value',
        key2: 'value2',
      },
    });

    validate.mockClear();

    form.updateValidations('foo', null, true);
    expect(validate.mock.calls.length).toBe(0);
  });


  test('Should be update normalizers', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();
    const validator = form.validator;

    validate.mockClear();

    form.updateNormalizers('foo', {}, true);
    expect(validate.mock.calls.length).toBe(1);
    expect(validator.getNormalizers()).toEqual({
      foo: {},
    });

    form.updateNormalizers('foo', { key: 'value' }, true);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getNormalizers()).toEqual({
      foo: { key: 'value' },
    });

    form.updateNormalizers('foo', {}, true);
    expect(validate.mock.calls.length).toBe(3);
    expect(validator.getNormalizers()).toEqual({
      foo: { key: 'value' },
    });

    form.updateNormalizers('foo', { key2: 'value2' }, true);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateNormalizers('foo', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateNormalizers('foo.bar', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {},
    });

    form.updateNormalizers('foo.bar', { key: 'value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
      },
    });

    form.updateNormalizers('foo.bar', { key2: 'value2' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateNormalizers('foo', { key: 'final-value' }, false);
    form.updateNormalizers('foo.bar', { key: 'final-value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getNormalizers()).toEqual({
      foo: {
        key: 'final-value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'final-value',
        key2: 'value2',
      },
    });

    validate.mockClear();

    form.updateNormalizers('foo', null, true);
    expect(validate.mock.calls.length).toBe(0);
  });


  test('Should be update messages', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();
    const validator = form.validator;

    validate.mockClear();

    form.updateMessages('foo', {}, true);
    expect(validate.mock.calls.length).toBe(1);
    expect(validator.getMessages()).toEqual({
      foo: {},
    });

    form.updateMessages('foo', { key: 'value' }, true);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getMessages()).toEqual({
      foo: { key: 'value' },
    });

    form.updateMessages('foo', {}, true);
    expect(validate.mock.calls.length).toBe(3);
    expect(validator.getMessages()).toEqual({
      foo: { key: 'value' },
    });

    form.updateMessages('foo', { key2: 'value2' }, true);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateMessages('foo', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateMessages('foo.bar', {}, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {},
    });

    form.updateMessages('foo.bar', { key: 'value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
      },
    });

    form.updateMessages('foo.bar', { key2: 'value2' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'value',
        key2: 'value2',
      },
    });

    form.updateMessages('foo', { key: 'final-value' }, false);
    form.updateMessages('foo.bar', { key: 'final-value' }, false);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getMessages()).toEqual({
      foo: {
        key: 'final-value',
        key2: 'value2',
      },
      'foo.bar': {
        key: 'final-value',
        key2: 'value2',
      },
    });

    validate.mockClear();

    form.updateMessages('foo', null, true);
    expect(validate.mock.calls.length).toBe(0);
  });


  test('Should be update field label', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();
    const validator = form.validator;

    validate.mockClear();

    form.updateLabel('foo', 'FOO', true);
    expect(validate.mock.calls.length).toBe(1);
    expect(validator.getLabels()).toEqual({
      foo: 'FOO',
    });

    form.updateLabel('foo', '___', true);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getLabels()).toEqual({
      foo: '___',
    });

    form.updateLabel('foo', '___', false);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getLabels()).toEqual({
      foo: '___',
    });

    form.updateLabel('foo', null, true);
    expect(validate.mock.calls.length).toBe(2);
    expect(validator.getLabels()).toEqual({
      foo: '___',
    });

    form.updateLabel('foo.bar', 'Foo-Bar', true);
    expect(validate.mock.calls.length).toBe(3);
    expect(validator.getLabels()).toEqual({
      foo: '___',
      'foo.bar': 'Foo-Bar',
    });

    form.updateLabel('foo.bar', 'FOO_BAR', true);
    expect(validate.mock.calls.length).toBe(4);
    expect(validator.getLabels()).toEqual({
      foo: '___',
      'foo.bar': 'FOO_BAR',
    });
  });


  test('Should be get field value', () => {
    const validate = jest.fn();
    const form = mockShallow(() => <div />, {}, {}, { validate }).instance();

    form.setValues({
      foo: 'bar',
      array: [1, 2, 3],
      deep: {
        nest: {
          key: 'value',
        },
        array: [1, 2, 3],
        deepArray: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
    });

    expect(form.fieldGet('foo')).toEqual('bar');
    expect(form.fieldGet('array')).toEqual([1, 2, 3]);
    expect(form.fieldGet('array.0')).toEqual(1);
    expect(form.fieldGet('array.1')).toEqual(2);
    expect(form.fieldGet('array.2')).toEqual(3);
    expect(form.fieldGet('array.*')).toEqual([1, 2, 3]);

    expect(form.fieldGet('deep.nest')).toEqual({ key: 'value' });
    expect(form.fieldGet('deep.nest.key')).toEqual('value');
    expect(form.fieldGet('deep.array')).toEqual([1, 2, 3]);
    expect(form.fieldGet('deep.array.2')).toEqual(3);
    expect(form.fieldGet('deep.deepArray.2.1')).toEqual(2);

    expect(form.fieldGet('notfound')).toBe(null);
    expect(form.fieldGet('notfound', 'default')).toBe('default');
  });


  test('Should be set new field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.fieldSet('foo.0', 'value');
    expect(validate.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({
      foo: ['value'],
    });

    form.fieldSet('foo.1', 'value');
    expect(validate.mock.calls.length).toBe(2);
    expect(wrapper.state('values')).toEqual({
      foo: ['value', 'value'],
    });

    form.fieldSet('foo', { key: 'value' });
    expect(validate.mock.calls.length).toBe(3);
    expect(wrapper.state('values')).toEqual({
      foo: { key: 'value' },
    });

    form.fieldSet('deep.nest.key', 'value');
    expect(validate.mock.calls.length).toBe(4);
    expect(wrapper.state('values')).toEqual({
      foo: { key: 'value' },
      deep: {
        nest: { key: 'value' },
      },
    });
  });


  test('Should be remove field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.fieldRemove('foo');
    expect(validate.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({
    });

    form.setValues({
      normal: 'fieldValue',
      deep: {
        nest: 'value',
        array: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      array: [1, 2, 3],
    });

    form.fieldRemove('normal');
    expect(validate.mock.calls.length).toBe(2);
    expect(wrapper.state('values')).toEqual({
      deep: {
        nest: 'value',
        array: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      array: [1, 2, 3],
    });

    form.fieldRemove('deep.nest');
    expect(validate.mock.calls.length).toBe(3);
    expect(wrapper.state('values')).toEqual({
      deep: {
        array: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      array: [1, 2, 3],
    });

    form.fieldRemove('array.2');
    expect(validate.mock.calls.length).toBe(4);
    expect(wrapper.state('values')).toEqual({
      deep: {
        array: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      array: [1, 2],
    });

    form.fieldRemove('array.*');
    expect(validate.mock.calls.length).toBe(5);
    expect(wrapper.state('values')).toEqual({
      deep: {
        array: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      array: [],
    });

    form.fieldRemove('deep.array.1.2');
    expect(validate.mock.calls.length).toBe(6);
    expect(wrapper.state('values')).toEqual({
      deep: {
        array: [
          [1, 2, 3],
          [1, 2],
          [1, 2, 3],
        ],
      },
      array: [],
    });

    form.fieldRemove('*');
    expect(validate.mock.calls.length).toBe(7);
    expect(wrapper.state('values')).toEqual({
    });
  });


  test('Should be push new field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.fieldPush('foo', 'value');
    expect(validate.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({
      foo: ['value'],
    });

    form.fieldPush('foo', 'value');
    expect(validate.mock.calls.length).toBe(2);
    expect(wrapper.state('values')).toEqual({
      foo: ['value', 'value'],
    });

    form.fieldPush('bar.baz.0', 'value');
    expect(validate.mock.calls.length).toBe(3);
    expect(wrapper.state('values')).toEqual({
      foo: ['value', 'value'],
      bar: {
        baz: [
          ['value'],
        ],
      },
    });

    expect(() => {
      form.fieldPush('bar', {});
    }).toThrow(/"bar" must be array/);
    expect(validate.mock.calls.length).toBe(3);
  });


  test('Should be pop field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    expect(form.fieldPop('foo')).toEqual(undefined);
    expect(wrapper.state('values')).toEqual({});
    expect(validate.mock.calls.length).toBe(0);

    form.setValues({
      array: [1, 2, 3],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });

    expect(form.fieldPop('array')).toEqual(3);
    expect(wrapper.state('values')).toEqual({
      array: [1, 2],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(1);

    expect(form.fieldPop('array')).toEqual(2);
    expect(wrapper.state('values')).toEqual({
      array: [1],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(2);

    expect(form.fieldPop('deep.array')).toEqual([7, 8, 9]);
    expect(wrapper.state('values')).toEqual({
      array: [1],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(3);

    expect(form.fieldPop('deep.array.1')).toEqual(6);
    expect(wrapper.state('values')).toEqual({
      array: [1],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(4);

    expect(() => {
      form.fieldPop('deep');
    }).toThrow(/"deep" must be array/);
  });


  test('Should be shift field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    expect(form.fieldShift('foo')).toEqual(undefined);
    expect(wrapper.state('values')).toEqual({});
    expect(validate.mock.calls.length).toBe(0);

    form.setValues({
      array: [1, 2, 3],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });

    expect(form.fieldShift('array')).toEqual(1);
    expect(wrapper.state('values')).toEqual({
      array: [2, 3],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(1);

    expect(form.fieldShift('array')).toEqual(2);
    expect(wrapper.state('values')).toEqual({
      array: [3],
      deep: {
        array: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(2);

    expect(form.fieldShift('deep.array')).toEqual([1, 2, 3]);
    expect(wrapper.state('values')).toEqual({
      array: [3],
      deep: {
        array: [
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(3);

    expect(form.fieldShift('deep.array.1')).toEqual(7);
    expect(wrapper.state('values')).toEqual({
      array: [3],
      deep: {
        array: [
          [4, 5, 6],
          [8, 9],
        ],
      },
    });
    expect(validate.mock.calls.length).toBe(4);

    expect(() => {
      form.fieldShift('deep');
    }).toThrow(/"deep" must be array/);
  });


  test('Should be unshift field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.fieldUnshift('foo', 1, 2, 3);
    expect(wrapper.state('values')).toEqual({
      foo: [1, 2, 3],
    });
    expect(validate.mock.calls.length).toBe(1);

    form.fieldUnshift('foo', 4, 5, 6);
    expect(wrapper.state('values')).toEqual({
      foo: [4, 5, 6, 1, 2, 3],
    });
    expect(validate.mock.calls.length).toBe(2);

    form.fieldUnshift('array.0', [1], [1], [1]);
    expect(wrapper.state('values')).toEqual({
      foo: [4, 5, 6, 1, 2, 3],
      array: [
        [[1], [1], [1]],
      ],
    });
    expect(validate.mock.calls.length).toBe(3);

    expect(() => {
      form.setValues({ notarray: { key: 'value' } });
      form.fieldUnshift('notarray');
    }).toThrow(/"notarray" must be array/);
  });


  test('Should be swap field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.setValues({
      array: [1, 2, 3, 4],
      obj: [
        { key: 'value1' },
        { key: 'value2' },
        { key: 'value3' },
      ],
      deep: [
        [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ],
      ],
    });

    form.fieldSwap('array', 3, 0);
    expect(wrapper.state('values')).toEqual({
      array: [4, 2, 3, 1],
      obj: [
        { key: 'value1' },
        { key: 'value2' },
        { key: 'value3' },
      ],
      deep: [
        [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ],
      ],
    });
    expect(validate.mock.calls.length).toBe(1);

    form.fieldSwap('obj', 1, 2);
    expect(wrapper.state('values')).toEqual({
      array: [4, 2, 3, 1],
      obj: [
        { key: 'value1' },
        { key: 'value3' },
        { key: 'value2' },
      ],
      deep: [
        [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ],
      ],
    });
    expect(validate.mock.calls.length).toBe(2);

    form.fieldSwap('deep.0.2', 2, 3);
    expect(wrapper.state('values')).toEqual({
      array: [4, 2, 3, 1],
      obj: [
        { key: 'value1' },
        { key: 'value3' },
        { key: 'value2' },
      ],
      deep: [
        [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 4, 3],
        ],
      ],
    });
    expect(validate.mock.calls.length).toBe(3);

    form.setValues({ array: [1] });

    form.fieldSwap('notfound', 1, 2);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(3);

    form.fieldSwap('array', 1, 2);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(3);

    expect(() => {
      form.setValues({ notarray: { key: 'value' } });
      form.fieldSwap('notarray', 2, 1);
    }).toThrow(/"notarray" must be array/);
  });


  test('Should be move field value', () => {
    const validate = jest.fn();
    const wrapper = mockShallow(() => <div />, {}, {}, { validate });
    const form = wrapper.instance();

    validate.mockClear();

    form.setValues({ array: [1, 2, 3, 4] });

    form.fieldMove('array', 3, 0);
    expect(wrapper.state('values')).toEqual({ array: [4, 1, 2, 3] });
    expect(validate.mock.calls.length).toBe(1);

    form.fieldMove('array', 0, 3);
    expect(wrapper.state('values')).toEqual({ array: [1, 2, 3, 4] });
    expect(validate.mock.calls.length).toBe(2);

    form.fieldMove('array', 2, 1);
    expect(wrapper.state('values')).toEqual({ array: [1, 3, 2, 4] });
    expect(validate.mock.calls.length).toBe(3);

    form.fieldMove('array', 0, 1);
    expect(wrapper.state('values')).toEqual({ array: [3, 1, 2, 4] });
    expect(validate.mock.calls.length).toBe(4);

    validate.mockClear();

    form.setValues({ array: [1] });

    form.fieldMove('array', 0, 10);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(1);

    validate.mockClear();

    form.setValues({
      deep: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
    });

    form.fieldMove('deep', 0, 1);
    expect(wrapper.state('values')).toEqual({
      deep: [
        [5, 6, 7, 8],
        [1, 2, 3, 4],
      ],
    });
    expect(validate.mock.calls.length).toBe(1);

    form.fieldMove('deep.1', 1, 2);
    expect(wrapper.state('values')).toEqual({
      deep: [
        [5, 6, 7, 8],
        [1, 3, 2, 4],
      ],
    });
    expect(validate.mock.calls.length).toBe(2);

    validate.mockClear();

    form.setValues({ array: [1] });

    form.fieldMove('notfound', 1, 2);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(0);

    form.fieldMove('array', 0, 0);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(0);

    form.fieldMove('array', 10, 0);
    expect(wrapper.state('values')).toEqual({ array: [1] });
    expect(validate.mock.calls.length).toBe(0);

    expect(() => {
      form.setValues({ notarray: { key: 'value' } });
      form.fieldMove('notarray', 2, 1);
    }).toThrow(/"notarray" must be array/);
  });


  test('Should be map field value', () => {
    const iteratee = jest.fn((p, i, v) => v);
    const form = mockShallow(() => <div />).instance();

    form.setValues({
      foo: 'bar',
      hoge: 'fuga',
      key: 'value',
    });

    expect(form.fieldMap('*', iteratee)).toEqual([
      'bar',
      'fuga',
      'value',
    ]);
    expect(iteratee.mock.calls).toEqual([
      ['foo', 'foo', 'bar'],
      ['hoge', 'hoge', 'fuga'],
      ['key', 'key', 'value'],
    ]);

    iteratee.mockClear();
    form.setValues({
      deep: {
        nest1: 'value1',
        nest2: 'value2',
        nest3: 'value3',
      },
    });

    expect(form.fieldMap('deep.*', iteratee)).toEqual([
      'value1',
      'value2',
      'value3',
    ]);
    expect(iteratee.mock.calls).toEqual([
      ['deep.nest1', 'nest1', 'value1'],
      ['deep.nest2', 'nest2', 'value2'],
      ['deep.nest3', 'nest3', 'value3'],
    ]);

    iteratee.mockClear();
    form.setValues({
      array: [1, 2, 3],
    });

    expect(form.fieldMap('array.*', iteratee)).toEqual([
      1,
      2,
      3,
    ]);
    expect(iteratee.mock.calls).toEqual([
      ['array.0', 0, 1],
      ['array.1', 1, 2],
      ['array.2', 2, 3],
    ]);

    iteratee.mockClear();
    form.setValues({
      deep: [
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
      ],
    });

    expect(form.fieldMap('deep.*.array.*', iteratee)).toEqual([
      1, 2, 3,
      1, 2, 3,
      1, 2, 3,
    ]);
    expect(iteratee.mock.calls).toEqual([
      ['deep.0.array.0', 0, 1],
      ['deep.0.array.1', 1, 2],
      ['deep.0.array.2', 2, 3],
      ['deep.1.array.0', 0, 1],
      ['deep.1.array.1', 1, 2],
      ['deep.1.array.2', 2, 3],
      ['deep.2.array.0', 0, 1],
      ['deep.2.array.1', 1, 2],
      ['deep.2.array.2', 2, 3],
    ]);

    iteratee.mockClear();
    form.setValues({});

    expect(form.fieldMap('notfound', iteratee)).toEqual([]);
    expect(iteratee.mock.calls).toEqual([]);
  });


  test('Should be foreach field value', () => {
    const iteratee = jest.fn();
    const form = mockShallow(() => <div />).instance();

    form.setValues({
      foo: 'bar',
      hoge: 'fuga',
      key: 'value',
    });

    form.fieldForEach('*', iteratee);
    expect(iteratee.mock.calls).toEqual([
      ['foo', 'foo', 'bar'],
      ['hoge', 'hoge', 'fuga'],
      ['key', 'key', 'value'],
    ]);

    iteratee.mockClear();
    form.setValues({
      deep: {
        nest1: 'value1',
        nest2: 'value2',
        nest3: 'value3',
      },
    });

    form.fieldForEach('deep.*', iteratee);
    expect(iteratee.mock.calls).toEqual([
      ['deep.nest1', 'nest1', 'value1'],
      ['deep.nest2', 'nest2', 'value2'],
      ['deep.nest3', 'nest3', 'value3'],
    ]);

    iteratee.mockClear();
    form.setValues({
      array: [1, 2, 3],
    });

    form.fieldForEach('array.*', iteratee);
    expect(iteratee.mock.calls).toEqual([
      ['array.0', 0, 1],
      ['array.1', 1, 2],
      ['array.2', 2, 3],
    ]);

    iteratee.mockClear();
    form.setValues({
      deep: [
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
        { array: [1, 2, 3] },
      ],
    });

    form.fieldForEach('deep.*.array.*', iteratee);
    expect(iteratee.mock.calls).toEqual([
      ['deep.0.array.0', 0, 1],
      ['deep.0.array.1', 1, 2],
      ['deep.0.array.2', 2, 3],
      ['deep.1.array.0', 0, 1],
      ['deep.1.array.1', 1, 2],
      ['deep.1.array.2', 2, 3],
      ['deep.2.array.0', 0, 1],
      ['deep.2.array.1', 1, 2],
      ['deep.2.array.2', 2, 3],
    ]);

    iteratee.mockClear();
    form.setValues({});

    form.fieldForEach('notfound', iteratee);
    expect(iteratee.mock.calls).toEqual([]);
  });


  test('Should be return validate status', () => {
    const form = mockShallow(() => <div />).instance();
    let isValid;

    isValid = jest.fn(() => false);
    form.validator.isValid = isValid;
    expect(form.fieldValid('foo')).toBe(false);
    expect(isValid.mock.calls).toEqual([['foo']]);

    isValid = jest.fn(() => true);
    form.validator.isValid = isValid;
    expect(form.fieldValid('bar')).toBe(true);
    expect(isValid.mock.calls).toEqual([['bar']]);
  });


  test('Should be return validating status', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    expect(form.fieldValidating('foo')).toBe(false);

    wrapper.setState({ validating: ['foo'] });

    expect(form.fieldValidating('foo')).toBe(true);

    wrapper.setState({ validating: [] });

    expect(form.fieldValidating('foo')).toBe(false);
  });


  test('Should be validate all fields', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();
    let validate;
    let getErrors;

    validate = jest.fn(() => true);
    getErrors = jest.fn(() => ({}));
    form.validator.validate = validate;
    form.validator.getAllErrorMessages = getErrors;
    expect(form.validate()).toBe(true);
    expect(wrapper.state('errors')).toEqual({});
    expect(validate.mock.calls.length).toBe(1);
    expect(getErrors.mock.calls.length).toBe(1);

    validate = jest.fn(() => false);
    getErrors = jest.fn(() => ({ key: ['value'] }));
    form.validator.validate = validate;
    form.validator.getAllErrorMessages = getErrors;
    expect(form.validate()).toBe(false);
    expect(wrapper.state('errors')).toEqual({ key: ['value'] });
    expect(validate.mock.calls.length).toBe(1);
    expect(getErrors.mock.calls.length).toBe(1);
  });


  test('Should be handle success async validation', () => {
    expect.assertions(5);

    const asyncValidate = jest.fn(() => Promise.resolve());
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    wrapper.setState({
      validating: ['hoge', 'fuga'],
      errors: {},
    });

    form.validator.asyncValidate = asyncValidate;

    form.asyncValidate('foo').then(() => {
      wrapper.update();
      expect(wrapper.state('validating')).toEqual(['hoge', 'fuga']);
      expect(wrapper.state('errors')).toEqual({});
    });

    expect(asyncValidate.mock.calls).toEqual([['foo']]);
    expect(wrapper.state('validating')).toEqual(['hoge', 'fuga', 'foo']);
    expect(wrapper.state('errors')).toEqual({});
  });


  test('Should be handle failure async validation', () => {
    expect.assertions(5);

    const asyncValidate = jest.fn(() => Promise.reject());
    const getErrors = jest.fn(() => ({ key: [1, 2, 3] }));
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();

    wrapper.setState({
      validating: ['hoge', 'fuga'],
      errors: {},
    });

    form.validator.asyncValidate = asyncValidate;
    form.validator.getAllErrorMessages = getErrors;

    form.asyncValidate('foo').catch(() => {
      wrapper.update();
      expect(wrapper.state('validating')).toEqual(['hoge', 'fuga']);
      expect(wrapper.state('errors')).toEqual({ key: [1, 2, 3] });
    });

    expect(asyncValidate.mock.calls).toEqual([['foo']]);
    expect(wrapper.state('validating')).toEqual(['hoge', 'fuga', 'foo']);
    expect(wrapper.state('errors')).toEqual({});
  });


  test('Should be normalize values', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();
    const normalize = jest.fn();
    let getValues;

    form.validator.normalize = normalize;

    getValues = jest.fn(() => ({ normalized: 'values' }));
    form.validator.getValues = getValues;
    form.normalize();
    expect(normalize.mock.calls).toEqual([
      [undefined],
    ]);
    expect(getValues.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({ normalized: 'values' });

    getValues = jest.fn(() => ({ key: 'value' }));
    form.validator.getValues = getValues;
    form.normalize('foo');
    expect(normalize.mock.calls).toEqual([
      [undefined],
      ['foo'],
    ]);
    expect(getValues.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({ key: 'value' });

    getValues = jest.fn(() => ({ k1: 'v1', k2: 'v2' }));
    form.validator.getValues = getValues;
    form.normalize(['foo', 'bar', 'baz']);
    expect(normalize.mock.calls).toEqual([
      [undefined],
      ['foo'],
      [['foo', 'bar', 'baz']],
    ]);
    expect(getValues.mock.calls.length).toBe(1);
    expect(wrapper.state('values')).toEqual({ k1: 'v1', k2: 'v2' });
  });


  test('Should be sync submit', () => {
    const onValidSubmit = jest.fn();
    const onInvalidSubmit = jest.fn();

    const wrapper = mockShallow(() => <div />, {
      onValidSubmit,
      onInvalidSubmit,
    });

    const form = wrapper.instance();
    const asyncValidate = jest.fn(() => Promise.resolve());
    let validate = jest.fn(() => true);
    let getAllErrorMessages = jest.fn(() => ({}));

    form.validator.validate = validate;
    form.validator.asyncValidate = asyncValidate;
    form.validator.getAllErrorMessages = getAllErrorMessages;

    form.register(mockField('foo'));
    form.register(mockField('bar'));
    form.register(mockField('hoge.fuga'));
    form.register(mockField('nest.array.0'));
    form.register(mockField('nest.array.1'));
    form.register(mockField('nest.array.2'));

    const values = {
      foo: 'foo',
      bar: 'bar',
      hoge: {
        fuga: 'fuga',
      },
      nest: {
        array: [1, 2, 3],
      },
    };

    wrapper.setState({
      touches: [],
      dirties: [],
      errors: {},
    });

    form.setValues(values);

    form.submit();

    const fields = [
      'foo',
      'bar',
      'hoge.fuga',
      'nest.array.0',
      'nest.array.1',
      'nest.array.2',
    ];

    expect(wrapper.state('touches')).toEqual(fields);
    expect(wrapper.state('dirties')).toEqual(fields);
    expect(wrapper.state('validating')).toEqual([]);
    expect(wrapper.state('errors')).toEqual({});
    expect(validate.mock.calls.length).toBe(1);
    expect(asyncValidate.mock.calls.length).toBe(0);
    expect(onValidSubmit.mock.calls.length).toBe(1);
    expect(onValidSubmit.mock.calls[0]).toEqual([values, form]);
    expect(onInvalidSubmit.mock.calls.length).toBe(0);

    validate = jest.fn(() => false);
    getAllErrorMessages = jest.fn(() => ({ key: 'value' }));
    form.validator.validate = validate;
    form.validator.getAllErrorMessages = getAllErrorMessages;

    wrapper.setState({
      touches: [],
      dirties: [],
      errors: {},
    });

    form.submit();

    expect(wrapper.state('touches')).toEqual(fields);
    expect(wrapper.state('dirties')).toEqual(fields);
    expect(wrapper.state('validating')).toEqual([]);
    expect(wrapper.state('errors')).toEqual({ key: 'value' });
    expect(validate.mock.calls.length).toBe(1);
    expect(asyncValidate.mock.calls.length).toBe(0);
    expect(onValidSubmit.mock.calls.length).toBe(1);
    expect(onInvalidSubmit.mock.calls.length).toBe(1);
    expect(onInvalidSubmit.mock.calls[0]).toEqual([values, form]);
  });


  test('Should be async submit', () => {
    const wrapper = mockShallow(() => <div />);
    const form = wrapper.instance();
    const validate = jest.fn(() => true);
    const asyncValidate = jest.fn(() => Promise.resolve());
    const getAllErrorMessages = jest.fn(() => ({}));

    form.validator.validate = validate;
    form.validator.asyncValidate = asyncValidate;
    form.validator.getAllErrorMessages = getAllErrorMessages;

    wrapper.setState({
      errors: {},
      validating: [],
    });

    form.submit();

    expect(wrapper.state('validating')).toEqual([]);
    expect(validate.mock.calls.length).toBe(1);
    expect(asyncValidate.mock.calls.length).toBe(0);

    // @TODO: async tests...
  });


  test('Should be handle submit', () => {
    const e = mockEvent();
    const submit = jest.fn();

    const form = mockShallow(() => <div />).instance();
    form.submit = submit;

    expect(submit.mock.calls.length).toBe(0);
    expect(e.stopPropagation.mock.calls.length).toBe(0);
    expect(e.preventDefault.mock.calls.length).toBe(0);

    form.handleSubmit(e);

    expect(submit.mock.calls.length).toBe(1);
    expect(e.stopPropagation.mock.calls.length).toBe(1);
    expect(e.preventDefault.mock.calls.length).toBe(1);
  });


  test('Should be handle clear', () => {
    const e = mockEvent();
    const clear = jest.fn();

    const form = mockShallow(() => <div />).instance();
    form.clear = clear;

    expect(clear.mock.calls.length).toBe(0);
    expect(e.stopPropagation.mock.calls.length).toBe(0);
    expect(e.preventDefault.mock.calls.length).toBe(0);

    form.handleClear(e);

    expect(clear.mock.calls.length).toBe(1);
    expect(e.stopPropagation.mock.calls.length).toBe(1);
    expect(e.preventDefault.mock.calls.length).toBe(1);
  });


  test('Should be handle reset', () => {
    const e = mockEvent();
    const reset = jest.fn();

    const form = mockShallow(() => <div />).instance();
    form.reset = reset;

    expect(reset.mock.calls.length).toBe(0);
    expect(e.stopPropagation.mock.calls.length).toBe(0);
    expect(e.preventDefault.mock.calls.length).toBe(0);

    form.handleReset(e);

    expect(reset.mock.calls.length).toBe(1);
    expect(e.stopPropagation.mock.calls.length).toBe(1);
    expect(e.preventDefault.mock.calls.length).toBe(1);
  });


  test('Should be pass form state and props', () => {
    const onChange = () => {};
    const onReset = () => {};
    const onClear = () => {};
    const onValidSubmit = () => {};
    const onInvalidSubmit = () => {};

    const wrapper = mockShallow(() => <div />, {
      onChange,
      onReset,
      onClear,
      onValidSubmit,
      onInvalidSubmit,
    });

    const form = wrapper.instance();
    const isValid = jest.fn(() => true);
    const isValidating = jest.fn(() => false);
    const isDirty = jest.fn(() => false);
    const isTouched = jest.fn(() => false);

    form.isValid = isValid;
    form.isValidating = isValidating;
    form.isDirty = isDirty;
    form.isTouched = isTouched;

    wrapper.setState({
      values: { key: 'value' },
      errors: { foo: { bar: 'error' } },
    });

    expect(wrapper.props()).toEqual({
      onChange,
      onReset,
      onClear,
      onValidSubmit,
      onInvalidSubmit,

      values: { key: 'value' },
      errors: { foo: { bar: 'error' } },

      status: {
        valid: true,
        invalid: false,
        touched: false,
        untouched: true,
        dirty: false,
        pristine: true,
        validating: false,
      },

      fields: {
        get: form.fieldGet,
        set: form.fieldSet,
        remove: form.fieldRemove,
        push: form.fieldPush,
        pop: form.fieldPop,
        shift: form.fieldShift,
        unshift: form.fieldUnshift,
        swap: form.fieldSwap,
        move: form.fieldMove,
        map: form.fieldMap,
        forEach: form.fieldForEach,
        isValid: form.fieldValid,
        isValidating: form.fieldValidating,
      },

      handlers: {
        onSubmit: form.handleSubmit,
        onClear: form.handleClear,
        onReset: form.handleReset,
      },
    });

    expect(isValid.mock.calls.length).toBe(1);
    expect(isValidating.mock.calls.length).toBe(1);
    expect(isDirty.mock.calls.length).toBe(1);
    expect(isTouched.mock.calls.length).toBe(1);
  });
});
