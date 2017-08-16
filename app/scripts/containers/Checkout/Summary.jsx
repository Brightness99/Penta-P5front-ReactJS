// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { IntlMoney, IntlDate } from 'components/Intl';

type Props = {
};

type State = {
};

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render() {
    return (
      <div className="org-checkout-summary">
        <div className="atm-checkout-summary-title">
          Resumo do pedido
        </div>
        <ul className="org-checkout-summary-items">
          <li className="mol-checkout-summary-item">
            <div className="mol-checkout-summary-item-resume">
              <div className="mol-checkout-summary-item-image">
                <img src={require('assets/media/images/blue-logo.png')} alt="product" />
              </div>
              <div className="mol-checkout-summary-item-data">
                <div className="atm-checkout-summary-item-data-name">
                  Cartão de visitas
                </div>
                <div className="atm-checkout-summary-item-data-infos">
                  <span>Quantidade 1.000 unidades</span>
                  <span>Previsão de entrega <span>15/08/2017</span></span>
                </div>
              </div>
            </div>
            <div className="atm-checkout-summary-item-price">
              <IntlMoney>{75}</IntlMoney>
            </div>
          </li>
        </ul>
        <div className="mol-checkout-summary-prices">
          <div>
            <span>Sub-total</span>
            <IntlMoney>{350}</IntlMoney>
          </div>
          <div>
            <span>Cupom</span>
            <IntlMoney>{-30}</IntlMoney>
          </div>
        </div>
        <div className="mol-checkout-summary-total">
          <span>
            Total
          </span>
          <IntlMoney className="atm-checkout-total-price">{320}</IntlMoney>
        </div>
      </div>
    );
  }
}
