import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-lime-grid';
import { Helmet, Navigation, Footer } from '../components/';
import { viewport } from '../constants';

const Content = styled.div`
  margin: 110px auto 0;

  & h1 {
    margin: 0 0 1em;
  }

  @media (${viewport.sm}) {
    margin-top: 90px;
    padding-left: 220px;
  }

  @media (${viewport.md}) {
    padding-left: 250px;
  }
`;

const Layout = ({ title, location, children, helmet }) => (
  <div>
    <Helmet title={title}>{helmet}</Helmet>

    <Navigation location={location} />

    <Content>
      <Container fluid style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1>{title}</h1>
        <div>
          {children}
        </div>
      </Container>

      <Footer fluid />
    </Content>
  </div>
);

export default Layout;
