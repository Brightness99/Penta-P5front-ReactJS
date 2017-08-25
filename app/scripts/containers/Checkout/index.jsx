// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { connect } from 'react-redux';

import Header from './Header';
import Summary from './Summary';
import Content from './Content';

type Props = {
  app: {
    screenSize: string,
  }
};

type State = {
  activeStep: number,
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleNavigation = (ev) => {
    this.setState({
      activeStep: parseInt(ev.currentTarget.value, 10),
    });
  };

  renderDesktop() {
    const { activeStep } = this.state;
    return (
      <div className="page-checkout">
        <Header
          onClick={this.handleNavigation}
          activeStep={activeStep}
        />
        <div className="org-checkout-body">
          <div className="org-checkout-body-background" />
          <div className="org-checkout-main container">
            <Content
              handleNavigation={this.handleNavigation}
              activePanel={activeStep}
            />
            <Summary />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;

    return isMobile(screenSize) ? null : this.renderDesktop();
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

export default connect(mapStoreToProps, mapDispatchToProps)(Checkout);
