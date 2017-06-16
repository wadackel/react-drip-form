// @flow
const hasProp = (obj: any, key: string | number): boolean => (
  Object.prototype.hasOwnProperty.call(obj, key)
);

export default hasProp;
