import React from 'react';
import { dripForm } from '../../../../lib/';
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
