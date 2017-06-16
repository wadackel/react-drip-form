// @flow
import omitBy from 'lodash.omitby';
import type { Values } from '../types';

const getShallowFilteredValues = (values: Values): Values => (
  omitBy(values, (v: any): boolean => (
    v === undefined || v === null || v === ''
  ))
);

export default getShallowFilteredValues;
