// @flow

import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';

/* istanbul ignore next */
const Root = (props: { store: {} }) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

export default Root;
