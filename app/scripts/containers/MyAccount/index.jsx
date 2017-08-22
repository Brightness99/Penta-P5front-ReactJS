// @flow

import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import OrderList from './OrderList';
import OrderListDetails from './OrderListDetails';
import MyAddresses from './MyAddresses';
import CardsAccount from './CardsAccount';
import TemplateModels from './TemplateModels';
import Cloud from './Cloud';
import Loyalty from './Loyalty';
import CustomerData from './CustomerData';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
};

export class MyAccount extends React.Component {
  static props: Props;

  renderMobile() {
    const { app: { screenSize } } = this.props;
    // <OrderList screenSize={screenSize} />
    // <OrderListDetails screenSize={screenSize} />
    // <MyAddresses screenSize={screenSize} />
    // <TemplateModels screenSize={screenSize} />
    // <Loyalty screenSize={screenSize} />
    return (
      <div className="container-myaccount">
        <CustomerData screenSize={screenSize} />
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
    // <CustomerData screenSize={screenSize} />
    const { app: { screenSize } } = this.props;
    return (
      <div className="container-myaccount">
        <Sidebar screenSize={screenSize} />
        <CustomerData screenSize={screenSize} />
      </div>
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
