// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import OrderList from './OrderList';
import OrderListDetails from './OrderListDetails';
import MyAddresses from './MyAddresses';
import CardsAccount from './CardsAccount';
import TemplateModels from './TemplateModels';
import Cloud from './Cloud';
import Loyalty from './Loyalty';

import Briefing from './Briefing';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

export class MyAccount extends React.Component {
  static props: Props;

  renderMobile() {
    return (
      <div className="container-myaccount">
        {this.renderContainer()}
      </div>
    );
  }

  renderDesktop() {

    // <OrderList screenSize={screenSize} />
    // <OrderListDetails screenSize={screenSize} />
    // <MyAddresses screenSize={screenSize} />
    // <TemplateModels screenSize={screenSize} />
    // <Cloud screenSize={screenSize} />
    // <Loyalty screenSize={screenSize} />
    // <CardsAccount screenSize={screenSize} />
    /*<div className="container-myaccount">
    <Sidebar screenSize={screenSize} />
    <OrderList screenSize={screenSize} />
  </div>*/
    const { app: { screenSize } } = this.props;
    return (
      <div className="container-myaccount">
        <Sidebar screenSize={screenSize} />
        {this.renderContainer()}
      </div>
    );
  }

  renderContainer() {
    const { app: { screenSize } } = this.props;

    return (
      <Switch>
        <Route
          path="/minha-conta/pedidos"
          render={() => (
            <Switch>
              <Route
                path="/minha-conta/pedidos/:orderNumber"
                render={(props) => <OrderListDetails {...props} screenSize={screenSize} />}
              />
              <Route
                render={(props) => <OrderList {...props} screenSize={screenSize} />}
              />
            </Switch>
          )}
        />
        <Route
          path="/minha-conta/enderecos"
          render={(props) => <MyAddresses {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/cartoes-salvos"
          render={(props) => <CardsAccount {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/modelos-salvos"
          render={(props) => <TemplateModels {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/cloud"
          render={(props) => <Cloud {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/programa-de-fidelidade"
          render={(props) => <Loyalty {...props} screenSize={screenSize} />}
        />
        <Route
          render={(props) => <OrderList {...props} screenSize={screenSize} />}
        />
      </Switch>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    app: state.app,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(MyAccount);
