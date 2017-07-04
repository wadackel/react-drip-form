import React from 'react';
import { PrismCode } from 'react-prism';

const Code = ({ language, children }) => (
  <div className="root">
    <style jsx>{`
      pre,
      pre :global(code) {
        font-size: 0.875rem;
      }
    `}</style>

    <pre>
      <PrismCode className={`language-${language}`}>{children}</PrismCode>
    </pre>
  </div>
);

Code.defaultProps = {
  language: 'jsx',
};

export default Code;
