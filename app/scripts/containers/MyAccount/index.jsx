// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Sidebar from './Sidebar';
import OrderList from './OrderList';
import OrderListDetails from './OrderListDetails';
import MyAddresses from './MyAddresses';
import CardsAccount from './CardsAccount';
import TemplateModels from './TemplateModels';
import Notification from './Notification';
import Cloud from './Cloud';
import Loyalty from './Loyalty';
import CustomerData from './CustomerData';
import Referral from './Referral';

type Props = {
  screenSize: AppStoreType.screenSize,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

export class MyAccount extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderContainer() {
    const { screenSize } = this.props;

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
          path="/minha-conta/meus-dados"
          render={(props) => <CustomerData {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/modelos-salvos"
          render={(props) => <TemplateModels {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/notificacoes"
          render={(props) => <Notification {...props} screenSize={screenSize} />}
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
          path="/minha-conta/indicacoes"
          render={(props) => <Referral {...props} screenSize={screenSize} />}
        />
        <Route
          render={(props) => <OrderList {...props} screenSize={screenSize} />}
        />
      </Switch>
    );
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div
        className={cx(
          'container-myaccount',
          isMobile(screenSize) && 'container',
        )}
      >
        {!isMobile(screenSize) && <Sidebar screenSize={screenSize} />}
         {this.renderContainer()}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    screenSize: state.app.screenSize,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(MyAccount);
