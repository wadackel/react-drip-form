/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
import { dripFormField } from '../../../src/';
import { colors } from './styles';

export const Textarea = ({
  input,
  props: {
    className,
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
        'rdf-input': true,
        'rdf-input--error': shouldDisplayError,
      }, className)}
    >
      <style jsx>{`
        .rdf-input {
          display: block;
          position: relative;
          margin: 0;
          font-size: 1rem;
        }

        .rdf-input__field {
          box-sizing: border-box;
          display: block;
          width: 100%;
          min-height: 3em;
          height: 5em;
          appearance: none;
          margin: 0;
          padding: 0.7em;
          border: 1px solid ${colors.grayLighter};
          border-radius: 3px;
          background: #fff;
          color: ${colors.grayDark};
          vertical-align: top;
          font-size: 1rem;
          font-family: inherit;
          box-shadow: none;
          resize: vertical;
          transition-property: color, box-shadow, border;
          transition-duration: 55ms;
          transition-timing-function: ease-out;
        }

        .rdf-input__field:hover {
          border-color: ${colors.grayLight};
        }

        .rdf-input__field:focus {
          outline: none;
          border-color: ${colors.primary};
          box-shadow: 0 2px 2px ${colors.shadow} inset;
        }

        .rdf-input__field--error,
        .rdf-input__field--error:hover,
        .rdf-input__field--error:focus {
          border-color: ${colors.danger};
        }

        .rdf-input__error {
          display: block;
          margin: 0.2em 0 0;
          color: ${colors.danger};
          font-size: 0.85rem;
          line-height: 1.4;
        }
      `}</style>

      <textarea
        {...input}
        {...props}
        className={cx({
          'rdf-input__field': true,
          'rdf-input__field--error': shouldDisplayError,
        })}
      />

      {shouldDisplayError && <span className="rdf-input__error">{error}</span>}
    </div>
  );
};

export default dripFormField('textarea')(Textarea);
