// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  totalItems: number,
  prices: {},
  isVoucherActive: boolean,
  handleVoucherToggle: () => {},
};

export default class CartSummary extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderDesktop() {
    const { prices } = this.props;

    return (
      <div className="mol-cart-summary-infos">
        <div>
          <span>Subtotal:</span>
          <IntlMoney>{prices.total_no_discount || prices.total}</IntlMoney>
        </div>
        <div>
          <span>Cupom:</span>
          <span>-{prices.discount ? <IntlMoney>{prices.discount.total}</IntlMoney> : '--'}</span>
        </div>
        <div className="mol-cart-summary-total">
          <span>Total</span>
          <IntlMoney className="atm-cart-price atm-cart-price--large">{prices.total}</IntlMoney>
        </div>
      </div>
    );
  }

  renderMobile() {
    const { totalItems, prices } = this.props;

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
            <span><IntlMoney>{prices.total_no_discount || prices.total}</IntlMoney></span>
          </div>
          <div>
            <span>Cupom:</span>
            <span>-{prices.discount ? <IntlMoney>{prices.discount.total}</IntlMoney> : '--'}</span>
          </div>
        </div>
        <hr />
        <div className="mol-cart-summary-total">
          <span>Total</span>
          <IntlMoney className="atm-cart-price atm-cart-price--large">{prices.total}</IntlMoney>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
