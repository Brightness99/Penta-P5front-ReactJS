// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import config from 'config';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { FileTextOIcon } from 'components/Icons';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  locale: {},
  totalPrice: number,
  dispatch: () => {},
};

export default class CartFooter extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.handleResize();
  }

  static componentWillUnmount() {
    document.querySelector('body').classList.remove('has-stick-footer');
  }

  componentWillUpdate(nextProps) {
    if (isMobile(nextProps.screenSize) !== isMobile(this.props.screenSize)) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('has-stick-footer');
  }

  handleResize = () => {
    const { screenSize } = this.props;

    if (isMobile(screenSize)) {
      document.querySelector('body').classList.add('has-stick-footer');
    } else {
      document.querySelector('body').classList.remove('has-stick-footer');
    }
  }

  static props: Props;

  renderStickFooter() {
    const { locale, totalPrice } = this.props;

    return (
      <div className="org-cart-stick-footer">
        <div>
          <span>{locale.sidebar.TOTAL}</span>
          <IntlMoney className="atm-cart-price">{totalPrice}</IntlMoney>
        </div>
        <NavLink
          to="/pagamento"
          className="atm-button-rounded atm-button-rounded--enabled"
        >
          {locale.seo.PROCEED_TO_CHECKOUT}
        </NavLink>
      </div>
    );
  }

  renderDesktop() {
    const { locale } = this.props;

    return (
      <div className="org-cart-footer org-cart-footer--desktop">
        <div>
          <NavLink
            to={`${config.basePath}v1/customers/pdf_quotation/download`}
            target="new"
            className="atm-button-transparent"
          >
            <FileTextOIcon /> {locale.seo.DOWNLOAD_QUOTATION}
          </NavLink>
        </div>
        <NavLink to="/" className="atm-cart-shopping">{locale.seo.KEEP_BUYING}</NavLink>
        <NavLink
          to="/pagamento"
          className="atm-button-rounded atm-button-rounded--enabled"
        >
          {locale.seo.PROCEED_TO_CHECKOUT}
        </NavLink>
      </div>
    );
  }

  renderMobile() {
    const { locale } = this.props;

    return (
      <div className="org-cart-footer org-cart-footer--mobile">
        <NavLink to="/" className="atm-cart-shopping">{locale.seo.KEEP_BUYING}</NavLink>
        <NavLink
          to={`${config.basePath}v1/customers/pdf_quotation/download`}
          target="new"
          className="atm-button-transparent"
        >
          <FileTextOIcon /> {locale.seo.DOWNLOAD_QUOTATION}
        </NavLink>
        {this.renderStickFooter()}
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
