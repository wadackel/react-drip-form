---
title: dripFormGroup()
previous:
  link: /docs/api/drip-form-field/
  title: dripFormField()
next:
  link: /docs/api/validator/
  title: Validator
---


Wrap the field group component and provide Props related to the form.  
FieldGroup mainly contains multiple FieldComponent such as `checbox` and `radio`, but use it when you want to display single error.


## Table of Contents

* [Usage](#usage)
* [Options](#options)
* [Proxy Props](#proxy-props)
* [Props](#props)



---



## Usage

```javascript
import React from 'react';
import { dripFormGroup } from 'react-drip-form';

const FieldGroup = (props) => {
  /* field component */
};

export default dripFormGroup(/* options */)(FieldGroup);
```



---



## Options

All options are Optional.


### defaultProps

* **Type:** `Object`
* **Default:** `{}`

You can specify the default Props For the wrapped component.



---



## Proxy Props

Props other than `meta` are basically passed as is.


### meta

An object with properties with the following meta state.


#### meta.name

* **Type:** `string`

The `name` attribute of the field group.


#### meta.label

* **Type:** `string`

It is `label` of the field group.


#### meta.error

* **Type:** `string`

If there are multiple errors, it will be the first error.


#### meta.errors

* **Type:** `string[]`

All error strings held by the field group.


#### meta.valid

* **Type:** `boolean`

It is `true` if all validation associated with the field group is passed.


#### meta.invalid

* **Type:** `boolean`

The opposite of `meta.valid`.


#### meta.touched

* **Type:** `boolean`

`true` if the field group is touched even once.  
`input.onBlur()` is used to determine if you are touching.


#### meta.untouched

* **Type:** `boolean`

The opposite of `meta.untouched`.


#### meta.dirty

* **Type:** `boolean`

`true` if the value of any field group has been changed.


#### meta.pristine

* **Type:** `boolean`

The opposite of `meta.dirty`.


#### meta.validating

* **Type:** `boolean`

`true` if the field group is validating.



---



## Props

Components after wrapping can specify the following Props.


### multiple

* **Type:** `boolean`
* **Default:** `false`
* **Required:** `false`

If you need an array value like Checkbox, specify `true`.


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


### validations

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

You can specify a validation rule.  
Please refer to `drip-form-validator` [Built-in Rules](https://tsuyoshiwada.github.io/drip-form-validator/rules/) for specifiable rules.


### normalizers

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

You can specify Normalizers.  
Please refer to `drip-form-validator` [Built-in Normalizers](https://tsuyoshiwada.github.io/drip-form-validator/normalizers/) for specifiable rules.


### messages

* **Type:** `Object`
* **Default:** `null`
* **Required:** `false`

Specify the error message corresponding to the validation rule.

