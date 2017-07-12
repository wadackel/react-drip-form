---
title: dripFormField()
previous:
  link: /docs/api/drip-form/
  title: dripForm()
next:
  link: /docs/api/drip-form-group/
  title: dripFormGroup()
---


Wrap the field component and provide Props related to the form.




## Table of Contents

* [Usage](#usage)
* [Type](#type)
* [Options](#options)
* [Proxy Props](#proxy-props)
* [Props](#props)



---



## Usage

```javascript
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Field = (props) => {
  /* field component */
};

export default dripFormField(type, options)(Field);
```



---



## Type

* **Type:** `string`
* **Default:** `'text'`

Specify the type of the field.  It is used when handling values.  
The types that can be specified are as follows.

* `'text'`
* `'checkbox'`
* `'radio'`
* `'select'`
* ... The rest are types that can be specified with `input[type='***']`.

> **Note:** In Type such as checkbox, radio, select etc. value handling is special, so if `type` is not specified, it will not behave as expected.



---


## options

An object with the following properties.


### defaultProps

* **Type:** `Object`
* **Default:** `{}`

You can specify the default Props For the wrapped component.



---



## Proxy Props

List of Props provided for wrapped components.  
Apart from `input` and` meta`, Props passed to the field component is passed as is.


### input

An object with properties with the following field state.  
Essentially all properties are Props which you need to assign to the field component.


#### input.name

* **Type:** `string`

The `name` attribute of the field.


#### input.value

* **Type:** `any`

The value of the field.


#### input.checked

* **Type:** `boolean`
* **Optional:** `true`

A boolean indicating whether the field is checked.  
It exists only if `type` is` radio` or `checkbox`.


#### input.onChange(e: any): void

It is a function for detecting change of a field.  
Give the Event object or the changed value as argument.


#### input.onFocus(e: any): void

It is a function for detecting the focus of the field.


#### input.onBlur(e: nay): void

It is a function for detecting blur in the field.


### meta

An object with properties with the following meta state.


#### meta.label

* **Type:** `string`

It is `label` of the field.


#### meta.error

* **Type:** `string`

If there are multiple errors, it will be the first error.


#### meta.errors

* **Type:** `string[]`

All error strings held by the field.


#### meta.valid

* **Type:** `boolean`

It is `true` if all validation associated with the field is passed.


#### meta.invalid

* **Type:** `boolean`

The opposite of `meta.valid`.


#### meta.touched

* **Type:** `boolean`

`true` if the field is touched even once.  
`input.onBlur()` is used to determine if you are touching.


#### meta.untouched

* **Type:** `boolean`

The opposite of `meta.untouched`.


#### meta.dirty

* **Type:** `boolean`

`true` if the value of any field has been changed.


#### meta.pristine

* **Type:** `boolean`

The opposite of `meta.dirty`.


#### meta.validating

* **Type:** `boolean`

`true` if the field is validating.



---



## Props

Components after wrapping can specify the following Props.  
All other than Props below are passed directly to Props.


### name

* **Type:** `string`
* **Required:** `true`

A string representing the name of the field.  
The string specified here will be used as a subscript to `values`.


### value

* **Type:** `any`
* **Required:** `false`

Specify the value of the field.  
The value specified here will be used as the initial value.  
Also, if it is detected that `componentWillReceiveProps()` is not equivalent, overwrite the current form value.


### label

* **Type:** `string`
* **Default:** `null`
* **Required:** `false`

Specify the label of the field. It is mainly used in error messages.


### parser

* **Type:** `(value: any, name: string): any`
* **Default:** `null`
* **Required:** `false`

Specify a function for parsing the handled value.  
It is called after `input.onChange ()` is executed.


### formatter

* **Type:** `(value: any, name: string): any`
* **Default:** `(value: any): any => value == null ? '' : value`
* **Required:** `false`

Specify the function that formats the value used for display.  
It is called with `render ()`. (It is just before passing it to Props of WrappedComponent)


### validations

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

You can specify a validation rule.  
Please refer to `drip-form-validator` [Built-in Rules](https://tsuyoshiwada.github.io/drip-form-validator/rules/) for specifiable rules.

```javascript
<Field
  name="username"
  validations={{
    required: true,
    max: 255,
  }}
/>
```


### normalizers

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

You can specify Normalizers.  
Please refer to `drip-form-validator` [Built-in Normalizers](https://tsuyoshiwada.github.io/drip-form-validator/normalizers/) for specifiable rules.

```javascript
<Field
  name="rating"
  normalizers={{
    between: {
      min: 0,
      max: 100,
    },
  }}
/>
```


### messages

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

Specify the error message corresponding to the validation rule.

```javascript
<Field
  name="username"
  messages={{
    required: 'Username is required!',
  }}
/>
```


### onChange

* **Type:** `Function`
* **Default:** `null`
* **Required:** `false`

Called when the value of the field has changed. (After executing `input.onChange ()`)


### onBlur

* **Type:** `Function`
* **Default:** `null`
* **Required:** `false`

Called when the field is out of focus. (After executing `input.onBlur ()`)


### onFocus

* **Type:** `Function`
* **Default:** `null`
* **Required:** `false`

Called when the field is focused. (After executing `input.onFocus()`)

