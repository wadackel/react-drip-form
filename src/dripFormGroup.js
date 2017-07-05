// @flow
import React, { Component } from 'react';
import invariant from 'invariant';
import isEqual from 'lodash.isequal';
import * as dot from 'dot-wild';
import * as arrays from './utils/arrays';
import hasProp from './utils/hasProp';
import makeDisplayName from './utils/makeDisplayName';
import { DFContextTypes } from './types';

import type {
  $WrappedComponent,
  DFContext,
  ErrorMessageList,
  ErrorMessage,
  Validations,
  Normalizers,
  MessageList,
} from './types';


export type Props = {
  name: string;
  value?: any;
  label?: string;
  multiple?: boolean;
  validations?: Validations;
  normalizers?: Normalizers;
  messages?: MessageList;
};

export type State = {
};

export type GroupOptions = {
  defaultProps?: Object;
};


const dripFormGroup = (options: GroupOptions = {}) => (
  (WrappedComponent: $WrappedComponent<*, *, *>) => (
    class DripFormGroup extends Component {
      static displayName = makeDisplayName(WrappedComponent, 'dripFormGroup');
      static contextTypes = DFContextTypes;
      static childContextTypes = DFContextTypes;
      static defaultProps = {
        multiple: false,
        value: null,
        label: null,
        validations: null,
        normalizers: null,
        messages: null,
        ...(options.defaultProps || {}),
      };

      context: DFContext;
      props: Props;
      state: State;
      initialValue: any;

      constructor(props: Props, context: DFContext) {
        super(props, context);

        invariant(
          hasProp(context, 'dripForm'),
          'FieldGroup component must be inside a Drip Form component (`dripForm()` HOC).'
        );

        invariant(
          !!props.name,
          'FieldGroup component must be specified name property.'
        );

        this.updateMetaData(props, context, false);
      }

      getChildContext() {
        const { name, multiple } = this.props;

        return {
          ...this.context,
          group: {
            name,
            multiple,
          },
        };
      }

      componentWillMount() {
        const { name } = this.props;
        const value = this.props.value !== null
          ? this.props.value
          : dot.get(this.context.values, name);

        this.context.updateValue(name, value, false);
        this.updateMetaData(this.props, this.context, false);
      }

      componentWillReceiveProps(nextProps: Props): void {
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

        this.initialValue = dot.get(context.values, name);

        updateValidations(name, validations, validate);
        updateNormalizers(name, normalizers, validate);
        updateLabel(name, label, validate);
        updateMessages(name, messages, validate);
      }

      getValue(): any {
        return dot.get(this.context.values, this.props.name);
      }

      getErrors(): ?ErrorMessageList {
        const { errors } = this.context;
        const { name } = this.props;

        return hasProp(errors, name) ? errors[name] : undefined;
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
        return arrays.includes(this.context.validating, this.props.name);
      }

      isTouched(): boolean {
        return arrays.includes(this.context.touches, this.props.name);
      }

      isUntouched(): boolean {
        return !this.isTouched();
      }

      isDirty(): boolean {
        return arrays.includes(this.context.dirties, this.props.name);
      }

      isPristine(): boolean {
        return !this.isDirty();
      }

      render() {
        const {
          /* eslint-disable no-unused-vars */
          multiple,
          validations,
          normalizers,
          messages,
          /* eslint-enable no-unused-vars */
          name,
          label,
          ...props
        } = this.props;

        return (
          <WrappedComponent
            {...props}
            meta={{
              name,
              label,
              value: this.getValue(),
              error: this.getError(),
              errors: this.getErrors(),
              valid: this.isValid(),
              invalid: this.isInvalid(),
              touched: this.isTouched(),
              untouched: this.isUntouched(),
              dirty: this.isDirty(),
              pristine: this.isPristine(),
              validating: this.isValidating(),
            }}
          />
        );
      }
    }
  )
);


export default dripFormGroup;
