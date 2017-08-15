// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

import Header from './Header';

type Props = {
};

type State = {
  activeStep: number,
};

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 3,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleHeaderNavigation = (ev) => {
    this.setState({
      activeStep: parseInt(ev.currentTarget.value, 10),
    });
  };

  render() {
    const { activeStep } = this.state;
    return (
      <div className="page-checkout">
        <Header
          onClick={this.handleHeaderNavigation}
          activeStep={activeStep}
        />
        <div className="org-cart-body">
          456
        </div>
      </div>
    );
  }
}
