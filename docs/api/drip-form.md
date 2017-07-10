---
title: dripForm()
previous:
  link: /docs/flow/
  title: Flow
next:
  link: /docs/api/drip-form-field/
  title: dripFormField()
---


Wrap the given Form component and provide Props related to the form.




## Table of Contents

* [Usage](#usage)
* [Options](#options)
* [Proxy Props](#proxy-props)
* [Props](#props)
* [Instance API](#instance-api)



---



## Usage

```javascript
import React from 'react';
import { dripForm } from 'react-drip-form';

const Form = (props) => {
  /* form component */
};

export default dripForm(/* options */)(Form);
```



---



## Options

All options are Optional.


### defaultProps

* **Type:** `Object`
* **Default:** `{}`

You can specify the default Props For the wrapped component.


### validations

* **Type:** `Object`
* **Default:** `{}`

You can specify a validation rule.

```javascript
dripForm({
  validations: {
    username: {
      required: true,
      max: 255,
    },
    userEmail: {
      required: true,
      email: true,
    },
  },
})(Form);
```

Please refer to `drip-form-validator` [Built-in Rules](https://tsuyoshiwada.github.io/drip-form-validator/rules/) for specifiable rules.


### normalizers

* **Type:** `Object`
* **Default:** `{}`

You can specify Normalizers.

```javascript
dripForm({
  normalizers: {
    age: {
      min: 18,
    },
  },
})(Form);
```

Please refer to `drip-form-validator` [Built-in Normalizers](https://tsuyoshiwada.github.io/drip-form-validator/normalizers/) for specifiable rules.


### messages

* **Type:** `Object`
* **Default:** `{}`

Specify the error message corresponding to the validation rule.

```javascript
dripForm({
  messages: {
    username: {
      required: 'The Username is required...',
      max: 'The Username is too long...',
    },
  },
})(Form);
```


### labels

* **Type:** `Object`
* **Default:** `{}`

Specify the label of the field. It is mainly used in error messages.

```javascript
dripForm({
  labels: {
    username: 'User Name',
    age: 'Age',
  },
})(Form);
```


### validateOnChange

* **Type:** `boolean`
* **Default:** `true`

Specify whether validation should be executed depending on field change.  
This is useful when real-time verification is unnecessary.

```javascript
dripForm({
  validateOnChange: false,
})(Form);
```


### validateOnBlur

* **Type:** `boolean`
* **Default:** `true`

Specify whether to perform validation according to the blur of the field.

```javascript
dripForm({
  validateOnBlur: false,
})(Form);
```


### normalizeOnChange

* **Type:** `boolean`
* **Default:** `true`

Specify whether normalize should be executed depending on field change.

```javascript
dripForm({
  normalizeOnChange: false,
})(Form);
```


### normalizeOnBlur

* **Type:** `boolean`
* **Default:** `true`

Specify whether to perform normalize according to the blur of the field.

```javascript
dripForm({
  normalizeOnBlur: false,
})(Form);
```



----



## Proxy Props

List of Props provided for wrapped components.  
All other than Props below are passed directly to Props.


### values

* **Type:** `Object`

It is a value with `name` of each field as a key.  
The signature is as follows.

```javascript
{
  username: 'value',
  nest: {
    deep: 'value',
  },
}
```


### errors

* **Type:** `Object`

It is a errors with `name` of each field as a key.  
The signature is as follows.

```javascript
{
  username: ['message1', 'message2'],
  'nest.deep': ['message1'],
}
```


### meta

An object with properties with the following form state.

#### meta.valid

* **Type:** `boolean`

If all validation passes, it is `true`.

#### meta.invalid

* **Type:** `boolean`

The opposite of `meta.valid`.

#### meta.touched

* **Type:** `boolean`

If you touch any field it is `true`.
`onBlur` is used to determine if you are touching.

#### meta.untouched

* **Type:** `boolean`

The opposite of `meta.touched`.

#### meta.dirty

* **Type:** `boolean`

`true` if the value of any field has been changed.

#### meta.pristine

* **Type:** `boolean`

The opposite of `meta.dirty`.

#### meta.validating

* **Type:** `boolean`

`true` if asynchronous validation is in progress.


### fields

An object for performing field operations with the following properties.

For nested objects, please use dot notation. In addition, use wildcards when including arrays.

```javascript
// nest
fields.get('nest.deep')

// nest + array
fields.get('nest.*.deep.key')
```

#### fields.get(field: string, defaultValue?: any): any

Retrieves the value of the specified field.

#### fields.set(field: string, value: any): void

Sets the value in the specified field.

#### fields.remove(field: string): void

Remove the value of the specified field.

#### fields.push(field: string, value: any): void

Adds a value to the specified field.  
It works only when the value is an array.

#### fields.pop(field: string): ?any

Removes the last element from the value of the specified field and returns that element.  
It works only when the value is an array.

#### fields.shift(field: string): ?any

Removes the first element from the value of the specified field and returns that element.  
It works only when the value is an array.

#### fields.unshift(field: string, ...values: any[]): void

Adds one or more elements to the beginning of the value of the specified field.  
It works only when the value is an array.

#### fields.swap(field: string, indexA: number, indexB: number): void

Swaps the value of the specified field.  
It works only when the value is an array.

#### fields.move(field: string, from: number, to: number): void

Move the value of the specified field.  
It works only when the value is an array.

#### fields.map(field: string, iteratee: Function): any[]

Call Iteratee on all elements for the value of the specified field and return a new array from the result.  
`iteratee` has the following signature:

```javascript
(path: string, index: string | number, value: any) => any
```

#### fields.forEach(field: string, iteratee: Function): void

Iteratee is executed for each element of the value of the specified field.  

`iteratee` has the following signature:

```javascript
(path: string, index: string | number, value: any) => void
```

#### fields.isValid(field: string): boolean

Returns as `boolean` whether the specified field is Valid.

#### fields.isValidating(field: string): boolean

Returns as `boolean` whether the specified field is validating.


### handlers

An object for event handling of forms with the following properties.

#### onSubmit(e?: Event): void

Handle `submit`. If Event is passed as an argument, `preventDefault()` is executed automatically.  
It internally calls the `clear()` method.

```javascript
const Form = ({ handlers }) => (
  <form onSubmit={handlers.onSubmit}>
    {/* More components */}
    <button onClick={handlers.onSubmit}>Submit</button>
  </form>
);
```

#### onClear(e?: Event): void

Handle `clear`. If Event is passed as an argument, `preventDefault()` is executed automatically.  
It internally calls the `clear()` method.

```javascript
const Form = ({ handlers }) => (
  <form>
    {/* More components */}
    <button onClick={handlers.onClear}>Clear values</button>
  </form>
);
```

#### onReset(e?: Event): void

Handle `reset`. If Event is passed as an argument, `preventDefault()` is executed automatically.  
It internally calls the `reset()` method.

```javascript
const Form = ({ handlers }) => (
  <form>
    {/* More components */}
    <button onClick={handlers.onReset}>Reset values</button>
  </form>
);
```



---



## Props

Components after wrapping can specify the following Props.  
All props are Optional.


### values

* **Type:** `Object`

Specify an object whose key is the `name` attribute of the field.  
Values set in `values` can also be used as initial values.  
Also, if it is detected that `componentWillReceiveProps()` is not equivalent, overwrite the current form value.

```javascript
<EnhancedForm
  values={{
    username: 'value',
    age: 18,
  }}
/>
```

### onInitialize(form: DripForm): void

`onInitialize()` is called in the constructor. A DripFom instance is passed as an argument.  
It is mainly used for obtaining DripForm instance.

```javascript
<EnhancedForm
  onInitialize={form => this.form = form}
/>
```

### onClear(form: DripForm): void

`onClear() is called if `clear()` or `handlers.onClear()` is called.

```javascript
<EnhancedForm
  onClear={() => console.log('Clear values')}
/>
```

### onValidSubmit(values: Object, form: DripForm): void

`onValidSubmit()` will be called if all validation passes after `submit()` or `handlers.onSubmit()` has been called.

```javascript
<EnhancedForm
  onValidSubmit={values => console.log('Valid Submit!', values)}
/>
```

### onInvalidSubmit(): void

`onInvalidSubmit()` will be called if at least one validation failed after `submit()` or `handlers.onSubmit()` was called.

```javascript
<EnhancedForm
  onInvalidSubmit={values => console.log('Invalid values...', values)}
/>
```




## Instance API

List of APIs of DripForm instance.  
You can get a DripForm instance using `onInitialize()` as follows.

```javascript
<EnhancedForm
  onInitialize={form => this.form = form}
/>
```


### getValues(): Object

It is a value with `name` of each field as a key.  

### setValues(values: Object): void

Specify an object whose key is the `name` attribute of the field.  

### initialValues(): Object

Get the initial value of the form.

### getErrors(): Object

It is a errors with `name` of each field as a key.  

### setErrors(Object): void

Specify an error with the field `name` attribute as a key.

```javascript
form.setErrors({
  // string
  username: 'Invalid username...',
  // or string array
  age: ['Too long...', 'Other error message'],
});
```

### getField(name: string): DripFormField

Gets a DripFormField instance with the specified `name` attribute.

### validate(): boolean

Perform validations.

### asyncValidate(name: string): Promise<void>

Performs asynchronous validation of fields with the specified `name` attribute.

### normalize(name?: string | string[]): void

Perform normalizing.

### submit(): void

Trigger Submit manually.

### clear(): void

Clear all values of the form.

### reset(): void

All values of the form are reset to their initial values.

