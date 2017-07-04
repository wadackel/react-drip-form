// @flow
const normalizeFieldName = (name: string): string => name.replace(/\[\]$/, '');

export default normalizeFieldName;
