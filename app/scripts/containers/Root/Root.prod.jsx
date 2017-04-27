import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';

// types
import type ReactElement from 'react';

/* istanbul ignore next */
const Root = (store: {}): ReactElement => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
