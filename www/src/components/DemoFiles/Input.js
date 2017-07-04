/* eslint-disable react/prop-types */
import React from 'react';
import { dripFormField } from '../../../../lib/';

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
