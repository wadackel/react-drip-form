![react-drip-form](https://raw.githubusercontent.com/tsuyoshiwada/react-drip-form/artwork/repo-banner.png)

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/react-drip-form.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/react-drip-form)
[![Codecov](https://img.shields.io/codecov/c/github/tsuyoshiwada/react-drip-form.svg?style=flat-square)](https://codecov.io/gh/tsuyoshiwada/react-drip-form)
[![npm version](https://img.shields.io/npm/v/react-drip-form.svg?style=flat-square)](http://badge.fury.io/js/react-drip-form)

> HoC based React forms state manager, Support for validation and normalization.

https://tsuyoshiwada.github.io/react-drip-form/




## Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
  * [Install](#install)
  * [Basic usage](#basic-usage)
    * [1. Create input field component](#1-create-input-field-component)
    * [2. Create form component](#2-create-form-component)
    * [3. Mount the Form component](#3-mount-the-form-component)
    * [4. Enjoy coffee break :coffee:](#4-enjoy-coffee-break-coffee)
* [Documentation](#documentation)
* [Related projects](#related-projects)
  * [Components](#components)
  * [Validator](#validator)
* [Contribute](#contribute)
* [License](#license)




## Features

* HOC based API. (No magic, transparent and open API)
* Free component design. Integration with many UI frameworks.
* Rule based validation, and Provide many built-in rules.
* Support async and sync validation.
* Support normalization.
* Support Nest fields and Array fields.
* Customizable error message. (Support i18n)




## Getting Started


### Install

```bash
$ npm install --save react-drip-form
```


### Basic usage


#### 1. Create field component

**Input.js**

```javascript
import React from 'react';
import { dripFormField } from 'react-drip-form';

const Input = ({
  input,
  props,
  meta: { error, dirty, touched },
}) => (
  <div>
    <input
      {...props}
      {...input}
    />
    {error && dirty && touched && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

export default dripFormField()(Input);
```


#### 2. Create form component

**Form.js**

```javascript
import React from 'react';
import { dripForm } from 'react-drip-form';
import Input from './Input';

const Form = ({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        id="email"
        type="email"
        name="email"
        label="Email-Address"
        placeholder="Enter your Email-Address"
      />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your Password"
      />
    </div>

    <button
      type="submit"
      disabled={invalid || pristine}
      onClick={handlers.onSubmit}
    >
      Submit
    </button>
  </form>
);

export default dripForm({
  validations: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  },
})(Form);
```


#### 3. Mount the Form component

**App.js**

```javascript
import React, { Component } from 'react';
import Form from './Form';

export default class App extends Component {
  // Get valid values.
  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onValidSubmit={this.handleSubmit} />
      </div>
    );
  }
}
```


#### 4. Enjoy coffee break :coffee:

Your work has complete!  
Let's enjoy coffee break slowly.



## Documentation

See [Document page](https://tsuyoshiwada.github.io/react-drip-form/).



## Related projects

### Components

* [TODO: Default Components](https://github.com/tsuyoshiwada/react-drip-form-components)
* [TODO: material-ui](https://github.com/callemall/material-ui)
* [TODO: react-toolbox](https://github.com/react-toolbox/react-toolbox)
* [TODO: react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
* [TODO: re-bulma](https://github.com/bokuweb/re-bulma)

### Validator

* [tsuyoshiwada/drip-form-validator](https://github.com/tsuyoshiwada/drip-form-validator)




## Contribute

1. Fork it!
1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -am 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Submit a pull request :D

Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/react-drip-form/issues).




## License

[MIT © tsuyoshiwada](./LICENSE)

