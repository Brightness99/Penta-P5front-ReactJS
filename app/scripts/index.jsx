// Polyfills
import 'core-js/shim';
import 'classlist-polyfill';
import 'vendor/polyfills';

// Rx
import 'vendor/rxjs';

// i18n
import moment from 'moment';
import 'moment/min/locales.min';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import { AppContainer } from 'react-hot-loader';

import store from 'store';
import '../styles/main.scss';

/* istanbul ignore next */
if (process.env.production) {
  require('offline-plugin/runtime').install();
}

export function renderApp(RootComponent) {
  const target = document.getElementById('react');
  moment.locale('pt-BR');
  /* istanbul ignore next */
  if (target) {
    ReactDOM.render(
      <AppContainer>
        <RootComponent store={store} />
      </AppContainer>,
      target
    );
  }
}

renderApp(Root);

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept(
    'containers/Root',
    () => renderApp(require('containers/Root'))
  );
}
