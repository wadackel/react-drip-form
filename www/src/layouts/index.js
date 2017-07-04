import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css';
/* eslint-enable import/no-extraneous-dependencies */
import 'normalize.css';
import '../css/style.css';

export default ({ children }) => (
  <div>
    {children()}
  </div>
);
