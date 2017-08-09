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
          Resumo do carrinho
        </div>
        <div className="mol-cart-summary-infos">
          <div>
            <span>Nº de itens:</span>
            <span>{totalItems} itens</span>
          </div>
          <div>
            <span>Subtotal:</span>
            <span><IntlMoney>{225}</IntlMoney></span>
          </div>
          <div>
            <span>Cupom:</span>
            <button className="atm-button-cart-voucher">Adicionar código</button>
          </div>
        </div>
        <hr />
        <div className="mol-cart-summary-total">
          <span>Total</span>
          <IntlMoney className="atm-cart-price atm-cart-price--large">{225}</IntlMoney>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
