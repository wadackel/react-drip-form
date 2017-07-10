// @flow
import React, { Component } from 'react';
import invariant from 'invariant';
import isEqual from 'lodash.isequal';
import * as dot from 'dot-wild';
import * as arrays from './utils/arrays';
import hasProp from './utils/hasProp';
import makeDisplayName from './utils/makeDisplayName';
import getFieldType from './utils/getFieldType';
import getFieldValue from './utils/getFieldValue';
import formatFieldValue, { defaultFormatter } from './utils/formatFieldValue';
import parseFieldValue from './utils/parseFieldValue';
import createFieldProps from './utils/createFieldProps';
import { DFContextTypes } from './types';

import type {
  $WrappedComponent,
  DFContext,
  ErrorMessage,
  ErrorMessageList,
  FieldType,
  InternalFieldType,
  FieldFormatter,
  FieldParser,
  Validations,
  Normalizers,
  MessageList,
} from './types';


export type Props = {
  name: string;
  value?: any;
  label?: string;
  parser?: FieldParser;
  formatter?: FieldFormatter;
  validations?: Validations;
  normalizers?: Normalizers;
  messages?: MessageList;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
};

export type State = {
};

export type FieldOptions = {
  defaultProps?: Object;
};

const normalizeFieldName = (name: string): string => (
  name.replace(/\[\]$/, '')
);

const getPropsValue = (props: Props, defaultValue: any): any => (
  hasProp(props, 'value') ? props.value : defaultValue
);


