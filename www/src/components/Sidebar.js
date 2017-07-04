import React from 'react';
import Link from 'gatsby-link';
import { Logo } from './';
import { viewport } from '../constants';

const Sidebar = ({ open }) => (
  <div className={`root ${open ? 'open' : ''}`}>
    <style jsx>{`
      .header {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 2;
        background: #fff;
        height: 60px;
        border-bottom: 1px solid #f0f0f0;
      }

      .header :global(a) {
        display: none;
        transition: all 80ms ease-out;
      }

      .header :global(a):hover {
        letter-spacing: 0.05em;
      }

      .header :global(svg) {
        width: 20px;
        height: 28px;
      }

      .header div {
        margin: 3px 0 0;
        font-family: 'Poppins', sans-serif;
        font-size: 0.75rem;
      }

      .body {
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        padding: 0 0 40px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        font-size: 0.875em;
      }

      .body ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .body :global(a) {
        color: #000;
        text-decoration: none;
        transition: all 120ms ease-out;
      }

      .body :global(a):hover {
        color: #20c59d;
        background: rgba(0, 0, 0, 0.02);
      }

      .body > ul {
        padding-top: 10px;
      }

      .body > ul + ul {
        margin-top: 10px;
        border-top: 1px solid #f0f0f0;
      }

      .body > ul > li {
      }

      .body > ul > li > :global(a),
      .body > ul > li > span {
        display: block;
        padding: 15px 15px;
        font-weight: bold;
        line-height: 1.4;
      }

      .body > ul > li > span {
        color: #ccc;
      }

      .body li > ul {
        margin-bottom: 20px;
      }

      .body li > ul :global(a) {
        display: block;
        padding: 10px 15px 10px 30px;
      }

      @media (${viewport.sm}) {
        .header {
          height: auto;
        }

        .header :global(a) {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 120px;
          color: #000;
          text-align: center;
          text-decoration: none;
        }

        .body {
          top: 120px;
        }
      }
    `}</style>

    <div className="header">
      <Link to="/">
        <Logo />
        <div>react drip form</div>
      </Link>
    </div>

    <div className="body">
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li>
          <span>GUIDES</span>
          <ul>
            <li><Link to="/docs/">Quick Start</Link></li>
            <li><Link to="/docs/motivation/">Motivation</Link></li>
            <li><Link to="/docs/tutorial/">Tutorial</Link></li>
            <li><Link to="/docs/testing/">Testing</Link></li>
            <li><Link to="/docs/flow/">Flow</Link></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <span>API</span>
          <ul>
            <li><Link to="/docs/api/drip-form/">dripForm()</Link></li>
            <li><Link to="/docs/api/drip-form-field/">dripFormField()</Link></li>
            <li><Link to="/docs/api/drip-form-group/">dripFormGroup()</Link></li>
            <li><Link to="/docs/api/validator/">Validator</Link></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <span>DRIP-FORM-VALIDATOR</span>
          <ul>
            <li><a href="https://tsuyoshiwada.github.io/drip-form-validator/rules/">Built-in Rules</a></li>
            <li><a href="https://tsuyoshiwada.github.io/drip-form-validator/normalizers/">Built-in Normalizers</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <span>EXAMPLES</span>
          <ul>
            <li><Link to="/examples/basic-form/">Basic Form</Link></li>
            <li><Link to="/examples/clear-form/">Clear Form</Link></li>
            <li><Link to="/examples/reset-form/">Reset Form</Link></li>
            <li><Link to="/examples/nest-fields/">Nest Fields</Link></li>
            <li><Link to="/examples/field-level-validation/">Field Level Validation</Link></li>
            <li><Link to="/examples/submit-validation/">Submit Validation</Link></li>
            <li><Link to="/examples/async-validation/">Async Validation</Link></li>
            <li><Link to="/examples/normalizing/">Normalizing</Link></li>
            <li><Link to="/examples/i18n/">i18n</Link></li>
            <li><Link to="/examples/manual-submit/">Manual Submit</Link></li>
            <li><Link to="/examples/redux/">redux</Link></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <span>LINKS</span>
          <ul>
            <li><a href="https://github.com/tsuyoshiwada/react-drip-form">GitHub</a></li>
            <li><a href="https://www.npmjs.com/package/react-drip-form">npm</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
