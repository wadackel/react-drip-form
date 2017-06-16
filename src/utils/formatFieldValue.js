// @flow
import type { FieldFormatter } from '../types';

export const defaultFormatter = (value: any): any => (
  value == null ? '' : value
);

const formatFieldValue = (
  value: any,
  name: string,
  formatter: ?FieldFormatter = defaultFormatter
): any => {
  if (formatter == null) return value;

  return typeof formatter === 'function'
    ? formatter(value, name)
    : defaultFormatter(value);
};

export default formatFieldValue;
