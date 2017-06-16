// @flow
import isArray from './isArray';

const isNumeric = (value: any): boolean => (
  !isArray(value) && ((value - parseFloat(value)) + 1) >= 0
);

export default isNumeric;
