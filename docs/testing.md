---
title: Testing
previous:
  link: /docs/tutorial/
  title: Tutorial
next:
  link: /docs/flow/
  title: Flow
---


[enzyme]:https://github.com/airbnb/enzyme
[jest]:https://github.com/facebook/jest


## Table of Contents

* [Introduction](#introduction)
* [Form Component](#form-component)
* [Field Component](#field-component)
* [FieldGroup Component](#fieldgroup-component)



## Introduction

Since `react-drip-form` is a HoC based API, it can easily be tested by mocking Props.  
Here is an example of testing using [enzyme][enzyme] + [jest][jest].  
Of course, it is also possible to use other testing frameworks.


### First Step

As a first step let's export the components before wrapping in `Forms`, `Field`, `FieldGroup`, HoC respectively.

**Input.js**

```javascript
import { dripFormField } from 'react-drip-form';

// Use `named exports`, for pure component.
export const Input = ({ input, meta, ...rest }) => {
  /* field component .... */
};

export default dripFormField()(Input);
```


**Input.spec.js**

```javascript
import { Input } from './Input';

describe('<Input />', () => {
  test('Should be render control', () => {
    /* your testing ... */
  });
});
```


### Mocking

It is very easy to test using [react-drip-form-test-utils](https://github.com/tsuyoshiwada/react-drip-form-test-utils) to pass mocks to Context and Props.

```bash
$ npm install --save-dev react-drip-form-test-utils
```




## Form Component

We will test it from the `Form` component which is essential for building the form.  
The test target is the next simple component.

**Form.js**

```javascript
import React from 'react';
import { dripForm } from 'react-drip-form';
import Input from './Input';

export const Form = ({ handlers }) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <Input
        type="text"
        name="username"
        label="Username"
      />
    </div>
    <button onClick={handlers.onSubmit}>Submit</button>
  </form>
);

export default dripForm({
  validations: {
    username: {
      required: true,
    },
  },
})(Form);
```

For this `Form` component, we will perform the following tests.

* Rendering
* Handling of callback

Let's test whether the form will be rendered as expected.


### Rendering Test

Use `mockContext` and` mockFormProps` provided by `react-drip-form-test-utils` to mock Context and Props respectively.

**Form.spec.js**

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { mockContext, mockFormProps } from 'react-drip-form-test-utils';
import { Form } from '../Form';
import Input from '../Input';

describe('<Form />', () => {
  // Rendering tests
  test('Should be render forms', () => {
    const context = mockContext();
    const props = mockFormProps();
    const wrapper = shallow(<Form {...props} />, { context });

    expect(wrapper.contains(
      <Input
        type="text"
        name="username"
        label="Username"
      />
    )).toBe(true);
  });
});
```

You can do more detailed testing using the API provided by [enzyme][enzyme].  
See [enzyme][enzyme] for details.

The point here is that passing mocks to Context and Props makes it possible to test components that are not wrapped with `dripForm()`.



### Handling Test

Next, let's test whether `handlers.onSubmit()` is called as expected.

**Form.spec.js**

```javascript
describe('<Form />', () => {
  // ...

  // Handling tests
  test('Should be handle submit', () => {
    const onSubmit = jest.fn();

    const props = mockFormProps({
      handlers: {
        onSubmit,
      },
    });

    const wrapper = shallow(
      <Form {...props} />
    );

    expect(onSubmit.mock.calls.length).toBe(0);

    wrapper.find('button').simulate('click');

    expect(onSubmit.mock.calls.length).toBe(1);
  });
});
```

Passing a mock function to `handlers.onSubmit()` makes it easy to write tests.




## Field Component

The concept of Field components is similar to Forms components.  
The test target is the following components.

**Input.js**

```javascript
import React from 'react';
import { dripFormField } from 'react-drip-form';

export const Input = ({
  input,
  meta,
  ...props
}) => (
  <div>
    <input
      {...props}
      {...input}
    />
    {meta.error && meta.dirty && meta.touched &&
      <div className="error">{meta.error}</div>
    }
  </div>
);

export default dripFormField()(Input);
```


### Rendering Test

Unlike Forms, mock the field Props using `mockFieldProps`.

**Input.spec.js**

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { mockFieldProps } from 'react-drip-form-test-utils';
import { Input } from '../Input';

describe('<Input />', () => {
  // Rendering tests
  test('Should be render field', () => {
    const props = mockFieldProps();
    const wrapper = shallow(<Input {...props} />);

    const {
      input,
      meta,
      ...rest
    } = props;

    expect(wrapper.equals(
      <div>
        <input
          {...input}
          {...rest}
        />
      </div>
    )).toBe(true);
  });
});
```

Testing with Snapshot makes it easier to test.

**Input.spec.js**

```javascript
describe('<Input />', () => {
  // ...

  test('Should be render field', () => {
    const props = mockFieldProps();
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
```

Next test whether error text is displayed.

```javascript
describe('<Input />', () => {
  // ...

  test('Should be render error text', () => {
    const props = mockFieldProps({
      meta: {
        error: 'Error Text',
        dirty: true,
        touched: true,
      },
    });

    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.contains(
      <div className="error">Error Text</div>
    )).toBe(true);
  });
});
```



## FieldGroup Component

Test the following FieldGroup components.

```javascript
import React from 'react';
import { dripFormGroup } from 'react-drip-form';

export const FieldGroup = ({
  meta,
  children,
  ...props
}) => (
  <div {...props}>
    {children}
    {meta.error && meta.touched && meta.dirty &&
      <div className="error">{meta.error}</div>
    }
  </div>
);

export default dripFormGroup()(FieldGroup);
```


### Rendering Test

FieldGroup The easiest to test is ever. Except using `mockGroupProps` for Props' mock, you can test it just like a Field component.

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { mockGroupProps } from 'react-drip-form-test-utils';
import { FieldGroup } from '../FieldGroup';

describe('<FieldGroup />', () => {
  test('Should be render children', () => {
    const props = mockGroupProps();
    const element = <div className="child">Group Child</div>;

    const wrapper = shallow(
      <FieldGroup {...props}>
        {element}
      </FieldGroup>
    );

    expect(wrapper.contains(element)).toBe(true);
  });

  test('Should be render error text', () => {
    const props = mockGroupProps({
      meta: {
        error: 'Error Text',
        dirty: true,
        touched: true,
      },
    });

    const wrapper = shallow(<FieldGroup {...props} />);

    expect(wrapper.contains(
      <div className="error">Error Text</div>
    )).toBe(true);
  });
});
```


---


This is how we introduced a test method.  
Have a good testing life!

