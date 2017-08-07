// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  totalPrice: number,
  totalItems: number,
};

export default class CartHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { totalPrice, totalItems } = this.props;
    return (
      <div className="mol-cart-header mol-cart-header--mobile">
        <IntlMoney className="atm-cart-totalPrice">{totalPrice}</IntlMoney>
        <span className="atm-cart-totalItems">({totalItems} itens)</span>
      </div>
    );
  }

  renderDesktop() {
    return null;
  }

  render() {
    const { screenSize } = this.props;
    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
