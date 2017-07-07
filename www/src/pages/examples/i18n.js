/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { dripForm, Validator } from 'react-drip-form';
import { Input, Textarea } from 'react-drip-form-components';
import 'drip-form-validator/lib/locale/ja';
import { Layout, Button, Code } from '../../components/';


const I18nForm = dripForm({
  validations: {
    email: {
      required: true,
      email: true,
    },
    message: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">送信先</label>
      <Input
        id="email"
        type="email"
        name="email"
        label="送信先"
      />
    </div>

    <div>
      <label htmlFor="message">メッセージ</label>
      <Textarea
        id="message"
        name="message"
        label="メッセージ"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      送信
    </Button>
  </form>
));


export default class BasicFormExample extends Component {
  state = {
    values: {},
  };

  componentWillMount() {
    Validator.setLocale('ja');
  }

  componentWillUnmount() {
    Validator.setLocale('en');
  }

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="i18n"
        location={location}
      >
        <p>
          <code>react-drip-form</code> supports to the error message i18n.<br />
          You can deal with just one line using <code>setLocale()</code> of <a href="https://github.com/tsuyoshiwada/drip-form-validator">drip-form-validator</a>.<br />
          For locales that do not exist in <code>drip-form-validator</code>, you can also define them with <code>defineLocale()</code>.
        </p>

        <p>
          Labels and other components are not supported. I think <a href="https://github.com/yahoo/react-intl">yahoo/react-intl</a> is useful!
        </p>

        <hr />

        <h3>Example:</h3>
        <I18nForm
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
import { dripForm, Validator } from 'react-drip-form';
import { Input, Textarea } from 'react-drip-form-components';
import 'drip-form-validator/lib/locale/ja';

Validator.setLocale('ja')

const I18nForm = dripForm({
  validations: {
    email: {
      required: true,
      email: true,
    },
    message: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">送信先</label>
      <Input
        id="email"
        type="email"
        name="email"
        label="送信先"
      />
    </div>

    <div>
      <label htmlFor="message">メッセージ</label>
      <Textarea
        id="message"
        name="message"
        label="メッセージ"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine}
    >
      送信
    </Button>
  </form>
));
`}</Code>
      </Layout>
    );
  }
}
