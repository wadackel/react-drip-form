// @flow
import {
  push as immutablePush,
  pop as immutablePop,
  shift as immutableShift,
  unshift as immutableUnshift,
  del as immutableDelete,
} from 'immutable-arrays';

import hasProp from './hasProp';


export const first = <T>(array: T[]): ?T => (
  array.length > 0 ? array[0] : undefined
);

export const last = <T>(array: T[]): ?T => (
  array.length > 0 ? array[array.length - 1] : undefined
);

export const includes = <T>(array: T[], value: T): boolean => (
  array.indexOf(value) > -1
);

export const push = <T>(array: T[], ...values: T[]): T[] => (
  immutablePush(array, ...values)
);

export const pop = <T>(array: T[]): T[] => (
  immutablePop(array)
);

export const shift = <T>(array: T[]): T[] => (
  immutableShift(array)
);

export const unshift = <T>(array: T[], ...values: T[]): T[] => (
  immutableUnshift(array, ...values)
);

export const remove = <T>(array: T[], index: number): T[] => (
  immutableDelete(array, index)
);

// eslint-disable-next-line arrow-parens
export const swap = <T>(array: T[], indexA: number, indexB: number): T[] => {
  if (!hasProp(array, indexA) || !hasProp(array, indexB)) {
    return array;
  }

  const arr = [...array];
  const b = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = b;

  return arr;
};

// eslint-disable-next-line arrow-parens
export const move = <T>(array: T[], from: number, to: number): T[] => {
  if (!hasProp(array, from) || from === to) {
    return array;
  }

  const arr = [...array];
  const value = arr[from];
  const next = arr.slice(0, from).concat(arr.slice(from + 1));

  return [
    ...next.slice(0, to),
    value,
    ...next.slice(to),
  ];
};
