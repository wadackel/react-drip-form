import React from 'react';
import styled from 'styled-components';
import { PrismCode } from 'react-prism';

const Pre = styled.pre`
  font-size: 0.875rem;

  & code {
    font-size: 0.875rem;
  }
`;

const Code = ({ language, children }) => (
  <Pre>
    <PrismCode className={`language-${language}`}>{children}</PrismCode>
  </Pre>
);

Code.defaultProps = {
  language: 'jsx',
};

export default Code;
