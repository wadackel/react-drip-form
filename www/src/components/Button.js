/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

const Button = ({
  children,
  className,
  small,
  primary,
  ...rest
}) => (
  <button
    {...rest}
    className={cx({
      root: true,
      primary,
      small,
    }, className)}
  >
    <style jsx>{`
      .root {
        display: inline-block;
        margin: 0;
        padding: 0.8em 2em;
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        background: transparent;
        color: inherit;
        font-size: 1rem;
        font-weight: normal;
        line-height: 1.4;
        cursor: pointer;
        transition: all 80ms ease-out;
      }

      .root:focus {
        outline: none;
      }

      .root:hover {
        background: rgba(0, 0, 0, 0.02);
      }

      .root:active {
        background: rgba(0, 0, 0, 0.04);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06) inset;
      }

      .root:disabled {
        opacity: 0.4;
        background: rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 0, 0, 0.04);
        cursor: not-allowed;
      }

      .root.primary {
        border: none;
        background: #20c59d;
        color: #fff;
        font-weight: bold;
      }

      .root.primary:hover {
        background: #1dad8a;
      }

      .root.primary:active {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16) inset;
        background: #1a9c7d;
      }

      .root.primary:disabled {
        background: #cacaca;
      }

      .root.small {
        font-size: 0.875rem;
      }
    `}</style>

    {children}
  </button>
);

export default Button;
