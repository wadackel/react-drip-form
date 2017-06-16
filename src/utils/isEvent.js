// @flow
const isEvent = (e: any): boolean => (
  !!(e && e.stopPropagation && e.preventDefault)
);

export default isEvent;
