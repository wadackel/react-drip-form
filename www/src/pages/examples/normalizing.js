/* eslint-disable no-alert */
import React, { Component } from 'react';
import { dripForm } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input, Select } from '../../fields/';


const NormalizingForm = dripForm({
  validations: {
    product: {
      required: true,
    },
    minAmount: {
      required: true,
    },
    maxAmount: {
      required: true,
    },
  },
  normalizers: {
    minAmount: {
      toInt: true,
      min: 0,
      maxWith: 'maxAmount',
    },
    maxAmount: {
      toInt: true,
      max: 5000,
      minWith: 'minAmount',
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="product">Product</label>
      <Select
        id="product"
        name="product"
        label="Product"
      >
        <option value="">Select product</option>
        <option value="product1">Product 1</option>
        <option value="product2">Product 2</option>
        <option value="product3">Product 3</option>
      </Select>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <label htmlFor="minAmount">Minimum amount</label>
        <Input
          type="number"
          id="minAmount"
          name="minAmount"
          label="Minimum amount"
          value={0}
        />
      </div>

      <div className="col-xs-6">
        <label htmlFor="minAmount">Maximum amount</label>
        <Input
          type="number"
          id="maxAmount"
          name="maxAmount"
          label="maximum amount"
          value={1000}
        />
      </div>
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


export default class NormalizingFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Normalizing"
        location={location}
      >
        <style jsx>{`
          :global(form > div) {
            margin-bottom: 1em;
          }

          :global(form > div label) {
            display: block;
            margin: 0 0 0.2em;
            font-weight: bold;
          }
        `}</style>

        <p>
          Values can be normalized by specifying <code>normalizers</code> as an option to <code>dripForm()</code>.<br />
          See <a href="https://tsuyoshiwada.github.io/drip-form-validator/normalizers/">Built-in Normalizers</a> for Normalizer which can be specified.
        </p>

        <p>
          Please note that there is a problem that the cursor position shifts if there is a change in the value of Controlled Component in React.
        </p>

        <hr />

        <h3>Example:</h3>
        <NormalizingForm
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

const NormalizingForm = dripForm({
  validations: {
    product: {
      required: true,
    },
    minAmount: {
      required: true,
    },
    maxAmount: {
      required: true,
    },
  },
  normalizers: {
    minAmount: {
      toInt: true,
      min: 0,
      maxWith: 'maxAmount',
    },
    maxAmount: {
      toInt: true,
      max: 5000,
      minWith: 'minAmount',
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="product">Product</label>
      <Select
        id="product"
        name="product"
        label="Product"
      >
        <option value="">Select product</option>
        <option value="product1">Product 1</option>
        <option value="product2">Product 2</option>
        <option value="product3">Product 3</option>
      </Select>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <label htmlFor="minAmount">Minimum amount</label>
        <Input
          type="number"
          id="minAmount"
          name="minAmount"
          label="Minimum amount"
          value={0}
        />
      </div>

      <div className="col-xs-6">
        <label htmlFor="minAmount">Maximum amount</label>
        <Input
          type="number"
          id="maxAmount"
          name="maxAmount"
          label="maximum amount"
          value={1000}
        />
      </div>
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
