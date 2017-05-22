// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getScreenSize } from 'utils/helpers';
import { updateBrowserOptions } from 'actions';
import Router from 'modules/ReduxRouter';

import Config from 'containers/Config';
import Home from 'containers/Home';

import Header from 'components/Header';
import Footer from 'components/Footer';

type Props = {
  app: AppStore,
  dispatch: () => {},
  router: RouterStore,
  locale: {},
};

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleScreenResize);

    this.handleScreenResize(true);
  }

  static props: Props;

  handleScreenResize = (initial) => {
    const { dispatch } = this.props;

    dispatch(updateBrowserOptions({
      isTouchable: Modernizr.phone || Modernizr.tablet,
      screenSize: getScreenSize(),
    }, initial));
  };

  render() {
    const { app, dispatch, router } = this.props;

    let html = (<div className="loader">Loading</div>);

    if (app.rehydrated) {
      html = (
        <Router dispatch={dispatch} router={router}>
          <div key="app" className="app">
            <Header screenSize={app.screenSize} />
            <main className="app__main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/configuracao-:slug" component={Config} />
                <Route exact path="/test" component={Home} />
              </Switch>
            </main>
            <Footer screenSize={app.screenSize} />
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
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(App);
