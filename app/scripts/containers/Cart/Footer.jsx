// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { FileTextOIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  dispatch: () => {},
};

export default class CartFooter extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

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
        <NavLink to="/pagamento" className="atm-button-rounded atm-button-rounded--enabled">CONTINUAR</NavLink>
      </div>
    );
  }

  renderMobile() {
    return (
      <div className="org-cart-footer">
        <NavLink to="/" className="atm-cart-shopping">Continuar comprando</NavLink>
        <NavLink
          to="http://dev-cms.printi.com.br/v1/customers/pdf_quotation/download"
          target="new"
          className="atm-button-transparent"
        >
          <FileTextOIcon /> Baixar Orçamento
        </NavLink>
        <NavLink to="/pagamento" className="atm-button-rounded atm-button-rounded--enabled atm-button-stick-bottom">CONTINUAR</NavLink>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
