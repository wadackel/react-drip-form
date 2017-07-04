export const mockEvent = (params = {}) => ({
  stopPropagation: () => {},
  preventDefault: () => {},
  ...params,
});

export const mockContext = (context = {}) => ({
  dripForm: true,
  group: null,
  register: () => {},
  unregister: () => {},
  updateValue: () => {},
  updateTouched: () => {},
  updateDirty: () => {},
  updateValidations: () => {},
  updateNormalizers: () => {},
  updateLabel: () => {},
  updateMessages: () => {},
  validating: [],
  values: {},
  errors: {},
  dirties: [],
  touches: [],
  ...context,
});
