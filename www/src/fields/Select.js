/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
import { dripFormField } from '../../../src/';
import { colors } from './styles';

export const Select = ({
  input,
  props: {
    className,
    children,
    hiddenError = false,
    ...props
  },
  meta: {
    error,
    dirty,
    touched,
  },
}) => {
  const shouldDisplayError = !hiddenError && !!(error && dirty && touched);

  return (
    <div
      className={cx({
        'rdf-select': true,
      }, className)}
    >
      <style jsx>{`
        .rdf-select {
          display: block;
          position: relative;
          margin: 0;
          font-size: 1rem;
        }

        .rdf-select::after {
          display: block;
          position: absolute;
          right: 1em;
          top: 1.25em;
          z-index: 5;
          width: 0.5em;
          height: 0.5em;
          margin-top: -0.375em;
          border: 1px solid ${colors.primary};
          border-right: 0;
          border-top: 0;
          transform: rotate(-45deg);
          pointer-events: none;
          content: '';
        }

        .rdf-select__field {
          box-sizing: border-box;
          display: block;
          width: 100%;
          height: 2.5rem;
          appearance: none;
          margin: 0;
          padding: 0.2em 0.7em;
          border: 1px solid ${colors.grayLighter};
          border-radius: 3px;
          background: #fff;
          color: ${colors.grayDark};
          vertical-align: top;
          font-size: 1rem;
          font-family: inherit;
          box-shadow: none;
          transition-property: color, box-shadow, border;
          transition-duration: 55ms;
          transition-timing-function: ease-out;
        }

        .rdf-select__field:hover {
          border-color: ${colors.grayLight};
        }

        .rdf-select__field:focus {
          outline: none;
          border-color: ${colors.primary};
        }

        .rdf-select__field--error,
        .rdf-select__field--error:hover,
        .rdf-select__field--error:focus {
          border-color: ${colors.danger};
        }

        .rdf-select__error {
          display: block;
          margin: 0.2em 0 0;
          color: ${colors.danger};
          font-size: 0.85rem;
          line-height: 1.4;
        }
      `}</style>

      <select
        {...input}
        {...props}
        className={cx({
          'rdf-select__field': true,
          'rdf-select__field--error': shouldDisplayError,
        })}
      >
        {children}
      </select>

      {shouldDisplayError && <span className="rdf-select__error">{error}</span>}
    </div>
  );
};

export default dripFormField('select')(Select);
