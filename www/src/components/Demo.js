/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Container, Row, Col } from 'react-lime-grid';
import { VirtualWindow, Code } from './';
import { App } from './DemoFiles/';
import { viewport } from '../constants';

const Button = (props) => {
  const {
    children,
    active,
    ...rest
  } = props;

  let Element = 'button';

  if ('to' in props) {
    Element = Link;
  }

  return (
    <div className={`root ${active ? 'active' : ''}`}>
      <style jsx>{`
        .root :global(.button-element) {
          display: block;
          width: 100%;
          margin: 0;
          padding: 12px 18px;
          background: transparent;
          border: none;
          border-radius: 3px;
          color: #000;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          line-height: 1.4;
          transition: all 180ms ease-out;
        }

        .root :global(.button-element):focus {
          outline: none;
        }

        .root.active :global(.button-element),
        .root :global(.button-element):hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .root:not(.active) :global(.button-element):active {
          background: rgba(0, 0, 0, 0.08);
        }

        .root.active :global(.button-element) {
          cursor: default;
        }
      `}</style>

      <Element {...rest} className="button-element">
        {children}
      </Element>
    </div>
  );
};

class ListItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(this.props.value);
  };

  render() {
    const { label, active } = this.props;

    return (
      <li className="root">
        <style jsx>{`
          .root {
            display: block;
          }

          .root:not(:first-child) {
            margin-top: 5px;
          }
        `}</style>

        <Button
          onClick={this.handleClick}
          active={active}
        >
          {label}
        </Button>
      </li>
    );
  }
}

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'app',
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const items = [
      { value: 'app', label: 'App.js' },
      { value: 'form', label: 'Form.js' },
      { value: 'input', label: 'Input.js' },
      { value: 'result', label: 'Result' },
    ];

    return (
      <div className="root">
        <Container>
          <style jsx>{`
            .virtual-window {
              margin-bottom: 30px;
            }

            .virtual-window :global(h1) {
              margin: 0.2em 0;
            }

            .virtual-window :global(code[class*="language-"]) {
              margin: 0;
              padding: 0;
              background: #fff;
              box-shadow: none;
            }

            ul {
              margin: 0;
              padding: 0;
              list-style: none;
            }

            ul:not(:first-child) {
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px solid rgba(0, 0, 0, 0.1);
            }

            @media (${viewport.sm}) {
              .virtual-window {
                margin-bottom: 0;
              }
            }
          `}</style>

          <Row center="xs">
            <Col xs={12} sm={9} lg={8}>
              <div className="virtual-window">
                <VirtualWindow className="virtual-window">
                  <div className="tab">
                    <div
                      className="app"
                      style={{ display: value === 'app' ? 'block' : 'none' }}
                    >
                      <Code>{`import React, { Component } from 'react';
import Form from './Form';

export default class App extends Component {
  // Get valid values.
  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onValidSubmit={this.handleSubmit} />
      </div>
    );
  }
}`}</Code>
                    </div>

                    <div
                      className="form"
                      style={{ display: value === 'form' ? 'block' : 'none' }}
                    >
                      <Code>{`import React from 'react';
import { dripForm } from 'react-drip-form';
import Input from './Input';

const Form = ({
  handlers,
  meta: { invalid, pristine },
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="email">Email-Address</label>
      <Input
        id="email"
        type="email"
        name="email"
        label="Email-Address"
        placeholder="Enter your Email-Address"
      />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your Password"
      />
    </div>

    <button
      type="submit"
      disabled={invalid || pristine}
      onClick={handlers.onSubmit}
    >
      Submit
    </button>
  </form>
);

export default dripForm({
  validations: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  },
})(Form);`}</Code>
                    </div>

                    <div
                      className="input"
                      style={{ display: value === 'input' ? 'block' : 'none' }}
                    >
                      <Code>{`import React from 'react';
import { dripFormField } from 'react-drip-form';

const Input = ({
  input,
  props,
  meta: { error, dirty, touched },
}) => (
  <div>
    <input
      {...props}
      {...input}
    />
    {error && dirty && touched && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

export default dripFormField()(Input);`}</Code>
                    </div>

                    <div
                      className="result"
                      style={{ display: value === 'result' ? 'block' : 'none' }}
                    >
                      <App />
                    </div>
                  </div>
                </VirtualWindow>
              </div>
            </Col>

            <Col xs={12} sm={3} lg={4}>
              <ul>
                {items.map(item => (
                  <ListItem
                    key={item.value}
                    active={item.value === value}
                    value={item.value}
                    label={item.label}
                    onClick={this.handleChange}
                  />
                ))}
              </ul>

              <ul>
                <li>
                  <Button to="/docs/">Learn more</Button>
                  <Button to="/examples/basic-form/">More Examples</Button>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
