// @flow
import hasProp from './hasProp';
import type { FieldType, InternalFieldType } from '../types';
import type { Props as FieldProps } from '../dripFormField';

const getFieldType = (type: FieldType, props: FieldProps): InternalFieldType => {
  if (type === 'select' && hasProp(props, 'multiple') && props.multiple === true) {
    return 'select-multiple';
  }

  return type;
};

export default getFieldType;
