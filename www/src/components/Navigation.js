import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { Logo, Humberger, Sidebar } from './';
import { viewport } from '../constants';

const MobileHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 900;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);

  > div {
    position: absolute;
    top: 0;
  }

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 15px;
    height: 60px;
    color: #000;
    text-decoration: none;
  }

  & svg {
    width: 16px;
    height: 24px;
  }

  & span {
    display: block;
    padding-left: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
  }

  @media (${viewport.sm}) {
    display: none;
  }
`;

const Toggle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;

  @media (${viewport.sm}) {
    display: none;
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background: #fff;
  opacity: ${props => props.open
    ? '1'
    : '0'};
  visibility: ${props => props.open
    ? 'visible'
    : 'hidden'};
  transform: ${props => props.open
    ? 'scale(1.02)'
    : 'scale(1)'};
  filter: ${props => props.open
    ? 'blur(0)'
    : 'blur(4px)'};
  transition: all 220ms ease-out;

  @media (${viewport.sm}) {
    display: block;
    right: auto;
    z-index: 1000;
    width: 220px;
    border-right: 1px solid #f0f0f0;
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    visibility: visible;
    transition: none;
  }

  @media (${viewport.md}) {
    width: 250px;
  }
`;

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      pathname: props.location.pathname,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: _pathname } = this.props.location;
    const { pathname } = nextProps.location;

    if (pathname !== _pathname) {
      this.setState({
        open: false,
        pathname,
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <MobileHeader>
          <div>
            <Link to="/">
              <Logo />
              <span>react drip form</span>
            </Link>
          </div>
        </MobileHeader>

        <Toggle>
          <Humberger
            active={open}
            onClick={this.handleClick}
          />
        </Toggle>

        <SidebarWrapper open={open}>
          <Sidebar open={open} />
        </SidebarWrapper>
      </div>
    );
  }
}
