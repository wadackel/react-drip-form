// @flow
import type { FieldParser } from '../types';

const parseFieldValue = (value: any, name: string, parser: ?FieldParser): any => (
  typeof parser === 'function' ? parser(value, name) : value
);

export default parseFieldValue;
