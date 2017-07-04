/* eslint-disable react/prop-types */
import React from 'react';
import ReactHelmet from 'react-helmet';

const Helmet = props => (
  <ReactHelmet
    {...props}
    titleTemplate="%s - react drip form"
  />
);

export default Helmet;
