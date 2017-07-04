/* eslint-disable react/prop-types */
import React from 'react';

const VirtualWindow = ({ children }) => (
  <div className="root">
    <style jsx>{`
      .root {
        padding: 20px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 3px;
      }

      .title-bar {
        margin: -10px -4px 10px;
      }

      .title-bar span {
        display: inline-block;
        margin: 0 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .title-bar span:nth-child(1) {
        background: #ff5f57;
      }

      .title-bar span:nth-child(2) {
        background: #ffc330;
      }

      .title-bar span:nth-child(3) {
        background: #29c941;
      }

      .content {
        margin: 0;
      }
    `}</style>
    <div className="title-bar">
      <span />
      <span />
      <span />
    </div>

    <div className="content">
      {children}
    </div>
  </div>
);

export default VirtualWindow;
