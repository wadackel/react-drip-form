---
title: Tutorial
previous:
  link: /docs/motivation/
  title: Motivation
next:
  link: /docs/testing/
  title: Testing
---


## Intro

This is a tutorial to build forms with full scratch.  
Create various field components such as `radio`, `checkbox`, and `select`.

This tutorial works with [create-react-app](https://github.com/facebookincubator/create-react-app).



## Create FieldComponent

Create a FieldComponent to be included in the form.  
Use `dripFormField()` to create a FieldComponent.

FieldComponent defines the component using `input`, `meta`, passed via Hoc.  
Let's check the API of [dripFormField()](../api/drip-form-field/) for details.


### Text

FieldComponent handling text is the most basic one.

Let's do the minimum implementation.

```javascript
// Input.js
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Input = ({ input, meta, ...props }) => (
  <input
    {...input}
    {...props}
  />
);

export default dripFormField()(Input);
```

FieldComponent has been completed which automatically binds values with just this code!  
However, we can not display errors with the previous code.

Let's implement an error indication.

```javascript
// Input.js
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Input = ({ input, meta, ...props }) => (
  <div>
    <input
      {...input}
      {...props}
    />
    {meta.error && meta.touched && meta.dirty &&
      <span style={{ color: 'red' }}>{meta.error}</span>
    }
  </div>
);

export default dripFormField()(Input);
```

Used `meta` for the first time here.  
This contains information on the state of the FieldComponent. (Such as `error` and `dirty`)

Afterwards if you do styling as you like it is complete!


### Checkbox

The basic way of making is the same as before.  
There is one point difference. `type` must be specified as the first argument of `dripFormField()`.

```javascript
// Checkbox.js
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Checkbox = ({ input, meta, ...props }) => (
  <span>
    <input
      {...input}
      {...props}
      type="checkbox"
    />
    {meta.error && meta.touched && meta.dirty &&
      <span style={{ color: 'red' }}>{meta.error}</span>
    }
  </span>
);

export default dripFormField('checkbox')(Checkbox);
```

This is because the value handling differs internally...  
We welcome PR at any time if there is an improvement plan!


### Radio

There is nothing special except specifying `type` just like Checkbox.

```javascript
// Radio.js
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Radio = ({ input, meta, ...props }) => (
  <span>
    <input
      {...input}
      {...props}
      type="radio"
    />
    {meta.error && meta.touched && meta.dirty &&
      <span style={{ color: 'red' }}>{meta.error}</span>
    }
  </span>
);

export default dripFormField('radio')(Radio);
```


### Select

I do not need explanation anymore!

```javascript
// Select.js
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Select = ({
  input,
  meta,
  children,
  ...props
}) => (
  <div>
    <select
      {...input}
      {...props}
    >
      {children}
    </select>
    {meta.error && meta.touched && meta.dirty &&
      <span style={{ color: 'red' }}>{meta.error}</span>
    }
  </div>
);

export default dripFormField('select')(Select);
```



## Create FieldGroup Component

FieldGroup mainly contains multiple FieldComponent such as `checbox` and `radio`, but use it when you want to display single error.  
To create it use [dripFormGroup()](../api/drip-form-group/).

```javascript
// FieldGroup.js
import React from 'react';
import { dripFormGroup } from 'react-drip-form';

const FieldGroup = ({ meta, children, ...props }) => (
  <div {...props}>
    {children}
    {meta.error && meta.touched && meta.dirty &&
      <span style={{ color: 'red' }}>{meta.error}</span>
    }
  </div>
);

export default dripFormGroup()(FieldGroup);
```

Just by displaying an error based on the value passed to `meta` props, it is not much different from the normal ReactComponent with respect to other parts.



## Create Form Component

Finally, we build a form using FieldComponent and FieldGroup we have created so far!

```javascript
// App.js
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import Input from './Input';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';
import FieldGroup from './FieldGroup';

const validations = {
  username: { required: true },
  email: { required: true, email: true },
  gender: { required: true },
  colors: { required: true, max: 2 },
  language: { required: true },
};

const SimpleForm = ({ handlers }) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label>Username</label>
      <Input type="text" name="username" />
    </div>

    <div>
      <label>Email-Address</label>
      <Input type="email" name="email" />
    </div>

    <div>
      <label>Gender</label>
      <FieldGroup name="gender">
        <div>
          <Radio id="gender-female" value="female" />
          <label htmlFor="gender-female">Female</label>
        </div>
        <div>
          <Radio id="gender-male" value="male" />
          <label htmlFor="gender-male">Male</label>
        </div>
        <div>
          <Radio id="gender-other" value="other" />
          <label htmlFor="gender-other">Other</label>
        </div>
        <div>
          <Radio id="gender-none" value="Rather not say" />
          <label htmlFor="gender-none">Other</label>
        </div>
      </FieldGroup>
    </div>

    <div>
      <label>Favorite Colors</label>
      {/* Note: If the value is an array, specify the `multiple` attribute! */}
      <FieldGroup name="colors" multiple>
        <div>
          <Checkbox id="colors-red" value="red" />
          <label htmlFor="colors-red">Red</label>
        </div>
        <div>
          <Checkbox id="colors-blue" value="blue" />
          <label htmlFor="colors-blue">Blue</label>
        </div>
        <div>
          <Checkbox id="colors-green" value="green" />
          <label htmlFor="colors-green">Green</label>
        </div>
      </FieldGroup>
    </div>

    <div>
      <Select name="language">
        <option value="">Select your language</option>
        <option value="en-us">English (UK)</option>
        <option value="en-uk">English (UK)</option>
        <option value="ja">Japanese</option>
      </Select>
    </div>

    <div>
      <button onClick={handlers.onSubmit}>Submit!</button>
    </div>
  </form>
);

const EnhancedForm = dripForm({
  validations,
})(SimpleForm);

export default class App extends Component {
  handleSubmit = (values) => {
    console.log('This is valid values!!', values);
  };

  render() {
    return (
      <EnhancedForm
        onValidSubmit={this.handleSubmit}
      />
    );
  }
}
```

![Tutorial Demo](./images/tutorial.gif)

The form worked!

---

Please check the [API](../api/drip-form/) to make more use of `react-drip-form`!

