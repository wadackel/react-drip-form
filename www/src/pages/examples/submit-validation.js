/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import { Input } from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


// Simulate API
const requestLogin = (email, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (email === 'example@mail.com' && password === 'passwd') {
      resolve();
    } else {
      reject();
    }
  }, 1000);
});


const SubmitValidationForm = dripForm()(({
  handlers,
  meta: { invalid, pristine },
  submitting,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        type="email"
        id="email"
        name="email"
        label="Email-Address"
        placeholder="enter-your-email@example.com"
        validations={{
          required: true,
          email: true,
        }}
      />
    </div>

    <div>
      <label htmlFor="email">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        validations={{
          required: true,
        }}
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || submitting}
    >
      {submitting ? 'Logging in...' : 'Login'}
    </Button>
  </form>
));


class MyComponent extends Component {
  state = {
    submitting: false,
  };

  handleInitialize = (form) => {
    this.form = form;
  };

  handleSubmit = ({ email, password }) => {
    this.setState({ submitting: true });

    requestLogin(email, password)
      .then(() => {
        this.setState({ submitting: false });
        this.form.clear();
        alert('Login succeeded!');
      })
      .catch(() => {
        this.form.setErrors({ email: 'Email-Address or password is incorrect.' });
        this.setState({ submitting: false });
      });
  };

  render() {
    return (
      <SubmitValidationForm
        {...this.props}
        submitting={this.state.submitting}
        onInitialize={this.handleInitialize}
        onValidSubmit={this.handleSubmit}
      />
    );
  }
}


export default class SubmitValidationFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Submit Validation"
        location={location}
      >
        <p>
          This is an example of executing validation after submitting.<br />
          The basic pattern is to get the form instance with <code>onInitialize</code> props and set the error with the <code>setErrors()</code> method.
        </p>

        <p>
          If you need to display the spinner during sending or if you need to disable the component, you can express it by giving the original props like <code>submitting</code>.
        </p>

        <hr />

        <h3>Example:</h3>
        <MyComponent
          onChange={v => this.setState({ values: v })}
        />
        <hr />

        <h3>Values:</h3>
        <Code language="javascript">{JSON.stringify(values, null, 2)}</Code>
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import { Input } from 'react-drip-form-components';


// Simulate API
const requestLogin = (email, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (email === 'example@mail.com' && password === 'passwd') {
      resolve();
    } else {
      reject();
    }
  }, 1000);
});


const SubmitValidationForm = dripForm()(({
  handlers,
  meta: { invalid, pristine },
  submitting,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        type="email"
        id="email"
        name="email"
        label="Email-Address"
        placeholder="enter-your-email@example.com"
        validations={{
          required: true,
          email: true,
        }}
      />
    </div>

    <div>
      <label htmlFor="email">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        validations={{
          required: true,
        }}
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || submitting}
    >
      {submitting ? 'Logging in...' : 'Login'}
    </Button>
  </form>
));


class MyComponent extends Component {
  state = {
    submitting: false,
  };

  handleInitialize = (form) => {
    this.form = form;
  };

  handleSubmit = ({ email, password }) => {
    this.setState({ submitting: true });

    requestLogin(email, password)
      .then(() => {
        this.setState({ submitting: false });
        this.form.clear();
        alert('Login succeeded!');
      })
      .catch(() => {
        this.form.setErrors({ email: 'Email-Address or password is incorrect.' });
        this.setState({ submitting: false });
      });
  };

  render() {
    return (
      <SubmitValidationForm
        {...this.props}
        submitting={this.state.submitting}
        onInitialize={this.handleInitialize}
        onValidSubmit={this.handleSubmit}
      />
    );
  }
}`}</Code>
      </Layout>
    );
  }
}
