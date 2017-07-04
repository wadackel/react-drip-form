import React, { Component } from 'react';
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
}
