// @flow
import isArray from './isArray';
import * as arrays from './arrays';
import type { InternalFieldType, FieldProps } from '../types';

const createFieldProps = (type: InternalFieldType, value: any, preProps: FieldProps): any => {
  switch (type) {
    case 'checkbox': return {
      ...preProps,
      input: {
        ...preProps.input,
        checked: isArray(value)
          ? arrays.includes(value, preProps.input.value)
          : value === preProps.input.value,
      },
    };

    case 'radio': return {
      ...preProps,
      input: {
        ...preProps.input,
        checked: value === preProps.input.value,
      },
    };

    case 'select-multiple': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: value || [],
      },
    };

    case 'file': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: value || undefined,
      },
    };

    default: return {
      ...preProps,
      input: {
        ...preProps.input,
        value,
      },
    };
  }
};

export default createFieldProps;
