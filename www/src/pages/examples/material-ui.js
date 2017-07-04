/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { dripForm } from '../../../../src/';
import {
  FieldGroup,
  AutoComplete,
  Checkbox,
  DatePicker,
  RadioButton,
  SelectField,
  TextField,
  TimePicker,
  Toggle,
} from '../../material-ui/';
import { Layout, Button, Code } from '../../components/';


injectTapEventPlugin();


const MaterialUIForm = dripForm({
  validations: {
    name: {
      required: true,
    },
    username: {
      required: true,
      lowercase: true,
    },
    email: {
      required: true,
      email: true,
    },
    gender: {
      required: true,
    },
    job: {
      max: 3,
    },
    message: {
      required: true,
    },
    tags: {
      required: true,
    },
    releaseDate: {
      required: true,
    },
    releaseTime: {
      required: true,
    },
    confirm: {
      required: true,
    },
  },
})(({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <TextField
        fullWidth
        name="name"
        label="Name"
        floatingLabelText="Name"
        hintText="Enter your name"
      />
    </div>

    <div>
      <TextField
        fullWidth
        name="username"
        label="Username"
        floatingLabelText="Username"
        hintText="enter-your-username"
      />
    </div>

    <div>
      <TextField
        fullWidth
        name="email"
        label="Email-Address"
        floatingLabelText="Email-Address"
        hintText="enter-your-username"
      />
    </div>

    <div style={{ marginTop: '1.4em' }}>
      <label>Gender</label>
      <FieldGroup name="gender" label="Gender">
        <RadioButton value="female" label="Female" />
        <RadioButton value="male" label="Male" />
        <RadioButton value="Other" label="Other" />
        <RadioButton value="none" label="Rather not say" />
      </FieldGroup>
    </div>

    <div style={{ marginTop: '1.4em' }}>
      <label>Job (Optional)</label>
      <FieldGroup name="job" label="Job" multiple>
        <Checkbox value="frontend-engineer" label="Front-end Engineer" />
        <Checkbox value="backend" label="Back-end Engineer" />
        <Checkbox value="software-engineer" label="Software Engineer" />
        <Checkbox value="ui-designer" label="UI Designer" />
        <Checkbox value="ux-designer" label="UX Designer" />
        <Checkbox value="graphic-designer" label="Graphic Designer" />
      </FieldGroup>
    </div>

    <div>
      <SelectField
        fullWidth
        name="subject"
        label="Subject"
        floatingLabelText="Subject"
      >
        <MenuItem value="option1" primaryText="Option 1" />
        <MenuItem value="option2" primaryText="Option 2" />
        <MenuItem value="option3" primaryText="Option 3" />
      </SelectField>
    </div>

    <div>
      <AutoComplete
        fullWidth
        name="tags"
        label="Tags"
        floatingLabelText="Tags"
        hintText="dataSource = React, Angular, Vue, Mithril, Riot"
        dataSource={[
          'React',
          'Angular',
          'Vue',
          'Mithril',
          'Riot',
        ]}
      />
    </div>

    <div>
      <TextField
        fullWidth
        name="message"
        label="Message"
        multiLine
        rows={3}
        rowsMax={10}
        floatingLabelText="Message"
        hintText="Enter your message"
      />
    </div>

    <div>
      <div className="row">
        <div className="col-xs-6">
          <DatePicker
            name="releaseDate"
            label="Release Date"
            floatingLabelText="Release Date"
            textFieldStyle={{ width: '100%' }}
          />
        </div>
        <div className="col-xs-6">
          <TimePicker
            name="releaseTime"
            label="Release Time"
            floatingLabelText="Release Time"
            textFieldStyle={{ width: '100%' }}
          />
        </div>
      </div>
    </div>

    <div style={{ marginTop: '1.4em' }}>
      <Toggle
        name="confirm"
        value="yes"
        label="I agree to the Terms of Use"
        labelPosition="right"
      />
    </div>

    <div style={{ marginTop: '1.4em' }}>
      <Button
        primary
        onClick={handlers.onSubmit}
        disabled={invalid || pristine}
      >
        Send message
      </Button>
    </div>
  </form>
));


export default class BasicFormExample extends Component {
  state = {
    values: {},
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Material UI"
        location={location}
      >
        <style jsx>{`
          :global(form > div, .form > div) {
            margin-top: 0;
            margin-bottom: 0;
          }

          :global(form label[style]) {
            font-weight: normal;
          }
        `}</style>

        <p>
          todo...<br />
          <a href="https://github.com/callemall/material-ui/">callemall/material-ui</a>
        </p>
        <hr />

        <h3>Example:</h3>
        <MuiThemeProvider>
          <MaterialUIForm
            values={values}
            onChange={v => this.setState({ values: v })}
            onValidSubmit={(v) => {
              alert('See console');
              console.log(v);
            }}
          />
        </MuiThemeProvider>
        <hr />

        <h3>Values:</h3>
        <Code language="javascript">{JSON.stringify(values, null, 2)}</Code>
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React from 'react';
import {
  FieldGroup,
  AutoComplete,
  Checkbox,
  DatePicker,
  RadioButton,
  SelectField,
  TextField,
  TimePicker,
  Toggle,
} from 'raect-drip-form-material-ui';
import { dripForm } from 'react-drip-form';
`}</Code>
      </Layout>
    );
  }
}
