// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  totalItems: number,
  prices: {},
  isVoucherActive: boolean,
  locale: {},
  handleVoucherToggle: () => {},
};

export default class CartSummary extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderDesktop() {
    const { prices, locale } = this.props;

    return (
      <div className="mol-cart-summary-infos">
        <div>
          <span>{locale.values.SUBTOTAL}:</span>
          <IntlMoney>{prices.total_no_discount || prices.total}</IntlMoney>
        </div>
        <div>
          <span>{locale.values.DISCOUNT}:</span>
          <span>-{prices.discount ? <IntlMoney>{prices.discount.total}</IntlMoney> : '--'}</span>
        </div>
        <div className="mol-cart-summary-total">
          <span>{locale.values.TOTAL}</span>
          <IntlMoney className="atm-cart-price atm-cart-price--large">{prices.total}</IntlMoney>
        </div>
      </div>
    );
  }

  renderMobile() {
    const { totalItems, prices, locale } = this.props;

    return (
      <div className="org-cart-summary">
        <div className="mol-cart-summary-title">
          {locale.sidebar.TITLE}
        </div>
        <div className="mol-cart-summary-infos">
          <div>
            <span>{locale.sidebar.NUMBER_TEXT}:</span>
            <span>{`${totalItems} ${totalItems > 1 ? locale.sidebar.ITEMS : locale.sidebar.ITEM}`}</span>
          </div>
          <div>
            <span>{locale.values.SUBTOTAL}:</span>
            <span><IntlMoney>{prices.total_no_discount || prices.total}</IntlMoney></span>
          </div>
          <div>
            <span>{locale.values.DISCOUNT}:</span>
            <span>-{prices.discount ? <IntlMoney>{prices.discount.total}</IntlMoney> : '--'}</span>
          </div>
        </div>
        <hr />
        <div className="mol-cart-summary-total">
          <span>{locale.values.TOTAL}</span>
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
