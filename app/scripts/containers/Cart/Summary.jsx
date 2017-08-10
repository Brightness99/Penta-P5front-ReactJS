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

  handleVoucher = () => {
    const { handleVoucherToggle } = this.props;

    if (typeof handleVoucherToggle === 'function') {
      handleVoucherToggle();
    }
  };

  renderVoucher() {
    const { isVoucherActive, prices: { discount } } = this.props;

    return isVoucherActive
      ? <span>-{discount ? <IntlMoney>{discount.total}</IntlMoney> : '--'}</span>
      : <button onClick={this.handleVoucher} className="atm-button-cart-voucher">Adicionar código</button>;
  }

  renderDesktop() {
    const { prices } = this.props;

    return (
      <div className="mol-cart-summary-infos">
        <div>
          <span>Subtotal:</span>
          <span><IntlMoney>{prices.total_no_discount || prices.total}</IntlMoney></span>
        </div>
        <div>
          <span>Cupom:</span>
          {this.renderVoucher()}
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
            {this.renderVoucher()}
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
