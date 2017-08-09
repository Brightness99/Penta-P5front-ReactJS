// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { FileTextOIcon } from 'components/Icons';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
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
    return (
      <div className="org-cart-stick-footer">
        <div><span>Total</span><IntlMoney className="atm-cart-price">{225}</IntlMoney></div>
        <NavLink to="/pagamento" className="atm-button-rounded atm-button-rounded--enabled">finalizar compra</NavLink>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="org-cart-footer org-cart-footer--desktop">
        <div>
          <NavLink
            to="http://dev-cms.printi.com.br/v1/customers/pdf_quotation/download"
            target="new"
            className="atm-button-transparent"
          >
            <FileTextOIcon /> Baixar Orçamento
          </NavLink>
        </div>
        <NavLink to="/" className="atm-cart-shopping">Continuar comprando</NavLink>
        <NavLink to="/pagamento" className="atm-button-rounded atm-button-rounded--enabled">finalizar compra</NavLink>
      </div>
    );
  }

  renderMobile() {
    return (
      <div className="org-cart-footer org-cart-footer--mobile">
        <NavLink to="/" className="atm-cart-shopping">Continuar comprando</NavLink>
        <NavLink
          to="http://dev-cms.printi.com.br/v1/customers/pdf_quotation/download"
          target="new"
          className="atm-button-transparent"
        >
          <FileTextOIcon /> Baixar Orçamento
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