const dripFormField = (fieldType: FieldType = 'text', options: FieldOptions = {}) => (
  (WrappedComponent: $WrappedComponent<*, *, *>) => (
    class DripFormField extends Component<*, *, *> {
      static displayName = makeDisplayName(WrappedComponent, 'dripFormField');
      static contextTypes = DFContextTypes;
      static defaultProps = {
        label: null,
        parser: null,
        formatter: defaultFormatter,
        validations: null,
        normalizers: null,
        messages: null,
        onChange: null,
        onBlur: null,
        onFocus: null,
        ...(options.defaultProps || {}),
      };

      context: DFContext;
      props: Props;
      state: State;
      name: string;
      initialValue: any;

      constructor(props: Props, context: DFContext) {
        super(props, context);

        invariant(
          hasProp(context, 'dripForm'),
          'Field component must be inside a Drip Form component (`dripForm()` HOC).'
        );

        const name = normalizeFieldName((context.group ? context.group.name : props.name) || '');

        invariant(
          !!name,
          'Field component must be specified name property.'
        );

        this.name = name;
        context.register(this.name, this);

        this.updateMetaData(props, context, false);
      }

      // @FIXME: Refactoring
      componentWillMount() {
        const contextValue = dot.get(this.context.values, this.name);
        let value;

        switch (fieldType) {
          case 'radio':
          case 'checkbox':
            value = contextValue;
            break;
          default:
            value = getPropsValue(this.props, contextValue);
            break;
        }

        if (!this.context.group) {
          this.context.updateValue(this.name, value, false);
        }

        this.updateMetaData(this.props, this.context, false);
      }

      componentWillReceiveProps(nextProps: Props) {
        const {
          register,
          unregister,
          updateValue,
          updateLabel,
          updateValidations,
          updateNormalizers,
          updateMessages,
        } = this.context;

        const {
          name: _name,
          value: _value,
          label: _label,
          validations: _validations,
          normalizers: _normalizers,
          messages: _messages,
        } = this.props;

        const {
          name,
          value,
          label,
          validations,
          normalizers,
          messages,
        } = nextProps;

        if (name !== _name) {
          this.name = name;
          unregister(_name);
          register(name, this);
        }

        if (!isEqual(value, _value)) {
          this.initialValue = value;
          updateValue(name, value, true);
        }

        if (!this.context.group) {
          if (label !== _label) {
            updateLabel(name, label, true);
          }

          if (!isEqual(validations, _validations)) {
            updateValidations(name, validations, true);
          }

          if (!isEqual(normalizers, _normalizers)) {
            updateNormalizers(name, normalizers, true);
          }

          if (!isEqual(messages, _messages)) {
            updateMessages(name, messages, true);
          }
        }
      }

      componentWillUnmount() {
        this.context.unregister(this.name);
      }

      updateMetaData(props: Props, context: DFContext, validate: boolean): void {
        const {
          updateValidations,
          updateNormalizers,
          updateMessages,
          updateLabel,
        } = context;

        const {
          validations,
          normalizers,
          label,
          messages,
        } = props;

        // @FIXME: Refactoring
        const contextValue = dot.get(context.values, this.name);

        switch (fieldType) {
          case 'radio':
          case 'checkbox':
            this.initialValue = contextValue;
            break;
          default:
            this.initialValue = getPropsValue(props, contextValue);
            break;
        }

        if (context.group) {
          return;
        }

        updateValidations(this.name, validations, validate);
        updateNormalizers(this.name, normalizers, validate);
        updateLabel(this.name, label, validate);
        updateMessages(this.name, messages, validate);
      }

      getValue(): any {
        return dot.get(this.context.values, this.name);
      }

      getType(): InternalFieldType {
        return getFieldType(fieldType, this.props);
      }

      getErrors(): ?ErrorMessageList {
        const { group, errors } = this.context;

        return group ? undefined : errors[this.name];
      }

      getError(): ?ErrorMessage {
        return arrays.first(this.getErrors() || []);
      }

      isInvalid(): boolean {
        return !!this.getError();
      }

      isValid(): boolean {
        return !this.isInvalid();
      }

      isValidating(): boolean {
        const { group, validating } = this.context;

        return group ? false : arrays.includes(validating, this.name);
      }

      isTouched(): boolean {
        const { group, touches } = this.context;

        return group ? false : arrays.includes(touches, this.name);
      }

      isUntouched(): boolean {
        return !this.isTouched();
      }

      isDirty(): boolean {
        const { group, dirties } = this.context;

        return group ? false : arrays.includes(dirties, this.name);
      }

      isPristine(): boolean {
        return !this.isDirty();
      }

      // @FIXME Refactoring
      getChangedValue(e: any) {
        const { group } = this.context;
        const contextValue = this.getValue();
        let value = getFieldValue(this.getType(), e);

        if (group && group.multiple) {
          const ctx = contextValue || [];

          if (value === '') {
            value = arrays.remove(ctx, ctx.indexOf(this.props.value));
          } else {
            value = arrays.push(ctx, value);
          }

          value = value.length > 0 ? value : null;
        }

        return value;
      }

      handleChange = (e: any) => {
        const { updateValue, updateDirty, updateTouched } = this.context;
        const { parser } = this.props;
        const value = parseFieldValue(
          this.getChangedValue(e),
          this.name,
          parser
        );

        const dirty = !isEqual(this.initialValue, value);

        if (fieldType === 'checkbox' || fieldType === 'radio') {
          updateTouched(this.name, true, false);
        }

        updateDirty(this.name, dirty);
        updateValue(this.name, value, true);

        if (typeof this.props.onChange === 'function') {
          this.props.onChange(e);
        }
      };

      handleBlur = (e: any) => {
        if (fieldType !== 'checkbox' && fieldType !== 'radio') {
          this.context.updateTouched(this.name, true, true);
        }

        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur(e);
        }
      };

      handleFocus = (e: any) => {
        if (typeof this.props.onFocus === 'function') {
          this.props.onFocus(e);
        }
      };

      render() {
        const {
          /* eslint-disable no-unused-vars */
          parser,
          validations,
          normalizers,
          messages,
          onChange,
          onFocus,
          onBlur,
          /* eslint-enable no-unused-vars */
          name,
          value,
          label,
          formatter,
          ...props
        } = this.props;

        const contextValue = formatFieldValue(
          this.getValue(),
          this.name,
          formatter
        );

        return (
          <WrappedComponent
            {...createFieldProps(this.getType(), contextValue, {
              input: {
                name,
                value,
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
              },
              meta: {
                label,
                error: this.getError(),
                errors: this.getErrors(),
                valid: this.isValid(),
                invalid: this.isInvalid(),
                touched: this.isTouched(),
                untouched: this.isUntouched(),
                dirty: this.isDirty(),
                pristine: this.isPristine(),
                validating: this.isValidating(),
              },
              props,
            })}
          />
        );
      }
    }
  )
);


export default dripFormField;
