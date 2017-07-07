/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import { Input, FieldGroup, Checkbox } from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


const FieldLevelValidationForm = dripForm()(({
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
        validations={{
          required: true,
          max: 30,
        }}
      />
    </div>

    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        type="text"
        id="email"
        name="email"
        label="Email-Address"
        placeholder="enter-your-email@example.com"
        validations={{
          required: true,
          email: true,
        }}
      />
    </div>

    <div>
      <label htmlFor="age">Age</label>
      <Input
        type="number"
        id="age"
        name="age"
        label="Age"
        validations={{
          required: true,
          between: {
            min: 18,
            max: 55,
          },
        }}
      />
    </div>

    <div>
      <label htmlFor="products">Favorite products</label>
      <FieldGroup
        multiple
        name="products"
        label="Favorite products"
        value={['imac', 'ipad']}
        validations={{
          required: true,
          max: 3,
        }}
      >
        <Checkbox value="iphone">iPhone</Checkbox>
        <Checkbox value="imac">iMac</Checkbox>
        <Checkbox value="imac-pro">iMac Pro</Checkbox>
        <Checkbox value="macbook">Macbook</Checkbox>
        <Checkbox value="macbook-pro">Macbook Pro</Checkbox>
        <Checkbox value="ipad">iPad</Checkbox>
      </FieldGroup>
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Submit
    </Button>
  </form>
));


export default class FieldLevelValidationFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Field Level Validation"
        location={location}
      >
        <p>
          By specifying a validation rule for <code>validations</code> props on the FieldComponent you can set validation rules at the field level.<br />
          Since I&#39;d like to make the View as pure as possible, I recommend setting it with the <code>dripForm()</code> option as much as possible.
        </p>

        <hr />

        <h3>Example:</h3>
        <FieldLevelValidationForm
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
import { Input, FieldGroup, Checkbox } from 'react-drip-form-components';

const FieldLevelValidationForm = dripForm()(({
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
        validations={{
          required: true,
          max: 30,
        }}
      />
    </div>

    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        type="text"
        id="email"
        name="email"
        label="Email-Address"
        placeholder="enter-your-email@example.com"
        validations={{
          required: true,
          email: true,
        }}
      />
    </div>

    <div>
      <label htmlFor="age">Age</label>
      <Input
        type="number"
        id="age"
        name="age"
        label="Age"
        validations={{
          required: true,
          between: {
            min: 18,
            max: 55,
          },
        }}
      />
    </div>

    <div>
      <label htmlFor="products">Favorite products</label>
      <FieldGroup
        multiple
        name="products"
        label="Favorite products"
        value={['imac', 'ipad']}
        validations={{
          required: true,
          max: 3,
        }}
      >
        <Checkbox value="iphone">iPhone</Checkbox>
        <Checkbox value="imac">iMac</Checkbox>
        <Checkbox value="imac-pro">iMac Pro</Checkbox>
        <Checkbox value="macbook">Macbook</Checkbox>
        <Checkbox value="macbook-pro">Macbook Pro</Checkbox>
        <Checkbox value="ipad">iPad</Checkbox>
      </FieldGroup>
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      Submit
    </Button>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
