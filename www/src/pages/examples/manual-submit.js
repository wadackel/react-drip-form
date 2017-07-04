/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { dripForm } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input, Checkbox, FieldGroup, Textarea } from '../../fields/';


const ManualSubmitForm = dripForm({
  validations: {
    sitename: {
      required: true,
    },
    url: {
      required: true,
      url: true,
    },
    colors: {
      required: true,
    },
  },
})(() => (
  <div className="form">
    <div>
      <label htmlFor="sitename">Sitename</label>
      <Input
        type="text"
        id="sitename"
        name="sitename"
        label="Sitename"
      />
    </div>

    <div>
      <label htmlFor="url">URL</label>
      <Input
        type="text"
        id="url"
        name="url"
        label="URL"
        placeholder="http://example.com"
      />
    </div>

    <div>
      <label>Colors</label>
      <FieldGroup
        multiple
        name="colors"
        label="Colors"
      >
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="gray">Gray</Checkbox>
        <Checkbox value="black">Black</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="description">Description</label>
      <Textarea
        id="description"
        name="description"
        label="Description"
      />
    </div>
  </div>
));


class MyComponent extends Component {
  handleInitialize = (form) => {
    this.form = form;
  };

  handleClick = (e) => {
    e.preventDefault();
    this.form.submit();
  };

  render() {
    return (
      <div>
        <ManualSubmitForm
          {...this.props}
          onInitialize={this.handleInitialize}
        />

        <Button
          primary
          onClick={this.handleClick}
        >
          Submit from outside
        </Button>
      </div>
    );
  }
}


export default class BasicFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Manual Submit"
        location={location}
      >
        <p>
          An example of submitting outside <code>dripForm()</code>.<br />
          You can submit it manually by using the <code>submit()</code> method of the Form instance.
        </p>

        <hr />

        <h3>Example:</h3>
        <MyComponent
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
        <Code language="javascript">{`import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';

const ManualSubmitForm = dripForm({
  validations: {
    sitename: {
      required: true,
    },
    url: {
      required: true,
      url: true,
    },
    colors: {
      required: true,
    },
  },
})(() => (
  <div className="form">
    <div>
      <label htmlFor="sitename">Sitename</label>
      <Input
        type="text"
        id="sitename"
        name="sitename"
        label="Sitename"
      />
    </div>

    <div>
      <label htmlFor="url">URL</label>
      <Input
        type="text"
        id="url"
        name="url"
        label="URL"
        placeholder="http://example.com"
      />
    </div>

    <div>
      <label>Colors</label>
      <FieldGroup
        multiple
        name="colors"
        label="Colors"
      >
        <Checkbox value="white">White</Checkbox>
        <Checkbox value="gray">Gray</Checkbox>
        <Checkbox value="black">Black</Checkbox>
      </FieldGroup>
    </div>

    <div>
      <label htmlFor="description">Description</label>
      <Textarea
        id="description"
        name="description"
        label="Description"
      />
    </div>
  </div>
));


class MyComponent extends Component {
  handleInitialize = (form) => {
    this.form = form;
  };

  handleClick = (e) => {
    e.preventDefault();
    this.form.submit();
  };

  render() {
    return (
      <div>
        <ManualSubmitForm
          {...this.props}
          onInitialize={this.handleInitialize}
        />

        <Button
          primary
          onClick={this.handleClick}
        >
          Submit from outside
        </Button>
      </div>
    );
  }
}
`}</Code>
      </Layout>
    );
  }
}
