import React from 'react';
import { Container } from 'react-lime-grid';
import { Helmet, Navigation, Footer } from '../components/';
import { viewport } from '../constants';

const Layout = ({ title, location, children, helmet }) => (
  <div className="root">
    <Helmet title={title}>{helmet}</Helmet>

    <style jsx>{`
      .content {
        margin: 110px auto 0;
      }

      .content h1 {
        margin: 0 0 1em;
      }

      @media (${viewport.sm}) {
        .content {
          margin-top: 90px;
          padding-left: 220px;
        }
      }

      @media (${viewport.md}) {
        .content {
          padding-left: 250px;
        }
      }
    `}</style>

    <Navigation location={location} />

    <div className="content">
      <Container fluid style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1>{title}</h1>
        <div>
          {children}
        </div>
      </Container>

      <Footer fluid />
    </div>
  </div>
);

export default Layout;
