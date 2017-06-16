// @flow
import * as dot from 'dot-wild';
import type { FieldProps } from '../types';

const createFieldProps = (type: string, preProps: FieldProps): any => {
  const { input: { value } } = preProps;

  switch (type) {
    case 'checkbox': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: !!value,
      },
    };

    case 'radio': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: preProps.props.value,
      },
      props: {
        ...(dot.remove(preProps.props, 'value')),
        checked: value === preProps.props.value,
      },
    };

    case 'select-multiple': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: value || [],
      },
    };

    // @TODO
    case 'file': return {
      ...preProps,
      input: {
        ...preProps.input,
        value: undefined,
      },
    };

    default: return preProps;
  }
};

export default createFieldProps;
