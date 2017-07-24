// @flow
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export type FunctionalComponent<P, C> = (props: P, context: C) => ?React$Element<any>;
export type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
export type $WrappedComponent<D, P, S> = ClassComponent<D, P, S> | FunctionalComponent<P, *>;

export type Values = {
  [key: string]: any;
};

export type ErrorMessage = string;

export type ErrorMessageList = string[];

export type Errors = {
  [key: string]: ErrorMessageList;
};

export type FieldParams = boolean | { [key: string]: any } | Function;

export type Validations = {
  [key: string]: FieldParams;
};

export type Normalizers = {
  [key: string]: FieldParams;
};

export type ValidationsWithField = {
  [key: string]: Validations;
};

export type NormalizersWithField = {
  [key: string]: Normalizers;
};

export type MessageCreator = (name: string, value: any, params: { [key: string]: any }) => string;

export type Message = string | { [key: string]: string | MessageCreator } | MessageCreator;

export type MessageList = {
  [key: string]: Message;
};

export type MessageFieldList = {
  [key: string]: MessageList;
};

export type Label = string;

export type LabelList = {
  [key: string]: Label;
}

export type DFContext = {
  dripForm: boolean;
  group: ?{
    name: string;
    multiple: boolean;
  };
  register: Function;
  unregister: Function;
  updateValue: (name: string, value: any, validate: boolean, silent: boolean) => void;
  updateTouched: (name: string, touched: boolean, validate: boolean) => void;
  updateDirty: (name: string, dirty: boolean) => void;
  updateValidations: (name: string, validations: ?Validations, validate: boolean) => void;
  updateNormalizers: (name: string, normalizers: ?Normalizers, validate: boolean) => void;
  updateLabel: (name: string, label: ?string, validate: boolean) => void;
  updateMessages: (name: string, messages: ?MessageList, validate: boolean) => void;
  validating: string[];
  values: Values;
  errors: Errors;
  dirties: string[];
  touches: string[];
};

export const DFContextTypes = {
  dripForm: PropTypes.bool.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string,
    multiple: PropTypes.bool,
  }),
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  updateTouched: PropTypes.func.isRequired,
  updateDirty: PropTypes.func.isRequired,
  updateValidations: PropTypes.func.isRequired,
  updateNormalizers: PropTypes.func.isRequired,
  updateLabel: PropTypes.func.isRequired,
  updateMessages: PropTypes.func.isRequired,
  validating: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dirties: PropTypes.array.isRequired,
  touches: PropTypes.array.isRequired,
};

export type FieldType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'select';

export type InternalFieldType = FieldType | 'select-multiple';

export type FieldFormatter = (value: any, name: string) => any;

export type FieldParser = (value: any, name: string) => any;

export type FieldProps = {
  input: {
    value: any;
    onChange: Function;
    onFocus: Function;
    onBlur: Function;
  };
  meta: {
    error: ?ErrorMessage;
    errors: ?ErrorMessageList;
    valid: boolean;
    invalid: boolean;
    touched: boolean;
    untouched: boolean;
    dirty: boolean;
    pristine: boolean;
    validating: boolean;
  };
};

export const FormPropTypes = {
  children: PropTypes.node,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
    untouched: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    validating: PropTypes.bool.isRequired,
  }).isRequired,
  fields: PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
    shift: PropTypes.func.isRequired,
    unshift: PropTypes.func.isRequired,
    swap: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
    forEach: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    isValidating: PropTypes.func.isRequired,
  }).isRequired,
  handlers: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }).isRequired,
};

export const FieldPropTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    valid: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
    untouched: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    validating: PropTypes.bool.isRequired,
  }).isRequired,
};

export const GroupPropTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    valid: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
    untouched: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    validating: PropTypes.bool.isRequired,
  }).isRequired,
};
