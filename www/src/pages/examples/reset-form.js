/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { dripForm } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input, FieldGroup, Checkbox, Radio } from '../../fields/';


const ResetForm = dripForm({
  validations: {
    name: {
      required: true,
      max: 32,
    },
    gender: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <Input type="text" name="foo" />
    </div>

    <div>
      <FieldGroup name="bar" multiple>
        <Checkbox value="bar1">Bar 1</Checkbox>
        <Checkbox value="bar2">Bar 2</Checkbox>
        <Checkbox value="bar3">Bar 3</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <FieldGroup name="baz">
        <Radio value="baz1">Baz 1</Radio>
        <Radio value="baz2">Baz 2</Radio>
        <Radio value="baz3">Baz 3</Radio>
      </FieldGroup>
    </div>

    <div>
      <Input type="text" name="hoge" value="Hoge props" />
    </div>

    <div>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        id="name"
        name="name"
        label="Name"
      />
    </div>

    <div>
      <label>Gender</label>
      <FieldGroup name="gender">
        <Radio value="female">Female</Radio>
        <Radio value="male">Male</Radio>
        <Radio value="other">Other</Radio>
        <Radio value="none">Rather not say</Radio>
      </FieldGroup>
    </div>

    <div>
      <label>Favorite Colors</label>
      <FieldGroup name="colors" multiple>
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="black">Black</Checkbox>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="pink">Pink</Checkbox>
      </FieldGroup>
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>

    {' '}

    <Button
      onClick={handlers.onReset}
      disabled={pristine}
    >
      Reset
    </Button>
  </form>
));


export default class ResetFormExample extends Component {
  state = {
    values: {
      name: 'Initial Name',
      gender: 'other',
      colors: ['white', 'pink'],
    },
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Reset Form"
        location={location}
      >
        <p>
          It is an example to reset the state of the form. Unlike <code>clear</code>, <code>reset</code> restores the initial value.<br />
          There are two ways to reset the state.
        </p>

        <ol>
          <li><code>props.handlers.onReset()</code></li>
          <li><code>form.reset()</code></li>
        </ol>

        <hr />

        <h3>Example:</h3>
        <ResetForm
          values={values}
          onChange={v => this.setState({ values: v })}
          onValidSubmit={(v) => {
            alert('See console');
            console.log(v);
          }}
        />
        <hr />

        <h3>Values:</h3>
        <Code language="javascript">{JSON.stringify(values, null, 2)}</Code>
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React from 'react';
import { dripForm } from 'react-drip-form';

const ResetForm = dripForm({
  validations: {
    name: {
      required: true,
      max: 32,
    },
    gender: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <Input type="text" name="foo" />
    </div>

    <div>
      <FieldGroup name="bar" multiple>
        <Checkbox value="bar1">Bar 1</Checkbox>
        <Checkbox value="bar2">Bar 2</Checkbox>
        <Checkbox value="bar3">Bar 3</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <FieldGroup name="baz">
        <Radio value="baz1">Baz 1</Radio>
        <Radio value="baz2">Baz 2</Radio>
        <Radio value="baz3">Baz 3</Radio>
      </FieldGroup>
    </div>

    <div>
      <Input type="text" name="hoge" value="Hoge props" />
    </div>

    <div>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        id="name"
        name="name"
        label="Name"
      />
    </div>

    <div>
      <label>Gender</label>
      <FieldGroup name="gender">
        <Radio value="female">Female</Radio>
        <Radio value="male">Male</Radio>
        <Radio value="other">Other</Radio>
        <Radio value="none">Rather not say</Radio>
      </FieldGroup>
    </div>

    <div>
      <label>Favorite Colors</label>
      <FieldGroup name="colors" multiple>
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="black">Black</Checkbox>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="pink">Pink</Checkbox>
      </FieldGroup>
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Send message
    </Button>

    {' '}

    <Button
      onClick={handlers.onReset}
      disabled={pristine}
    >
      Reset
    </Button>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
