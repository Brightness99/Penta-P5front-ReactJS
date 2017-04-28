// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Router from 'modules/ReduxRouter';

import Home from 'containers/Home';

import Header from 'components/Header';
import Footer from 'components/Footer';

type Props = {
  app: AppStore,
  dispatch: () => {},
  router: RouterStore,
};

export class App extends React.Component {
  static props: Props;

  render() {
    const { app, dispatch, router } = this.props;
    let html = (<div className="loader">Loading</div>);

    if (app.rehydrated) {
      html = (
        <Router dispatch={dispatch} router={router}>
          <div key="app" className="app">
            <Header dispatch={dispatch} />
            <main className="app__main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/test" component={Home} />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      );
    }

    return html;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
  };
}

export default connect(mapStateToProps)(App);
