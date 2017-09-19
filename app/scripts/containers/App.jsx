// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Modernizr from 'modernizr';
import { getScreenSize } from 'utils/helpers';
import { updateBrowserOptions } from 'actions';
import Router from 'modules/ReduxRouter';

import Config from 'containers/Config';
import Home from 'containers/Home';
import Error404 from 'containers/Errors/404';
import Products from 'containers/Products';
import Authentication from 'containers/Authentication';
import Cart from 'containers/Cart';
import MyAccount from 'containers/MyAccount';
import Checkout from 'containers/Checkout';
import Header from 'components/Header';
import Upload from 'containers/Upload';
import CloudCompany from 'containers/CloudCompany';
import Glossary from 'containers/Glossary';

type Props = {
  app: AppStoreType,
  cart: {},
  dispatch: () => {},
  router: RouterStore,
  locale: {},
};

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleScreenResize);

    this.handleScreenResize(true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenResize);
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
    const { app, dispatch, router, cart } = this.props;

    let html = (<div className="loader">Loading</div>);

    if (app.rehydrated) {
      html = (
        <Router dispatch={dispatch} router={router}>
          <Switch>
            <Route exact path="/pagamento" component={Checkout} />
            <Route
              path="/"
              render={() => (
                <div key="app" className="app">
                  <Header screenSize={app.screenSize} dispatch={dispatch} totalCartItems={cart.count} />
                  <main className="app__main">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/configuracao-:slug" component={Config} />
                      <Route path="/produtos-:slug" component={Products} />
                      <Route path="/login-cadastro" component={Authentication} />
                      <Route path="/minha-conta" component={MyAccount} />
                      <Route path="/glossario" component={Glossary} />
                      <Route exact path="/test" component={Home} />
                      <Route path="/meu-carrinho" component={Cart} />
                      <Route path="/:slug/upload/:itemId" component={Upload} />
                      <Route exact path="/404" component={Error404} />
                      <Route path="/cloud" component={CloudCompany} />
                      <Route component={Error404} />
                    </Switch>
                  </main>
                </div>
              )}
            />
          </Switch>
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
    cart: state.cart,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(App);
