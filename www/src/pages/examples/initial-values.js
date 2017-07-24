/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from 'react-drip-form-components';
import { Layout, Button, Code } from '../../components/';


const InitialValuesForm = dripForm()(({
  handlers,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="text">Text</label>
      <Input
        type="text"
        id="text"
        name="text"
      />
    </div>

    <div>
      <label>Radio</label>
      <FieldGroup name="radio">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
        <Radio value="option3">Option 3</Radio>
      </FieldGroup>
    </div>

    <div>
      <label>Checkbox</label>
      <FieldGroup name="checkbox" multiple>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="select">Select</label>
      <Select
        id="select"
        name="select"
      >
        <option value="">Please select a subject</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>

    <div>
      <label htmlFor="textarea">Textarea</label>
      <Textarea
        id="textarea"
        name="textarea"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
    >
      Submit
    </Button>
  </form>
));


class MyComponent extends Component {
  state = {
    values: {
      text: 'Text Value',
      radio: 'option2',
      checkbox: ['option1', 'option3'],
      select: 'option3',
      textarea: 'Textarea value',
    },
  };

  render() {
    return (
      <InitialValuesForm
        values={this.state.values}
        onValidSubmit={(values) => {
          alert('See console');
          console.log(values);
        }}
      />
    );
  }
}


// eslint-disable-next-line react/prefer-stateless-function
export default class InitialValuesFormExample extends Component {
  render() {
    const { location } = this.props;

    return (
      <Layout
        title="Initial Values"
        location={location}
      >
        <p>
          This is an example of giving an initial value to a form.<br />
          You can give an initial value by passing the value to <code>values</code> Props of the form component wrapped with <code>dripForm()</code>.
        </p>
        <hr />

        <h3>Example:</h3>
        <MyComponent />
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';
import {
  Input,
  FieldGroup,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from 'react-drip-form-components';
import { Button } from '../../components/';


const InitialValuesForm = dripForm()(({
  handlers,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="text">Text</label>
      <Input
        type="text"
        id="text"
        name="text"
      />
    </div>

    <div>
      <label>Radio</label>
      <FieldGroup name="radio">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
        <Radio value="option3">Option 3</Radio>
      </FieldGroup>
    </div>

    <div>
      <label>Checkbox</label>
      <FieldGroup name="checkbox" multiple>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="select">Select</label>
      <Select
        id="select"
        name="select"
      >
        <option value="">Please select a subject</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>

    <div>
      <label htmlFor="textarea">Textarea</label>
      <Textarea
        id="textarea"
        name="textarea"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
    >
      Submit
    </Button>
  </form>
));


class MyComponent extends Component {
  state = {
    values: {
      text: 'Text Value',
      radio: 'option2',
      checkbox: ['option1', 'option3'],
      select: 'option3',
      textarea: 'Textarea value',
    },
  };

  render() {
    return (
      <InitialValuesForm
        values={this.state.values}
        onValidSubmit={(values) => {
          alert('See console');
          console.log(values);
        }}
      />
    );
  }
}`}</Code>
      </Layout>
    );
  }
}
