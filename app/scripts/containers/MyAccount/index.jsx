// @flow

import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import OrderList from './OrderList';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
};

export class MyAccount extends React.Component {
  static props: Props;

  renderMobile() {
    const { app: { screenSize } } = this.props;
    return (
      <div className="container-myaccount">
        <div className="container">
          <OrderList screenSize={screenSize} />
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;
    return (
      <div className="container-myaccount">
        <Sidebar screenSize={screenSize} />
        <OrderList screenSize={screenSize} />
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
