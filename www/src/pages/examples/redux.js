/* eslint-disable */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { dripForm } from '../../../../src/';
import { Layout, Button, Code } from '../../components/';
import { Input } from '../../fields/';


// Simulate API
const requestLogin = (username, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (username === 'admin' && password === 'passwd') {
      resolve({
        id: 1,
        username,
        password,
      });
    } else {
      reject('Login failure!!');
    }
  }, 1000);
});


// Action Creators
const formActions = {
  loginRequest: (payload) => ({ type: 'LOGIN_REQUEST', payload }),
  loginSuccess: (payload) => ({ type: 'LOGIN_SUCCESS', payload }),
  loginFailure: (payload) => ({ type: 'LOGIN_FAILURE', payload, error: true }),
};

formActions.login = ({ username, password }) => dispatch => {
  dispatch(formActions.loginRequest({ username, password }));

  requestLogin(username, password)
    .then(user => dispatch(formActions.loginSuccess(user)))
    .catch(error => dispatch(formActions.loginFailure(error)))
};


// Reducers
const initialState = {
  submitting: false,
  user: null,
  error: null,
};

const monitorFormData = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_REQUEST': return {
      ...state,
      submitting: true,
      error: null,
      user: null,
    };

    case 'LOGIN_SUCCESS': return {
      ...state,
      submitting: false,
      user: payload,
    };

    case 'LOGIN_FAILURE': return {
      ...state,
      submitting: false,
      error: payload,
    };

    default: return state;
  }
};


// Store
const store = createStore(
  combineReducers({
    form: monitorFormData,
  }),
  applyMiddleware(thunk)
);


// Form Component
const Form = dripForm({
  validations: {
    username: { required: true },
    password: { required: true },
  },
})(({
  handlers,
  meta: { invalid, pristine },
  submitting,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
      />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || submitting}
    >
      {submitting ? 'Logging in...' : 'Login'}
    </Button>
  </form>
));


// Presentational Component
const ReduxForm = ({ form, onSubmit }) => {
  return (
    <div>
      <Form
        submitting={form.submitting}
        onValidSubmit={onSubmit}
      />

      {form.error &&
        <div style={{ color: 'red' }}>
          {form.error}
        </div>
      }

      {form.user &&
        <div>
          <h4>Result!</h4>
          <pre>{JSON.stringify(form.user, null, 2)}</pre>
        </div>
      }
    </div>
  );
};


// Container Component
const ConnectedReduxForm = connect(
  ({ form }) => ({ form }),
  (dispatch) => ({
    onSubmit: (values) => {
      dispatch(formActions.login(values));
    },
  })
)(ReduxForm);


// App Component
const ReduxApp = () => (
  <div>
    <h4>ReduxApp:</h4>
    <ConnectedReduxForm />
  </div>
);


export default class BasicFormExample extends Component {
  render() {
    const { location } = this.props;

    return (
      <Layout
        title="Redux"
        location={location}
      >
        <p>
          <code>react-drip-form</code> does not participate in the application state.<br />
          However, because it is designed to make it easy to collaborate with outside the component, you can easily integrate with the application state manager you use.
        </p>

        <p>
          This is an example of a simple login form using <code>redux</code> + <code>redux-thunk</code>.
        </p>

        <hr />

        <h3>Example:</h3>
        <Provider store={store}>
          <ReduxApp />
        </Provider>
        <hr />

        <h3>Sample Code:</h3>
        <Code language="javascript">{`import React, { Component } from 'react';
import { dripForm } from 'react-drip-form';

// Simulate API
const requestLogin = (username, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (username === 'admin' && password === 'passwd') {
      resolve({
        id: 1,
        username,
        password,
      });
    } else {
      reject('Login failure!!');
    }
  }, 1000);
});


// Action Creators
const formActions = {
  loginRequest: (payload) => ({ type: 'LOGIN_REQUEST', payload }),
  loginSuccess: (payload) => ({ type: 'LOGIN_SUCCESS', payload }),
  loginFailure: (payload) => ({ type: 'LOGIN_FAILURE', payload, error: true }),
};

formActions.login = ({ username, password }) => dispatch => {
  dispatch(formActions.loginRequest({ username, password }));

  requestLogin(username, password)
    .then(user => dispatch(formActions.loginSuccess(user)))
    .catch(error => dispatch(formActions.loginFailure(error)))
};


// Reducers
const initialState = {
  submitting: false,
  user: null,
  error: null,
};

const monitorFormData = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_REQUEST': return {
      ...state,
      submitting: true,
      error: null,
      user: null,
    };

    case 'LOGIN_SUCCESS': return {
      ...state,
      submitting: false,
      user: payload,
    };

    case 'LOGIN_FAILURE': return {
      ...state,
      submitting: false,
      error: payload,
    };

    default: return state;
  }
};


// Store
const store = createStore(
  combineReducers({
    form: monitorFormData,
  }),
  applyMiddleware(thunk)
);


// Form Component
const Form = dripForm({
  validations: {
    username: { required: true },
    password: { required: true },
  },
})(({
  handlers,
  meta: { invalid, pristine },
  submitting,
}) => (
  <form onSubmit={handlers.onSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
      />
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
      />
    </div>

    <Button
      primary
      onClick={handlers.onSubmit}
      disabled={invalid || pristine || submitting}
    >
      {submitting ? 'Logging in...' : 'Login'}
    </Button>
  </form>
));


// Presentational Component
const ReduxForm = ({ form, onSubmit }) => {
  return (
    <div>
      <Form
        submitting={form.submitting}
        onValidSubmit={onSubmit}
      />

      {form.error &&
        <div style={{ color: 'red' }}>
          {form.error}
        </div>
      }

      {form.user &&
        <div>
          <h4>Result!</h4>
          <pre>{JSON.stringify(form.user, null, 2)}</pre>
        </div>
      }
    </div>
  );
};


// Container Component
const ConnectedReduxForm = connect(
  ({ form }) => ({ form }),
  (dispatch) => ({
    onSubmit: (values) => {
      dispatch(formActions.login(values));
    },
  })
)(ReduxForm);


// App Component
const ReduxApp = () => (
  <div>
    <h4>ReduxApp:</h4>
    <ConnectedReduxForm />
  </div>
);`}</Code>
      </Layout>
    );
  }
}
