import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  & span {
    display: block;
    position: absolute;
    top: 50%;
    left: 17px;
    width: 26px;
    height: 2px;
    background: #000;
    transition: all 220ms ease-out;
  }

  & span:nth-child(1) {
    margin-top: -10px;
    transform: ${props => props.active
      ? 'rotate(-135deg) translate(-5px, -7px) scale(0.9, 0.9)'
      : 'none'};
  }

  & span:nth-child(2) {
    margin-top: -1px;
    opacity: ${props => props.active
      ? '0'
      : '1'};
    transition-duration: 380ms;
    transform: ${props => props.active
      ? 'rotate(0) translate(0, 0) scale(1.4, 0.6)'
      : 'none'};
  }

  & span:nth-child(3) {
    margin-top: 7px;
    transform: ${props => props.active
      ? 'rotate(-225deg) translate(-5px, 7px) scale(0.9, 0.9)'
      : 'none'};
  }
`;

const Humberger = props => (
  <Button {...props}>
    <span />
    <span />
    <span />
  </Button>
);

export default Humberger;
