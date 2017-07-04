import React from 'react';

const Humberger = ({ active, ...rest }) => (
  <button
    {...rest}
    className={`root ${active ? 'active' : ''}`}
  >
    <style jsx>{`
      .root {
        display: block;
        position: relative;
        width: 60px;
        height: 60px;
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .root:focus {
        outline: none;
      }

      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 17px;
        width: 26px;
        height: 2px;
        background: #000;
        transition: all 220ms ease-out;
      }

      span:nth-child(1) {
        margin-top: -10px;
      }

      span:nth-child(2) {
        margin-top: -1px;
        transition-duration: 380ms;
      }

      span:nth-child(3) {
        margin-top: 7px;
      }

      .root.active span:nth-child(1) {
        transform: rotate(-135deg) translate(-5px, -7px) scale(0.9, 0.9);
      }

      .root.active span:nth-child(2) {
        opacity: 0;
        transform: rotate(0) translate(0, 0) scale(1.4, 0.6);
      }

      .root.active span:nth-child(3) {
        transform: rotate(-225deg) translate(-5px, 7px) scale(0.9, 0.9);
      }
    `}</style>

    <span />
    <span />
    <span />
  </button>
);

export default Humberger;
