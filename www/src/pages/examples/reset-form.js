/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Radio,
  Checkbox,
  Textarea,
} from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


const ResetForm = dripForm({
  validations: {
    name: {
      required: true,
      max: 32,
    },
    gender: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input type="text" id="username" name="username" />
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
      <label>Favorite Colors</label>
      <FieldGroup name="colors" multiple>
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="black">Black</Checkbox>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="pink">Pink</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="message">Message</label>
      <Textarea id="message" name="message" />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>

    {' '}

    <Button
      onClick={handlers.onReset}
      disabled={pristine}
    >
      Reset
    </Button>
  </form>
));


export default class ResetFormExample extends Component {
  state = {
    values: {
      username: 'tsuyoshiwada (initial value)',
      gender: 'female',
      colors: ['white', 'pink'],
      message: 'Did you like react-drip-form? (initial message)',
    },
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Reset Form"
        location={location}
      >
        <p>
          It is an example to reset the state of the form. Unlike <code>clear</code>, <code>reset</code> restores the initial value.<br />
          There are two ways to reset the state.
        </p>

        <ol>
          <li><code>props.handlers.onReset()</code></li>
          <li><code>form.reset()</code></li>
        </ol>

        <hr />

        <h3>Example:</h3>
        <ResetForm
          values={values}
          onChange={v => this.setState({ values: v })}
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
  Radio,
  Checkbox,
  Textarea,
} from 'react-drip-form-components';


const ResetForm = dripForm({
  validations: {
    name: {
      required: true,
      max: 32,
    },
    gender: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input type="text" id="username" name="username" />
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
      <label>Favorite Colors</label>
      <FieldGroup name="colors" multiple>
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="black">Black</Checkbox>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="pink">Pink</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="message">Message</label>
      <Textarea id="message" name="message" />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>

    {' '}

    <Button
      onClick={handlers.onReset}
      disabled={pristine}
    >
      Reset
    </Button>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
