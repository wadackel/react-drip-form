// @flow
import React, { Component } from 'react';
import invariant from 'invariant';
import isEqual from 'lodash.isequal';
import * as dot from 'dot-wild';
import hasProp from './utils/hasProp';
import makeDisplayName from './utils/makeDisplayName';
import getFieldValue from './utils/getFieldValue';
import formatFieldValue, { defaultFormatter } from './utils/formatFieldValue';
import parseFieldValue from './utils/parseFieldValue';
import createFieldProps from './utils/createFieldProps';
import { DFContextTypes } from './types';

import type {
  DFContext,
  ErrorMessage,
  ErrorMessageList,
  FieldFormatter,
  FieldParser,
  Validations,
  Normalizers,
  MessageList,
} from './types';


export type FieldOptions = {
  defaultFormatter?: ?FieldFormatter;
  defaultParser?: ?FieldParser;
};

const defaultFieldOptions: FieldOptions = {
  defaultParser: null,
  defaultFormatter,
};


export type Props = {
  name: string;
  value: any;
  label?: string;
  parser?: FieldParser;
  formatter?: FieldFormatter;
  validations?: Validations;
  normalizers?: Normalizers;
  messages?: MessageList;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
  onDragStart?: Function;
  onDrop?: Function;
};

export type State = {
};

const getPropsValue = (props: Props, defaultValue: any): any => (
  hasProp(props, 'value') ? props.value : defaultValue
);

const createField = (fieldOptions: FieldOptions = {}) => {
  const options: FieldOptions = {
    ...defaultFieldOptions,
    ...fieldOptions,
  };

  return (WrappedComponent: Class<Component<any, any, any>> | Function) => (
    class DripFormField extends Component<any, any, any> {
      static displayName = makeDisplayName(WrappedComponent, 'dripFormField');
      static contextTypes = DFContextTypes;
      static defaultProps = {
        label: null,
        parser: options.defaultParser,
        formatter: options.defaultFormatter,
        validations: null,
        normalizers: null,
        messages: null,
        onChange: null,
        onBlur: null,
        onFocus: null,
        onDragStart: null,
        onDrop: null,
      };

      context: DFContext;
      props: Props;
      state: State;
      initialValue: any;

      constructor(props: Props, context: DFContext) {
        super(props, context);

        if (!hasProp(context, 'dripForm')) {
          invariant(false, 'Field component must be inside a Drip Form component (`createForm()` HOC).');
        } else {
          context.register(this);
          this.updateMetaData(props, context, false);
        }
      }

      componentWillMount() {
        this.context.updateValue(
          this.props.name,
          getPropsValue(this.props, this.getValue()),
          false
        );

        this.updateMetaData(this.props, this.context, false);
      }

      componentWillReceiveProps(nextProps: Props) {
        const {
          updateValue,
          updateLabel,
          updateValidations,
          updateNormalizers,
          updateMessages,
        } = this.context;

        const {
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

        if (!isEqual(value, _value)) {
          this.initialValue = value;
          updateValue(name, value, true);
        }

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

      componentWillUnmount() {
        this.context.unregister(this);
      }

      updateMetaData(props: Props, context: DFContext, validate: boolean): void {
        const {
          updateValidations,
          updateNormalizers,
          updateMessages,
          updateLabel,
        } = context;

        const {
          name,
          validations,
          normalizers,
          label,
          messages,
        } = props;

        const value = getPropsValue(props, this.getValue());

        this.initialValue = value;

        updateValidations(name, validations, validate);
        updateNormalizers(name, normalizers, validate);
        updateLabel(name, label, validate);
        updateMessages(name, messages, validate);
      }

      getValue(): any {
        return dot.get(this.context.values, this.props.name);
      }

      getErrors(): ?ErrorMessageList {
        return this.context.errors[this.props.name];
      }

      getError(): ?ErrorMessage {
        const errors = this.getErrors();
        return errors ? errors[0] : undefined;
      }

      isInvalid(): boolean {
        return !!this.getError();
      }

      isValid(): boolean {
        return !this.isInvalid();
      }

      isValidating(): boolean {
        return this.context.validating.indexOf(this.props.name) > -1;
      }

      isTouched(): boolean {
        return this.context.touches.indexOf(this.props.name) > -1;
      }

      isUntouched(): boolean {
        return !this.isTouched();
      }

      isDirty(): boolean {
        return this.context.dirties.indexOf(this.props.name) > -1;
      }

      isPristine(): boolean {
        return !this.isDirty();
      }

      handleChange = (e: any) => {
        const { updateValue, updateDirty } = this.context;
        const { name, parser } = this.props;
        const value = parseFieldValue(getFieldValue(e), name, parser);
        const dirty = !isEqual(this.initialValue, value);

        updateValue(name, value, true);
        updateDirty(name, dirty);

        if (typeof this.props.onChange === 'function') {
          this.props.onChange(e);
        }
      };

      handleBlur = (e: any) => {
        this.context.updateTouched(this.props.name, true, true);

        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur(e);
        }
      };

      handleFocus = (e: any) => {
        if (typeof this.props.onFocus === 'function') {
          this.props.onFocus(e);
        }
      };

      handleDragStart = (e: any) => {
        console.log(e); // eslint-disable-line no-console
      };

      handleDrop = (e: any) => {
        console.log(e); // eslint-disable-line no-console
      };

      render() {
        const {
          /* eslint-disable no-unused-vars */
          value: _value,
          label,
          parser,
          validations,
          normalizers,
          messages,
          onChange,
          onFocus,
          onBlur,
          onDragStart,
          onDrop,
          /* eslint-enable no-unused-vars */
          formatter,
          ...props
        } = this.props;

        const value = formatFieldValue(this.getValue(), props.name, formatter);

        return (
          <WrappedComponent
            {...createFieldProps(props.type, {
              input: {
                value,
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onDragStart: this.handleDragStart,
                onDrop: this.handleDrop,
              },
              status: {
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
  );
};


export default createField;
