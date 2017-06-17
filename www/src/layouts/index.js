/* eslint-disable react/prop-types */
import React from 'react'; // eslint-disable-line
import Link from 'gatsby-link';
import 'prismjs/themes/prism.css'; // eslint-disable-line

export default ({ children }) => (
  <div>
    <header>
      <h1>React Drip Form</h1>

      <nav>
        <Link to="/">Home</Link>
        {' '}
        <Link to="/test/">Test</Link>
        {' '}
        <Link to="/docs/">Docs</Link>
      </nav>
    </header>

    <div>
      {children()}
    </div>

    <footer>
      <p>footer</p>
    </footer>
  </div>
);
