import React from 'react';
import { Container, Row, Col } from 'react-lime-grid';
import { Helmet, Header, Footer, Logo, Demo, Code } from '../components/';
import { viewport } from '../constants';

export default () => (
  <div>
    <Helmet title="Powerfully React forms state manager" />
    <style jsx>{`
      .hero {
        margin: 180px 0;
        text-align: center;
      }

      .hero div {
        line-height: 1;
      }

      .hero :global(svg) {
        width: 40px;
        height: 55px;
      }

      .hero h1 {
        margin: 10px 0 0;
        font-size: 1rem;
      }

      .hero p {
        margin: 10px 0 0;
        font-size: 0.68rem;
      }

      section {
        margin: 180px 0;
      }

      section h2 {
        font-size: 1.75rem;
      }

      @media (${viewport.md}) {
        .hero :global(svg) {
          width: 50px;
          height: 67.5px;
        }

        .hero h1 {
          font-size: 1.75rem;
        }

        .hero p {
          font-size: 0.875rem;
        }

        section h2 {
          font-size: 2.25rem;
          text-align: center;
        }
      }
    `}</style>

    <Header />

    <div className="hero">
      <Container>
        <div>
          <Logo />
        </div>
        <h1>react drip form</h1>
        <p>Powerfully React forms state manager</p>
      </Container>
    </div>

    <section>
      <Demo />
    </section>

    <section>
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
    </section>

    <section>
      <Container>
        <h2>Installation</h2>
        <Row center="xs">
          <Col xs={12} md={8}>
            <Code language="bash">{'$ npm install react-drip-form --save'}</Code>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <h2>Components</h2>
        <p>TODO</p>
      </Container>
    </section>

    <Footer />
  </div>
);
