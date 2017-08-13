// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { TextButton } from 'atoms/Buttons';
import { InputAction } from 'atoms/Inputs';
import { PageTitle } from 'atoms/Titles';
import { TagIcon, TicketIcon, TimesCircleIcon } from 'components/Icons';
import { cartVoucherAddFetch, cartVoucherRemoveFetch } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  isActive: string,
  voucher: {},
  dispatch: () => {},
};

export default class CartVoucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: true,
    };
  }

  static defaultProps = {
    isActive: false,
    voucher: {},
  };

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleVoucherRemoval = () => {
    const { voucher: { voucher_name }, dispatch } = this.props;

    dispatch(cartVoucherRemoveFetch(voucher_name));
  };

  handleState() {
    const { voucher: { voucher_name } } = this.props;
    return !voucher_name
      ? <InputAction name="voucher" onSubmit={this.handleVoucherSubmit} placeholder="Código..." />
      : (<div className="mol-voucher-input-simulate">
        <span className="atm-voucher-input-text">{voucher_name}</span>
        <button onClick={this.handleVoucherRemoval}><TimesCircleIcon /></button>
      </div>);
  }

  handleVoucherSubmit = (ev) => {
    ev.preventDefault();

    const { dispatch } = this.props;

    dispatch(cartVoucherAddFetch(ev.currentTarget.voucher.value));
  };

  renderInactiveVoucher() {
    return (
      <div className="org-cart-voucher-inactive">
        <TagIcon />
        <div className="mol-cart-voucher-text">
          <PageTitle>Tem um cupom de desconto?</PageTitle>
          <span>Adicione o código e garanta seu desconto. <a href="#test" title="123">Confira cupons disponíveis</a></span>
        </div>
      </div>
    );
  }

  renderActiveVoucher() {
    const { voucher } = this.props;
    return (
      <div className={cx(
        'org-cart-ticket',
        voucher.voucher_name && 'org-cart-ticket--valid',
        voucher.error.status && 'org-cart-ticket--invalid'
      )}>
        <TicketIcon />
        <div className="mol-cart-voucher-ticket-body">
          <div className="mol-cart-voucher-ticket-text">
            <span>Tem um cupom de desconto?</span>
            <p>Adicione o código e garanta seu desconto</p>
          </div>
          {this.handleState()}
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { isActive } = this.props;

    return (
      <div className="org-cart-voucher">
        {isActive ? this.renderActiveVoucher() : this.renderInactiveVoucher()}
      </div>
    );
  }

  renderMobile() {
    const { isActive } = this.props;

    return (
      <div className="org-cart-voucher">
        <div className="mol-cart-voucher-title">
          <div className="atm-cart-title">cupom de desconto</div>
          <TextButton>Ver cupons</TextButton>
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
