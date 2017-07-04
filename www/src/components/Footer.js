/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import Link from 'gatsby-link';
import { Container, Row, Col } from 'react-lime-grid';
import { Logo } from './';
import { viewport } from '../constants';

const Footer = ({ fluid }) => (
  <footer className="root">
    <style jsx>{`
      .root {
        margin: 180px 0 0;
        padding: 50px 0;
        background: #000;
        color: #777;
      }

      ul {
        margin: 0 0 30px;
        padding: 0;
        list-style: none;
        font-size: 0;
        text-align: center;
      }

      li {
        display: inline-block;
        font-size: 0.875rem;
      }

      li:not(:first-child) {
        margin-left: 10px;
      }

      .root :global(a) {
        color: inherit;
        text-decoration: none;
        transition: color 120ms ease-out;
      }

      .root :global(a):hover {
        color: #fff;
      }

      .root :global(.footer-col-logo) {
        text-align: center;
        line-height: 1;
      }

      .root :global(.logo) {
        width: 24px;
        height: 32px;
      }

      .copyright {
        margin: 30px 0 0;
        font-size: 0.875rem;
        text-align: center;
      }

      @media (${viewport.lg}) {
        .root {
          padding: 100px 0;
        }

        ul {
          margin: 0;
          text-align: left;
        }

        li:not(:first-child) {
          margin-left: 15px;
        }

        .root :global(.logo) {
          width: 36px;
          height: 48px;
        }

        .copyright {
          margin: 0;
          text-align: right;
        }
      }
    `}</style>

    <Container fluid={fluid} style={{ maxWidth: fluid ? 960 : '100%', margin: '0 auto' }}>
      <Row middle="xs" between="xs">
        <Col xs={12} lg={5}>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/docs/">DOCS</Link></li>
            <li><Link to="/docs/api/drip-form/">API</Link></li>
            <li><Link to="/examples/basic-form/">EXAMPLES</Link></li>
            <li><a href="https://github.com/tsuyoshiwada/react-drip-form">GitHub</a></li>
          </ul>
        </Col>
        <Col xs={12} lg={2} className="footer-col-logo">
          <Logo
            className="logo"
            white
          />
        </Col>
        <Col xs={12} lg={5}>
          <p className="copyright">© 2017 tsuyoshiwada.<br />react drip form Release under the MIT.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

Footer.defaultProps = {
  fluid: false,
};

export default Footer;
