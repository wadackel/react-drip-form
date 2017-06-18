/* eslint-disable react/prop-types */
import React from 'react'; // eslint-disable-line
import { dripForm, dripFormField } from '../../../lib/';

const Input = dripFormField()(({
  input,
  props,
  status: { error, dirty, touched },
}) => (
  <div>
    <input
      {...props}
      {...input}
    />
    {error && dirty && touched && <span style={{ color: 'red' }}>{error}</span>}
  </div>
));

const SimpleForm = dripForm({
  validations: {
    username: {
      required: true,
      max: 10,
    },
    email: {
      required: true,
      email: 10,
    },
  },
})(({ handlers }) => (
  <form onSubmit={handlers.onSubmit}>
    <Input
      type="text"
      name="username"
      label="UserName"
    />

    <Input
      type="email"
      name="email"
      label="Email-Address"
    />

    <button onClick={handlers.onSubmit}>Submit</button>
    <button onClick={handlers.onClear}>Clear</button>
    <button onClick={handlers.onReset}>Reset</button>
  </form>
));

export default () => (
  <div>
    <h2>Home</h2>
    <p>home content...</p>

    <SimpleForm
      onValidSubmit={console.log}
      onInvalidSubmit={console.error}
    />
  </div>
);
