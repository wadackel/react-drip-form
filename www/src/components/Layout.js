import React from 'react';
import Link from 'gatsby-link';
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


const StyledPageNavItem = styled.a`
  position: relative;
  flex-basis: ${props => props.isPrevious
    ? '60px'
    : 'calc(100% - 60px)'};
  max-width: ${props => props.isPrevious
    ? '60px'
    : 'calc(100% - 60px)'};
  padding: 2rem 20px;
  color: #000;
  font-size: ${props => props.isPrevious
    ? '0'
    : '1.2rem'};
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  transition: all 80ms ease-out;
  text-decoration: none;
  text-align: ${props => props.isPrevious
    ? 'left'
    : 'right'};

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  &::before {
    display: block;
    position: absolute;
    top: 50%;
    left: ${props => props.isPrevious
      ? '25px'
      : 'auto'};
    right: ${props => props.isPrevious
      ? 'auto'
      : '8px'};
    width: 8px;
    height: 8px;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    transform: ${props => props.isPrevious
      ? 'translateY(-50%) rotate(-135deg)'
      : 'translateY(-50%) rotate(45deg)'};
    content: "";
  }

  & span {
    display: block;
    color: #ccc;
    font-weight: normal;
    font-size: 0.6em;
    font-family: inherit;
    line-height: 1.2;
  }

  @media (${viewport.md}) {
    flex-basis: 50%;
    max-width: 50%;
    padding: 2rem;
    font-size: 1.2rem;
    border-left: ${props => props.isPrevious
      ? 'none'
      : '1px solid #f0f0f0'};

    &::before {
      right: ${props => props.isPrevious
        ? 'auto'
        : '15px'};
      left: ${props => props.isPrevious
        ? '15px'
        : 'auto'};
    }
  }
`;

const PageNavItemWrapper = StyledPageNavItem.withComponent(Link);

const PageNavItem = ({ isPrevious, link, title }) => (
  <PageNavItemWrapper
    isPrevious={isPrevious}
    to={link}
    title={title}
  >
    <span>{isPrevious ? 'Previous' : 'Next'}</span>
    {title}
  </PageNavItemWrapper>
);

const PageNav = styled.div`
  display: flex;
  align-items: stretch;
  margin: 8rem 0 -180px;
  border-top: 1px solid #f0f0f0;
`;


const Layout = ({
  title,
  previous,
  next,
  location,
  children,
  helmet,
}) => (
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

      {(previous || next) &&
        <PageNav>
          {previous &&
            <PageNavItem
              isPrevious
              link={previous.link}
              title={previous.title}
            />
          }
          {next &&
            <PageNavItem
              link={next.link}
              title={next.title}
            />
          }
        </PageNav>
      }
      <Footer fluid />
    </Content>
  </div>
);

export default Layout;
