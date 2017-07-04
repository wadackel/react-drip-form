// @flow
import isEvent from './isEvent';
import type { InternalFieldType } from '../types';

const getSelectedValues = (options: ?HTMLOptionsCollection): string[] => {
  const results: string[] = [];

  if (options) {
    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      if (option.selected) {
        results.push(option.value);
      }
    }
  }

  return results;
};

const getFieldValue = (type: InternalFieldType, e: any): any => {
  if (!isEvent(e)) return e;

  const { target, dataTransfer } = e;
  const { value, checked, files, options } = target;

  switch (type) {
    case 'checkbox': return checked ? value : '';
    case 'file': return files || (dataTransfer && dataTransfer.files);
    case 'select-multiple': return getSelectedValues(options);
    default: return value;
  }
};

export default getFieldValue;
