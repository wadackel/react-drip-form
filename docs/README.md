---
title: Quick Start
---


## Setup Your Project

Let's create a very simple form using [Create React App](https://github.com/facebookincubator/create-react-app). If `create-react-app` is not installed, let's install it immediately.

```bash
$ npm install -g create-react-app
$ create-react-app my-app
$ cd my-app
```




## Installation

`react-drip-form` is published to npm.  
Install the stable version with the following command.

```bash
$ npm install --save react-drip-form
$ npm install --save react-drip-form-components
```

Although this is not required, we will use the [official UI](https://github.com/tsuyoshiwada/react-drip-form-components) component to build the form quickly.

If you are building a component with full scratch, see the [tutorial](./tutorial/).




## Create Simple Forms

Copy and paste the following code into `src/App.js` and run `npm start`.

```javascript
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  FieldGroup,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from 'react-drip-form-components';


const SampleForm = dripForm({
  validations: {
    name: {
      required: true,
      max: 32,
    },
    username: {
      required: true,
      max: 255,
      alphaNumeric: true,
    },
    email: {
      required: true,
      email: true,
    },
    emailConfirm: {
      same: 'email',
    },
    gender: {
      required: true,
    },
    job: {
      max: 3,
    },
    subject: {
      required: true,
    },
    confirm: {
      required: true,
    },
    message: {
      max: 500,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        id="name"
        name="name"
        label="Name"
      />
    </div>

    <div>
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
        placeholder="enter-your-username"
      />
    </div>

    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        type="email"
        id="email"
        name="email"
        label="Email-Address"
        placeholder="example@mail.com"
      />
    </div>

    <div>
      <label htmlFor="emailConfirm">Email-Address (Confirm)</label>
      <Input
        type="email"
        id="emailConfirm"
        name="emailConfirm"
        label="Email-Address (Confirm)"
      />
    </div>

    <div>
      <label>Gender</label>
      <FieldGroup name="gender">
        <Radio value="female">Female</Radio>
        <Radio value="male">Male</Radio>
        <Radio value="other">Other</Radio>
        <Radio value="none">Rather not say</Radio>
      </FieldGroup>
    </div>

    <div>
      <label>Job (Optional)</label>
      <FieldGroup name="job" multiple>
        <Checkbox value="frontend-engineer">Front-end Engineer</Checkbox>
        <Checkbox value="backend-engineer">Back-end Engineer</Checkbox>
        <Checkbox value="software-engineer">Software Engineer</Checkbox>
        <Checkbox value="ui-designer">UI Designer</Checkbox>
        <Checkbox value="ux-designer">UX Designer</Checkbox>
        <Checkbox value="graphic-designer">Graphic Designer</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="subject">Subject</label>
      <Select
        id="subject"
        name="subject"
        label="Subject"
      >
        <option value="">Please select a subject</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>

    <div>
      <label htmlFor="message">Message (Optional)</label>
      <Textarea
        id="message"
        name="message"
        label="Message"
      />
    </div>

    <div>
      <Checkbox
        name="confirm"
        value="yes"
      >
        I agree to the <a href="/">Terms of Use</a>
      </Checkbox>
    </div>

    <button
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </button>
  </form>
));


export default class App extends Component {
  handleSubmit = (values) => {
    console.log('onValidSubmit()', values);
  };

  render() {
    return (
      <div
        style={{
          maxWidth: 740,
          width: '100%',
          margin: '0 auto',
          padding: '60px 20px',
        }}
      >
        <SampleForm onValidSubmit={this.handleSubmit} />
      </div>
    );
  }
}
```

A very simple form has been completed!


---

We encourage you to look at [Examples](../examples/basic-form/) to use `react-drip-form` deeper!

