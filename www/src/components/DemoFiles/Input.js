import React from 'react';
import { dripFormField } from '../../../../lib/';

const Input = ({
  input,
  meta: { error, dirty, touched },
  ...rest
}) => (
  <div>
    <input
      {...rest}
      {...input}
    />
    {error && dirty && touched && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

export default dripFormField()(Input);
