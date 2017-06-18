// @flow
import React, { Component } from 'react';
import invariant from 'invariant';
import { Validator } from 'drip-form-validator'; // eslint-disable-line import/no-extraneous-dependencies
import * as dot from 'dot-wild';
import isPlainObject from 'lodash.isplainobject';
import isEqual from 'lodash.isequal';
import isArray from './utils/isArray';
import hasProp from './utils/hasProp';
import cancelEvent from './utils/cancelEvent';
import getShallowFilteredValues from './utils/getShallowFilteredValues';
import makeDisplayName from './utils/makeDisplayName';
import { DFContextTypes } from './types';

import type {
  Values,
  Errors,
  Validations,
  Normalizers,
  ValidationsWithField,
  NormalizersWithField,
  MessageList,
  MessageFieldList,
  LabelList,
} from './types';

import type {
  Props as FieldProps,
  State as FieldState,
} from './dripFormField';

type FieldComponent = React$Component<FieldProps, FieldProps, FieldState>;


export type FormOptions = {
  validations?: ValidationsWithField,
  normalizers?: NormalizersWithField,
  messages?: MessageFieldList;
  labels?: LabelList;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  normalizeOnChange?: boolean;
  normalizeOnBlur?: boolean;
};

const defaultFormOptions: FormOptions = {
  validations: {},
  normalizers: {},
  messages: {},
  labels: {},
  validateOnChange: true,
  validateOnBlur: true,
  normalizeOnChange: true,
  normalizeOnBlur: true,
};

type DotIndex = number | string;

export type Props = {
  values?: Values;
  onChange?: Function; // eslint-disable-line react/no-unused-prop-types
  onClear?: Function;
  onReset?: Function;
  onValidSubmit?: Function; // eslint-disable-line react/no-unused-prop-types
  onInvalidSubmit?: Function; // eslint-disable-line react/no-unused-prop-types
};

export type State = {
  values: Values;
  errors: Errors;
  validating: string[];
  touches: string[];
  dirties: string[];
};

