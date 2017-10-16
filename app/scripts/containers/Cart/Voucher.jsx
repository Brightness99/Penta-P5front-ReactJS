// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { InputAction } from 'atoms/Inputs';
import { PageTitle } from 'atoms/Titles';
import { TagIcon, TicketIcon, TimesCircleIcon } from 'components/Icons';
import { cartVoucherAddFetch, cartVoucherRemoveFetch } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  isActive: string,
  locale: {},
  voucher: {},
  dispatch: () => {},
  handleVoucherToggle: () => {},
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
    const { locale, voucher: { voucher_name } } = this.props;
    return !voucher_name
      ? <InputAction name="voucher" onSubmit={this.handleVoucherSubmit} placeholder={locale.PLACEHOLDER} />
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

  handleVoucher = () => {
    const { handleVoucherToggle } = this.props;

    if (typeof handleVoucherToggle === 'function') {
      handleVoucherToggle();
    }
  };

  renderInactiveVoucher() {
    const { locale } = this.props;
    return (
      <div className="org-cart-voucher-inactive">
        <TagIcon />
        <div className="mol-cart-voucher-text">
          <PageTitle>{locale.TEXT_TITLE}</PageTitle>
          <span>
            {locale.TEXT}
            <button
              onClick={this.handleVoucher}
              className="atm-button-cart-voucher"
            >
              {locale.LINK_TEXT}
            </button>
          </span>
        </div>
      </div>
    );
  }

  renderActiveVoucher() {
    const { locale, voucher } = this.props;
    return (
      <div
        className={cx(
          'org-cart-ticket',
          voucher.voucher_name && 'org-cart-ticket--valid',
          voucher.error.status && 'org-cart-ticket--invalid'
        )}
      >
        <TicketIcon />
        <div className="mol-cart-voucher-ticket-body">
          <div className="mol-cart-voucher-ticket-text">
            <span>{locale.TEXT_TITLE}</span>
            <p>{locale.TEXT}</p>
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
    const { isActive, locale } = this.props;

    return (
      <div className="org-cart-voucher">
        <div className="mol-cart-voucher-title">
          <div className="atm-cart-title">{locale.TITLE}</div>
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
