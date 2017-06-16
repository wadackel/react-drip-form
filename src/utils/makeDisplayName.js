// @flow
const makeDisplayName = (WrappedComponent: any, wrap: string): string => (
  `${wrap}(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
);

export default makeDisplayName;
