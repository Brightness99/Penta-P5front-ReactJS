// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Modernizr from 'modernizr';
import { getScreenSize } from 'utils/helpers';
import { updateBrowserOptions } from 'actions';
import Router from 'modules/ReduxRouter';

import Footer from 'components/Footer';
import Config from 'containers/Config';
import Home from 'containers/Home';
import Error404 from 'containers/Errors/404';
import Products from 'containers/Products';
import Authentication from 'containers/Authentication';
import Cart from 'containers/Cart';
import MyAccount from 'containers/MyAccount';
import ArtProposal from 'containers/ArtProposal';
import Checkout from 'containers/Checkout';
import Header from 'components/Header';
import Upload from 'containers/Upload';
import CloudCompany from 'containers/CloudCompany';
import Glossary from 'containers/Glossary';
import Success from 'containers/Success';
import CorporateSales from 'containers/CorporateSales';
import FileMount from 'containers/FileMount';
import PrintGuide from 'containers/PrintGuide';
import PrintiPress from 'containers/PrintiPress';
import AboutPrinti from 'containers/AboutPrinti';
import HelpCenterPage from 'containers/HelpCenterPage';
import TermsOfUse from 'containers/TermsOfUse';
import PrivacyPolicy from 'containers/PrivacyPolicy';
import Sitemap from 'containers/Sitemap';
import Search from 'components/Search';
import Templates from 'containers/Templates';
import TemplatesSEO from 'containers/TemplatesSEO';
import Referral from 'containers/Referral';

import CloudEditor from 'containers/CloudEditor';

type Props = {
  app: AppStoreType,
  cart: {},
  dispatch: () => {},
  router: RouterStore,
  locale: {},
  isAuthorized: boolean,
  headerConfig: {}
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
    const { app, dispatch, router, cart, isAuthorized, headerConfig } = this.props;

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
                  <Header
                    screenSize={app.screenSize}
                    dispatch={dispatch}
                    totalCartItems={cart.count}
                    isAuthorized={isAuthorized}
                    config={headerConfig}
                  />
                  <main className="app__main">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/configuracao-:slug" component={Config} />
                      <Route path="/produtos-:slug" component={Products} />
                      <Route path="/login-cadastro" component={Authentication} />
                      <Route path="/minha-conta" component={MyAccount} />
                      <Route path="/montagem-do-arquivo/:slug" component={FileMount} />
                      <Route path="/montagem-do-arquivo" component={FileMount} />
                      <Route path="/guia-de-impressao/:slug" component={PrintGuide} />
                      <Route path="/guia-de-impressao" component={PrintGuide} />
                      <Route path="/editor-cloud" component={CloudEditor} />
                      <Route path="/central-de-ajuda" component={HelpCenterPage} />
                      <Route path="/politica-de-privacidade" component={PrivacyPolicy} />
                      <Route path="/mapa-do-site" component={Sitemap} />
                      <Route path="/termos-de-servico-e-uso-do-site" component={TermsOfUse} />
                      <Route path="/glossario" component={Glossary} />
                      <Route path="/success/:orderNumber" component={Success} />
                      <Route path="/buscar" component={Search} />
                      <Route path="/printi-na-imprensa" component={PrintiPress} />
                      <Route path="/sobre-printi" component={AboutPrinti} />
                      <Route path="/cloud" component={CloudCompany} />
                      <Route exact path="/test" component={Home} />
                      <Route path="/meu-carrinho" component={Cart} />
                      <Route path="/:slug/upload/:itemId" component={Upload} />
                      <Route path="/indique-a-printi" component={Referral} />
                      <Route exact path="/404" component={Error404} />
                      <Route exact path="/venda-corporativa" component={CorporateSales} />
                      <Route exact path="/proposta-de-arte" component={ArtProposal} />
                      <Route path="/download-de-gabaritos" component={Templates} />
                      <Route exact path="/modelos" component={TemplatesSEO} />
                      <Route component={Error404} />
                    </Switch>
                  </main>
                  <Footer />
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
    isAuthorized: state.user.isAuthorized,
    headerConfig: state.header,
  };
}

export default connect(mapStateToProps)(App);
