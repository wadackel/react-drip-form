/* eslint-disable no-alert */
/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react';
import { dripForm } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input, FieldGroup, Radio } from '../../fields/';


const NestFieldsForm = dripForm({
  validations: {
    'teams.*.name': {
      required: true,
      max: 30,
    },
    'teams.*.members.*': {
      max: 30,
    },
  },
})(({
  handlers,
  fields,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    {fields.map('teams.*', (teamName, teamIndex) => (
      <div key={teamName}>
        <label htmlFor={teamName}>Team name #{teamIndex + 1}</label>
        <Input
          type="text"
          name={`${teamName}.name`}
          label="Team name"
        />

        <div>
          <FieldGroup name={`${teamName}.scope`}>
            <Radio value="private">Private</Radio>
            <Radio value="public">Public</Radio>
          </FieldGroup>

          <div className="members">
            {fields.map(`${teamName}.members.*`, memberName => (
              <div key={memberName}>
                <label>Member name</label>
                <div className="input-group">
                  <Input
                    type="text"
                    name={memberName}
                    label="Member name"
                  />
                  <Button
                    small
                    type="button"
                    onClick={() => fields.remove(memberName)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            small
            type="button"
            onClick={() => fields.push(`${teamName}.members`, '')}
          >
            Add member
          </Button>
          {' '}
          <Button
            small
            type="button"
            onClick={() => fields.remove(teamName)}
          >
            Delete
          </Button>
        </div>
      </div>
    ))}

    <div>
      <Button
        type="button"
        onClick={() => fields.push('teams', {
          name: '',
          scope: 'private',
          members: [],
        })}
      >
        Add team
      </Button>
    </div>

    <div>
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


export default class NestFieldsFormExample extends Component {
  state = {
    values: {
      teams: [
        { name: 'Initial Team', scope: 'private', members: [] },
      ],
    },
  };

  render() {
    const { location } = this.props;
    const { values } = this.state;

    return (
      <Layout
        title="Nest Fields"
        location={location}
      >
        <style jsx>{`
          :global(form .rdf-group) {
            margin-top: 1em;
            margin-bottom: 1em;
          }

          :global(form > div > div:not(.rdf-input)) {
            padding-left: 2em;
          }

          :global(form .members > div) {
            margin-top: 1em;
            margin-bottom: 1em;
          }

          :global(form .input-group) {
            display: flex;
            justify-content: space-between;
          }

          :global(form .input-group > div) {
            width: 100%;
          }

          :global(form .input-group input) {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }

          :global(form .input-group > button) {
            height: 40px;
            border-left: 0 !important;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
          }
        `}</style>

        <p>
          This is an example of a nested Field form.<br />
          The <code>name</code> attribute of the nested Field must be expressed in dot notation.<br />
          <strong>Example: </strong><code>foo.bar</code>
        </p>
        <p>
          Validation on objects in the array can be specified using a wildcard (<code>*</code>)!<br />
          <strong>Example: </strong><code>array.*.key</code>
        </p>
        <p>
          And, Dynamic data manipulation is possible by adding, deleting, or moving values using <code>fields</code>.
        </p>

        <hr />

        <h3>Example:</h3>
        <NestFieldsForm
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

const NestFieldsForm = dripForm({
  validations: {
    'teams.*.name': {
      required: true,
      max: 30,
    },
    'teams.*.members.*': {
      max: 30,
    },
  },
})(({
  handlers,
  fields,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    {fields.map('teams.*', (teamName, teamIndex) => (
      <div key={teamName}>
        <label htmlFor={teamName}>Team name #{teamIndex + 1}</label>
        <Input
          type="text"
          name={\`${'${teamName}'}.name\`}
          label="Team name"
        />

        <div>
          <FieldGroup name={\`${'${teamName}'}.scope\`}>
            <Radio value="private">Private</Radio>
            <Radio value="public">Public</Radio>
          </FieldGroup>

          <div className="members">
            {fields.map(\`${'${teamName}'}.members.*\`, memberName => (
              <div key={memberName}>
                <label>Member name</label>
                <div className="input-group">
                  <Input
                    type="text"
                    name={memberName}
                    label="Member name"
                  />
                  <Button
                    small
                    type="button"
                    onClick={() => fields.remove(memberName)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            small
            type="button"
            onClick={() => fields.push(\`${'${teamName}'}.members\`, '')}
          >
            Add member
          </Button>
          {' '}
          <Button
            small
            type="button"
            onClick={() => fields.remove(teamName)}
          >
            Delete
          </Button>
        </div>
      </div>
    ))}

    <div>
      <Button
        type="button"
        onClick={() => fields.push('teams', {
          name: '',
          scope: 'private',
          members: [],
        })}
      >
        Add team
      </Button>
    </div>

    <div>
      <Button
        primary
        onClick={handlers.onSubmit}
        disabled={invalid || pristine}
      >
        Send message
      </Button>
    </div>
  </form>
));`}</Code>
      </Layout>
    );
  }
}
