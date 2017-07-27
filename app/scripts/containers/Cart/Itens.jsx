// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

type Props = {
  screenSize: string,
};

type State = {
};

export default class CartItens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderDesktop() {
    return <table />;
  }

  renderMobile() {
    return (
      <ul>
        <li className="mol-cart-item">
          Arte 1
        </li>
        <li className="mol-cart-item">
          Arte 1
        </li>
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
