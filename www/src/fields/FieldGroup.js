/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
import { dripFormGroup } from '../../../src/';
import { colors } from './styles';

export const FieldGroup = ({
  className,
  children,
  hiddenError = false,
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
        'rdf-group': true,
        'rdf-group--error': shouldDisplayError,
      }, className)}
    >
      <style jsx>{`
        .rdf-group {
          display: block;
          font-size: 1rem;
        }

        .rdf-group__error {
          display: block;
          margin: 0.2em 0 0;
          color: ${colors.danger};
          font-size: 0.85rem;
          line-height: 1.4;
        }
      `}</style>

      {children}

      {shouldDisplayError && <span className="rdf-group__error">{error}</span>}
    </div>
  );
};

export default dripFormGroup()(FieldGroup);
