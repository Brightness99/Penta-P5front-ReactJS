// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { InputAction } from 'molecules/Inputs';
import { PageTitle } from 'atoms/Titles';
import { TagIcon, TicketIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  isActive: string,
  voucher: {},
};

export default class CartVoucher extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static defaultProps = {
    isActive: false,
    voucher: {},
  };

  static props: Props;

  static state: State;

  renderInactiveVoucher() {
    return (
      <div className="org-cart-voucher org-cart-voucher--inactive">
        <TagIcon />
        <div className="mol-cart-voucher-text">
          <PageTitle>Tem um cupom de desconto?</PageTitle>
          <span>Adicione o código e garanta seu desconto. <a href="#test" title="123">Confira cupons disponíveis</a></span>
        </div>
      </div>
    );
  }

  renderActiveVoucher() {
    return (
      <div className="org-cart-ticket">
        <TicketIcon />
        <div className="mol-cart-voucher-ticket-body">
          <div className="atm-cart-voucher-ticket-text">
            <span>Tem um cupom de desconto?</span>
            <span>Adicione o código e garanta seu desconto</span>
          </div>
          <InputAction placeholder="Código..." />
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { isActive } = this.props;

    return isActive ? this.renderActiveVoucher() : this.renderInactiveVoucher();
  }

  renderMobile() {
    const { isActive } = this.props;

    return (
      <div className="org-cart-voucher org-cart-voucher--mobile">
        <div className="mol-cart-voucher-title">
          <div className="atm-cart-title">cupom de desconto</div>
        </div>
        {isActive ? this.renderActiveVoucher() : this.renderInactiveVoucher()}
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
