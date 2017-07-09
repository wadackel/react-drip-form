import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-lime-grid';
import { Helmet, Header, Footer, Logo, Demo, Code } from '../components/';
import { viewport } from '../constants';

const Hero = styled.div`
  margin: 180px 0;
  text-align: center;

  & div {
    line-height: 1;
  }

  & svg {
    width: 40px;
    height: 55px;
  }

  & h1 {
    margin: 10px 0 0;
    font-size: 1rem;
  }

  & p {
    margin: 10px 0 0;
    font-size: 0.68rem;
  }

  @media (${viewport.md}) {
    & svg {
      width: 50px;
      height: 67.5px;
    }

    & h1 {
      font-size: 1.75rem;
    }

    & p {
      font-size: 0.875rem;
    }
  }
`;

const Section = styled.section`
  margin: 180px 0;

  & h2 {
    font-size: 1.75rem;
  }

  @media (${viewport.md}) {
    & h2 {
      font-size: 2.25rem;
      text-align: center;
    }
  }
`;


/* eslint-disable */
const ComponentLink = styled.a`
  display: block;
  overflow: hidden;
  margin-top: 30px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #20c59d;
  }

  & img {
    vertical-align: top;
    transition: all 120ms ease-out;
  }

  &:hover img {
    opacity: 0.8;
  }

  & div {
    padding: 1.5em 1em;
  }

  & h3 {
    margin: 0;
    font-size: 1rem;
    transition: color 80ms ease-out;
  }

  & p {
    margin: 0;
    overflow: hidden;
    font-size: 0.75em;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a0a0a0 !important;
  }
`;

const ComponentItem = ({
  href,
  title,
  image,
}) => (
  <Col xs={12} sm={6} lg={4}>
    <ComponentLink
      href={href}
      title={title}
    >
      <img
        src={`./components/${image}`}
        alt={title}
        title={title}
      />
      <div>
        <h3>{title}</h3>
        <p>{href}</p>
      </div>
    </ComponentLink>
  </Col>
);


export default () => (
  <div>
    <Helmet title="Powerfully React forms state manager" />

    <Header />

    <Hero>
      <Container>
        <div>
          <Logo />
        </div>
        <h1>react drip form</h1>
        <p>Powerfully React forms state manager</p>
      </Container>
    </Hero>

    <Section>
      <Demo />
    </Section>

    <Section>
      <Container>
        <h2>Features</h2>
        <Row center="xs">
          <Col xs={12} md={8}>
            <ul>
              <li>HOC based API. (No magic, transparent and open API)</li>
              <li>Free component design. Integration with many UI frameworks.</li>
              <li>Rule based validation, and Provide many built-in rules.Support async and sync validation.</li>
              <li>Support normalization.</li>
              <li>Support Nest fields and Array fields.</li>
              <li>Customizable error message. (Support i18n)</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Section>

    <Section>
      <Container>
        <h2>Installation</h2>
        <Row center="xs">
          <Col xs={12} md={8}>
            <Code language="bash">{'$ npm install react-drip-form --save'}</Code>
          </Col>
        </Row>
      </Container>
    </Section>

    <Section>
      <Container>
        <h2>Components</h2>
        <Row center="xs" style={{ marginTop: -30 }}>
          <ComponentItem
            href="https://github.com/tsuyoshiwada/react-drip-form-components"
            title="Official UI Components"
            image="react-drip-form-components.png"
          />

          <ComponentItem
            href="https://github.com/tsuyoshiwada/react-drip-form-material-ui"
            title="Material-UI "
            image="react-drip-form-material-ui.png"
          />
        </Row>
      </Container>
    </Section>

    <Footer />
  </div>
);
