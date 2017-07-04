/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
import { dripFormField } from '../../../src/';
import { getId } from './utils';
import { colors } from './styles';

export const Checkbox = ({
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
  const id = getId(props);

  return (
    <div
      htmlFor={id}
      className={cx({
        'rdf-checkbox': true,
      }, className)}
    >
      <style jsx>{`
        .rdf-checkbox {
          display: block;
          position: relative;
          margin: 0.4em 0;
          font-size: 1rem;
        }

        .rdf-checkbox__label {
          display: inline-block;
          position: relative;
          min-height: 20px;
          margin: 0;
          padding: 0 0 0 24px;
          font-size: 1rem;
          font-weight: normal;
          line-height: 1.25;
          position: relative;
          cursor: pointer;
        }

        .rdf-checkbox__field {
          position: absolute;
          margin: 3px 0 0 -24px;
          padding: 0;
          line-height: 1;
        }

        .rdf-checkbox__error {
          display: block;
          margin: 0.2em 0 0;
          color: ${colors.danger};
          font-size: 0.85rem;
          line-height: 1.4;
        }
      `}</style>

      <label
        htmlFor={id}
        className={cx({
          'rdf-checkbox__label': true,
        })}
      >
        <input
          {...input}
          {...props}
          type="checkbox"
          className="rdf-checkbox__field"
        />

        <span className="rdf-checkbox__element">{children}</span>
      </label>

      {shouldDisplayError && <span className="rdf-checkbox__error">{error}</span>}
    </div>
  );
};

export default dripFormField('checkbox')(Checkbox);
