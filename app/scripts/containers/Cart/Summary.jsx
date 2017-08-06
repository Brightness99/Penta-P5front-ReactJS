// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  totalItems: number,
  totalPrice: number,
};

type State = {
};

export default class CartSummary extends React.Component {
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
    const { totalItems, totalPrice } = this.props;

    return (
      <div className="org-cart-summary">
        <div className="mol-cart-summary-title">
          Resumo do seu carrinho <span className="atm-cart-totalItems">({totalItems} itens)</span>
        </div>
        <div className="mol-cart-summary-off">
          <div>subtotal <IntlMoney>{150}</IntlMoney></div>
          <div>desconto <IntlMoney>{-30}</IntlMoney></div>
        </div>
        <div className="mol-cart-summary-total">
          Total <IntlMoney>{totalPrice}</IntlMoney>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
