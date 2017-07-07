/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Checkbox,
  Radio,
} from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


const ClearForm = dripForm({
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
      onClick={handlers.onClear}
      disabled={pristine}
    >
      Clear
    </Button>
  </form>
));


export default class ClearFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Clear Form"
        location={location}
      >
        <p>
          It is an example to clear the state of the form.<br />
          There are two ways to clear the state.
        </p>

        <ol>
          <li><code>props.handlers.onClear()</code></li>
          <li><code>form.clear()</code></li>
        </ol>

        <p>
          In this example we will use method 1.<br />
          You can easily implement state clearing by simply specifying <code>handlers.onClear()</code> in the handler of the button component <code>onClick</code>.
        </p>

        <hr />

        <h3>Example:</h3>
        <ClearForm
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
import {
  Input,
  FieldGroup,
  Checkbox,
  Radio,
} from 'react-drip-form-components';

const ClearForm = dripForm({
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
      onClick={handlers.onClear}
      disabled={pristine}
    >
      Clear
    </Button>
  </form>
));
`}</Code>
      </Layout>
    );
  }
}
