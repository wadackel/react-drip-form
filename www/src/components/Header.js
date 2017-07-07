import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { viewport } from '../constants';

const Nav = styled.nav`
  & a {
    color: #000;
    text-decoration: none;
    transition: color 120ms ease-out;
  }

  & a:hover {
    color: #20c59d;
  }
`;

const List = styled.ul`
  position: absolute;
  top: 15px;
  left: 15px;
  margin: 0 -10px;
  padding: 0;
  list-style: none;
  font-size: 0;

  & li {
    display: inline-block;
    margin: 0 10px;
    font-size: 0.875rem;
  }

  @media (${viewport.md}) {
    top: 30px;
    left: 30px;

    & li {
      font-size: 1rem;
    }
  }
`;

const Header = () => (
  <header>
    <Nav>
      <List>
        <li><Link to="/docs/">DOCS</Link></li>
        <li><Link to="/docs/api/drip-form/">API</Link></li>
        <li><Link to="/examples/basic-form/">EXAMPLES</Link></li>
      </List>
    </Nav>
  </header>
);

export default Header;
