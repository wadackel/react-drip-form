/* eslint-disable no-alert */
import React, { Component } from 'react';
import { dripForm, Validator } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input } from '../../fields/';


// Simulate API
Validator.registerAsyncRule('checkValidAccount', value => new Promise((resolve, reject) => {
  const whiteList = ['foo', 'bar', 'baz'];

  setTimeout(() => {
    if (whiteList.indexOf(value) > -1) {
      resolve();
    } else {
      reject('Invalid account!');
    }
  }, 1000);
}));


const AsyncValidationForm = dripForm({
  validations: {
    username: {
      required: true,
      between: {
        min: 3,
        max: 30,
      },
      alphaNumeric: true,
      lowercase: true,
      checkValidAccount: true,
    },
    displayName: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine, validating },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
      />
    </div>

    <div>
      <label htmlFor="displayName">Display Name</label>
      <Input
        type="text"
        id="displayName"
        name="displayName"
        label="Display Name"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || validating}
    >
      Submit
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
        title="Async Validation"
        location={location}
      >
        <style jsx>{`
          :global(form > div) {
            margin-bottom: 1em;
          }

          :global(form > div > label) {
            display: block;
            margin: 0 0 0.2em;
            font-weight: bold;
          }
        `}</style>

        <p>
          This is an example of asynchronous validations.<br />
          <a href="https://github.com/tsuyoshiwada/drip-form-validator">drip-form-validator</a> can register asynchronous validation with the <code>registerAsyncRule()</code> method.
        </p>

        <p>Asynchronous validation is performed under the following conditions.</p>
        <ul>
          <li>If all synchronous verification corresponding to <code>name</code> has passed</li>
          <li>When the <code>input.onBlur()</code> was executed</li>
        </ul>

        <hr />

        <h3>Example:</h3>
        <AsyncValidationForm
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
        <Code language="javascript">{`import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';


// Simulate API
Validator.registerAsyncRule('checkValidAccount', value => new Promise((resolve, reject) => {
  const whiteList = ['foo', 'bar', 'baz'];

  setTimeout(() => {
    if (whiteList.indexOf(value) > -1) {
      resolve();
    } else {
      reject('Invalid account!');
    }
  }, 1000);
}));


const AsyncValidationForm = dripForm({
  validations: {
    username: {
      required: true,
      between: {
        min: 3,
        max: 30,
      },
      alphaNumeric: true,
      lowercase: true,
      checkValidAccount: true,
    },
    displayName: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine, validating },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
      />
    </div>

    <div>
      <label htmlFor="displayName">Display Name</label>
      <Input
        type="text"
        id="displayName"
        name="displayName"
        label="Display Name"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || validating}
    >
      Submit
    </Button>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
