import React from 'react';
import Link from 'gatsby-link';
import { viewport } from '../constants';

const Header = () => (
  <header>
    <style jsx>{`
      nav :global(a) {
        color: #000;
        text-decoration: none;
        transition: color 120ms ease-out;
      }

      nav :global(a):hover {
        color: #20c59d;
      }

      .list {
        position: absolute;
        top: 15px;
        margin: 0 -10px;
        padding: 0;
        list-style: none;
        font-size: 0;
      }

      .list li {
        display: inline-block;
        margin: 0 10px;
        font-size: 0.875rem;
      }

      .list-left {
        left: 15px;
      }

      .list-right {
        right: 15px;
      }

      @media (${viewport.md}) {
        .list {
          top: 30px;
        }

        .list li {
          font-size: 1rem;
        }

        .list-left {
          left: 30px;
        }

        .list-right {
          right: 30px;
        }
      }
    `}</style>
    <nav>
      <ul className="list list-left">
        <li><Link to="/docs/">DOCS</Link></li>
        <li><Link to="/docs/api/drip-form/">API</Link></li>
        <li><Link to="/examples/basic-form/">EXAMPLES</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
