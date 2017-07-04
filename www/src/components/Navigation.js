/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Logo, Humberger, Sidebar } from './';
import { viewport } from '../constants';

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
      <div className={`root ${open ? 'open' : ''}`}>
        <style jsx>{`
          .root {
          }

          .mobile-header {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 900;
            height: 60px;
            background: #fff;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);
          }

          .mobile-header > div {
            position: absolute;
            top: 0;
          }

          .mobile-header :global(a) {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 0 15px;
            height: 60px;
            color: #000;
            text-decoration: none;
          }

          .mobile-header :global(svg) {
            width: 16px;
            height: 24px;
          }

          .mobile-header span {
            display: block;
            padding-left: 10px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.75rem;
            font-weight: bold;
          }

          .toggle {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1001;
          }

          .sidebar {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            height: 100%;
            background: #fff;
            opacity: 0;
            visibility: hidden;
            transform: scale(1.02);
            filter: blur(4px);
            transition: all 220ms ease-out;
          }

          .root.open .sidebar {
            /* z-index: 1000; */
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
            visibility: visible;
          }

          @media (${viewport.sm}) {
            .mobile-header,
            .toggle {
              display: none;
            }

            .sidebar {
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
          }

          @media (${viewport.md}) {
            .sidebar {
              width: 250px;
            }
          }
        `}</style>

        <div className="mobile-header">
          <div>
            <Link to="/">
              <Logo />
              <span>react drip form</span>
            </Link>
          </div>
        </div>

        <div className="toggle">
          <Humberger
            active={open}
            onClick={this.handleClick}
          />
        </div>

        <div className="sidebar">
          <Sidebar open={open} />
        </div>
      </div>
    );
  }
}
