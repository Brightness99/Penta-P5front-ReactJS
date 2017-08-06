// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { InputAction } from 'molecules/Inputs';

type Props = {
  screenSize: string,
};

type State = {
};

export default class CartVoucher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderDesktop() {
    return null;
  }

  renderMobile() {
    return (
      <div className="org-cart-section">
        <div className="mol-cart-section-title">
          <div className="atm-cart-title">cupom de desconto</div>
        </div>
        <InputAction placeholder="Adicionar código" />
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
