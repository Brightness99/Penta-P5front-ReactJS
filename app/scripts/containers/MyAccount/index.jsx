// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import Breadcrumbs from 'components/Breadcrumbs';
import Sidebar from './Sidebar';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
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
  locale: AccountLocaleType,
  children: any,
  dispatch: () => {},
};

type State = {
  breadcrumbs: {},
};

export class MyAccount extends React.Component {
  constructor(props: Props) {
    super(props);

    this.defaultBreadcrumbs = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: props.locale.TITLE,
        url: '/minha-conta',
      },
    ];

    this.state = {
      breadcrumbs: this.defaultBreadcrumbs,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  static defaultBreadcrumbs: [];

  handleBreadcrumbs = (breadcrumbs) => {
    this.setState({
      breadcrumbs: this.defaultBreadcrumbs.concat(breadcrumbs),
    });
  };

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
                render={(props) => <OrderDetails {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
              />
              <Route
                render={(props) => <OrderList {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
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
          render={(props) => <CustomerData {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
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
          render={(props) => <OrderList {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
      </Switch>
    );
  }

  render() {
    const { screenSize, locale } = this.props;
    const { breadcrumbs } = this.state;

    return (
      <div
        className={cx(
          'container-myaccount',
          isMobile(screenSize) && 'container',
        )}
      >
        {!isMobile(screenSize) && <Sidebar screenSize={screenSize} />}
        <div className="container-myaccount-content">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumbs} />}
          <PageTitle>{locale.TITLE}</PageTitle>
         {this.renderContainer()}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    screenSize: state.app.screenSize,
    locale: state.locale.translate.account,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(MyAccount);
