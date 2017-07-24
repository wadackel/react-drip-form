/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


const BasicForm = dripForm({
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
        I agree to the <a href="#">Terms of Use</a>
      </Checkbox>
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>
  </form>
));


export default class BasicFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Basic Form"
        location={location}
      >
        <p>
          It is an example of the most basic form with validation.<br />
          Even if we implement real-time validation with a large number of Fields, it is a good looking code!<br />
          And the point to admire is that the form component is Stateless.
        </p>
        <p>
          Each Field Component uses the <a href="#todo">react-drip-form-components</a> package.<br />
          Of course it is a simple design and easy to use, but it will be a reference for the implementation of custom Field Component.
        </p>
        <hr />

        <h3>Example:</h3>
        <BasicForm
          onChange={(v) => {
            this.setState({ values: v });
          }}
          onValidSubmit={(v) => {
            alert('See console');
            console.log(v);
          }}
        />
        <hr />

        <h3>Values:</h3>
        <Code language="javascript">{JSON.stringify(values, null, 2)}</Code>
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from 'react-drip-form-components';

const BasicForm = dripForm({
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
        I agree to the <a href="#">Terms of Use</a>
      </Checkbox>
    </div>

    <Button
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