const dripForm = (formOptions: FormOptions = {}) => {
  const options = {
    ...defaultFormOptions,
    ...formOptions,
  };

  return (WrappedComponent: Class<Component<any, any, any>> | Function) => (
    class DripForm extends Component<any, any, any> {
      static displayName = makeDisplayName(WrappedComponent, 'dripForm');
      static childContextTypes = DFContextTypes;
      static defaultProps = {
        values: {},
        onChange: null,
        onClear: null,
        onReset: null,
        onValidSubmit: null,
        onInvalidSubmit: null,
      };

      props: Props;
      state: State;
      fields: { [key: string]: FieldComponent };
      values: Values;
      validator: any;
      mounted: boolean = false;

      constructor(props: Props, context: any) {
        super(props, context);

        this.values = { ...(props.values || {}) };
        this.fields = {};

        const {
          validations,
          normalizers,
          messages,
          labels,
        } = options;

        this.validator = new Validator(
          this.values,
          validations,
          { normalizers, messages, labels }
        );

        this.state = {
          values: this.values,
          errors: {},
          validating: [],
          touches: [],
          dirties: [],
        };
      }

      getChildContext() {
        const {
          values,
          errors,
          validating,
          touches,
          dirties,
        } = this.state;

        return {
          dripForm: true,
          register: this.register,
          unregister: this.unregister,
          updateValue: this.updateValue,
          updateTouched: this.updateTouched,
          updateDirty: this.updateDirty,
          updateValidations: this.updateValidations,
          updateNormalizers: this.updateNormalizers,
          updateMessages: this.updateMessages,
          updateLabel: this.updateLabel,
          validating,
          values,
          errors,
          touches,
          dirties,
        };
      }

      componentWillMount() {
        this.mounted = true;
      }

      componentDidMount() {
        this.validate();
      }

      componentWillUnmount() {
        this.mounted = false;
      }

      componentWillReceiveProps(nextProps: Props) {
        const { values: _values } = this.props;
        const { values } = nextProps;

        if (!isEqual(values, _values)) {
          this.setState({ values });
        }
      }

      setStateIfMounted(state: $Shape<State>, callback?: Function) {
        if (this.mounted) {
          this.setState(state, callback);
        }
      }

      getValues(): Values {
        return this.state.values;
      }

      setValues(values: Values): void {
        const { onChange } = this.props;

        this.values = values;
        this.setStateIfMounted({ values });
        this.validator.setValues(values);

        if (typeof onChange === 'function') {
          onChange(values, this);
        }
      }

      clear(): void {
        const { onClear } = this.props;

        this.setValues({});

        if (typeof onClear === 'function') {
          onClear(this);
        }
      }

      reset(): void {
        const { onReset } = this.props;

        this.setValues(this.initialValues());

        if (typeof onReset === 'function') {
          onReset(this);
        }
      }

      initialValues(): Values {
        let values = {};

        Object.keys(this.fields).forEach((key: string) => {
          const field = this.fields[key];
          const value = (field: any).initialValue;

          if (value != null) {
            values = dot.set(values, key, value);
          }
        });

        return values;
      }

      getErrors(): Errors {
        return this.state.errors;
      }

      setErrors(errors: Errors): void {
        this.setStateIfMounted({ errors });
      }

      getField(name: string): FieldComponent {
        return this.fields[name];
      }

      isValid(name: ?string = null): boolean {
        return this.validator.isValid(name);
      }

      isValidating(name: ?string = null): boolean {
        const { validating } = this.state;

        return name
          ? validating.indexOf(name) > -1
          : validating.length > 0;
      }

      isTouched(): boolean {
        return this.state.touches.length > 0;
      }

      isDirty(): boolean {
        return this.state.dirties.length > 0;
      }

      register = (field: FieldComponent): void => {
        this.fields[field.props.name] = field;
      };

      unregister = (field: FieldComponent): void => {
        const { values, errors, touches, dirties } = this.state;
        const { name } = field.props;

        delete this.fields[name];
        delete errors[name];

        this.setValues(dot.remove(values, name));

        this.setStateIfMounted({
          errors,
          touches: touches.filter(v => v !== name),
          dirties: dirties.filter(v => v !== name),
        });
      };

      updateValue = (name: string, value: any, validate: boolean): void => {
        const values = getShallowFilteredValues(dot.set(this.values, name, value));

        this.setValues(values);

        if (validate) {
          if (options.normalizeOnChange) this.normalize(name);
          if (options.validateOnChange) this.validate();
        }
      };

      updateTouched = (name: string, touched: boolean, validate: boolean): void => {
        const touches = this.state.touches.filter(v => v !== name);

        this.setStateIfMounted({
          touches: !touched ? touches : [...touches, name],
        });

        if (validate) {
          if (options.normalizeOnBlur) this.normalize(name);
          if (options.validateOnBlur) {
            this.validate();

            if (this.isValid(name)) {
              this.asyncValidate(name);
            }
          }
        }
      };

      updateDirty = (name: string, dirty: boolean): void => {
        const dirties = this.state.dirties.filter(v => v !== name);

        this.setStateIfMounted({
          dirties: !dirty ? dirties : [...dirties, name],
        });
      };

      updateValidations = (name: string, validations: ?Validations, validate: boolean): void => {
        const v = this.validator;

        if (isPlainObject(validations)) {
          const previous = v.getRules();

          v.mergeRules({
            [name]: {
              ...(hasProp(previous, name) ? previous[name] : {}),
              ...validations,
            },
          });

          if (validate) this.validate();
        }
      };

      updateNormalizers = (name: string, normalizers: ?Normalizers, validate: boolean): void => {
        const v = this.validator;

        if (isPlainObject(normalizers)) {
          const previous = v.getNormalizers();

          v.mergeNormalizers({
            [name]: {
              ...(hasProp(previous, name) ? previous[name] : {}),
              ...normalizers,
            },
          });

          if (validate) this.validate();
        }
      };

      updateMessages = (name: string, messages: ?MessageList, validate: boolean): void => {
        const v = this.validator;

        if (isPlainObject(messages)) {
          const previous = v.getMessages();

          v.mergeMessages({
            [name]: {
              ...(hasProp(previous, name) ? previous[name] : {}),
              ...messages,
            },
          });

          if (validate) this.validate();
        }
      };

      updateLabel = (name: string, label: ?string, validate: boolean): void => {
        if (label) {
          this.validator.mergeLabels({ [name]: label });

          if (validate) this.validate();
        }
      };


      fieldGet = (field: string, defaultValue?: any): any => (
        dot.get(this.values, field, defaultValue)
      );

      fieldSet = (field: string, value: any): void => {
        this.setValues(dot.set(this.values, field, value));
        this.validate();
      };

      fieldRemove = (field: string): void => {
        this.setValues(dot.remove(this.values, field));
        this.validate();
      };

      fieldGetArray = (field: string): any[] => {
        const value = dot.get(this.values, field, []);
        invariant(isArray(value), `"${field}" must be array`);
        return value;
      };

      fieldPush = (field: string, value: any): void => {
        const current = this.fieldGetArray(field);

        this.setValues(dot.set(this.values, field, [
          ...current,
          value,
        ]));

        this.validate();
      };

      fieldPop = (field: string): ?any => {
        const current = this.fieldGetArray(field);

        if (current.length < 1) {
          return undefined;
        }

        const value = current.pop();

        this.setValues(dot.set(this.values, field, current));
        this.validate();

        return value;
      };

      fieldShift = (field: string): ?any => {
        const current = this.fieldGetArray(field);

        if (current.length < 1) {
          return undefined;
        }

        const value = current.shift();

        this.setValues(dot.set(this.values, field, current));
        this.validate();

        return value;
      };

      fieldUnshift = (field: string, ...values: any[]): void => {
        const current = this.fieldGetArray(field);

        this.setValues(dot.set(this.values, field, [
          ...values,
          ...current,
        ]));

        this.validate();
      };

      fieldSwap = (field: string, indexA: number, indexB: number): any => {
        const current = this.fieldGetArray(field);

        if (!hasProp(current, indexA) || !hasProp(current, indexB)) {
          return;
        }

        const b = current[indexA];
        current[indexA] = current[indexB];
        current[indexB] = b;

        this.setValues(dot.set(this.values, field, current));
        this.validate();
      };

      fieldMove = (field: string, from: number, to: number): any => {
        const current = this.fieldGetArray(field);

        if (!hasProp(current, from) || from === to) {
          return;
        }

        const value = current[from];
        const next = current.slice(0, from).concat(current.slice(from + 1));

        this.setValues(dot.set(this.values, field, [
          ...next.slice(0, to),
          value,
          ...next.slice(to),
        ]));

        this.validate();
      };

      fieldMap = (
        field: string,
        iteratee: (path: string, index: DotIndex, value: any) => any
      ): any[] => (
        dot.map(this.values, field, (value: any, key: DotIndex, _: any, full: string): any => (
          iteratee(full, key, value)
        ))
      );

      fieldForEach = (
        field: string,
        iteratee: (path: string, index: DotIndex, value: any) => void
      ): void => {
        dot.forEach(this.values, field, (value: any, key: DotIndex, _: any, full: string): void => {
          iteratee(full, key, value);
        });
      };

      fieldValid = (field: string): boolean => (
        this.isValid(field)
      );

      fieldValidating = (field: string): boolean => (
        this.isValidating(field)
      );


      validate(): boolean {
        const valid = this.validator.validate();

        this.setStateIfMounted({
          errors: this.validator.getAllErrorMessages(),
        });

        return valid;
      }

      asyncValidate(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
          const filteredValidating = () => this.state.validating.filter(f =>
            f !== name
          );

          const handler = (success: boolean) => () => {
            this.setStateIfMounted({
              validating: filteredValidating(),
              errors: this.validator.getAllErrorMessages(),
            }, () => {
              if (success) {
                resolve();
              } else {
                reject(null);
              }
            });
          };

          this.setStateIfMounted({
            validating: [
              ...this.state.validating,
              name,
            ],
          });

          this.validator.asyncValidate(name)
            .then(handler(true))
            .catch(handler(false));
        });
      }

      normalize(name?: string | string[]): void {
        const v = this.validator;
        v.normalize(name);
        this.setValues(v.getValues());
      }

      submit(): void {
        const { onValidSubmit, onInvalidSubmit } = this.props;
        const onSubmit = <T>(callback: T): Function => () => {
          if (typeof callback === 'function') {
            callback(this.getValues(), this);
          }
        };

        const validSubmit = onSubmit(onValidSubmit);
        const invalidSubmit = onSubmit(onInvalidSubmit);

        const v = this.validator;
        const touches = [];
        const dirties = [];
        const valid = v.validate();
        const asyncKeys = v.getAsyncRuleKeys();

        Object.keys(this.fields).forEach((key: string) => {
          touches.push(key);
          dirties.push(key);
        });

        this.setStateIfMounted({
          touches,
          dirties,
          errors: valid ? {} : v.getAllErrorMessages(),
        });

        if (!valid) {
          invalidSubmit();
          return;
        }

        if (asyncKeys.length === 0) {
          validSubmit();
          return;
        }

        this.setStateIfMounted({
          validating: asyncKeys,
        });

        v.asyncValidate()
          .then(() => {
            this.setStateIfMounted({
              validating: [],
            });
            validSubmit();
          })
          .catch(() => {
            this.setStateIfMounted({
              validating: [],
              errors: v.getAllErrorMessages(),
            });
            invalidSubmit();
          });
      }


      handleSubmit = (e: any): void => {
        cancelEvent(e);
        this.submit();
      };

      handleClear = (e: any): void => {
        cancelEvent(e);
        this.clear();
      };

      handleReset = (e: any): void => {
        cancelEvent(e);
        this.reset();
      };


      render() {
        const {
          values,
          errors,
        } = this.state;

        const valid = this.isValid();
        const validating = this.isValidating();
        const invalid = !valid;
        const dirty = this.isDirty();
        const pristine = !dirty;
        const touched = this.isTouched();
        const untouched = !touched;

        const props = {
          ...this.props,
          values,
          errors,
          status: {
            valid,
            invalid,
            touched,
            untouched,
            dirty,
            pristine,
            validating,
          },
          fields: {
            get: this.fieldGet,
            set: this.fieldSet,
            remove: this.fieldRemove,
            push: this.fieldPush,
            pop: this.fieldPop,
            shift: this.fieldShift,
            unshift: this.fieldUnshift,
            swap: this.fieldSwap,
            move: this.fieldMove,
            map: this.fieldMap,
            forEach: this.fieldForEach,
            isValid: this.fieldValid,
            isValidating: this.fieldValidating,
          },
          handlers: {
            onSubmit: this.handleSubmit,
            onClear: this.handleClear,
            onReset: this.handleReset,
          },
        };

        return <WrappedComponent {...props} />;
      }
    }
  );
};


export default dripForm;
