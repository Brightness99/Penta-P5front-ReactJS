// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import { IntlMoney } from 'components/Intl';
import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string,
};

type State = {
};

export default class CartCrossSell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderCard() {
    return (
      <NavLink to="/">
        <img src={require('assets/media/images/cart-item.png')} alt="product" />
        <div>
          <div className="atm-card-title">Revista</div>
          <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
        </div>
        <div className="atm-card-button">ver mais</div>
      </NavLink>
    );
  }

  renderMobile() {
    return null;
  }

  renderDesktop() {
    return (
      <div className="org-cross-sell">
        <PageTitle>Quem comprou também viu</PageTitle>
        <ul className="org-cart-cross-sell">
          <li className="mol-product-card">
            <NavLink to="/">
              <img src={require('assets/media/images/cart-item.png')} alt="product" />
              <div>
                <div className="atm-card-title">Revista</div>
                <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
              </div>
              <div className="atm-card-button">ver mais</div>
            </NavLink>
          </li>
          <li className="mol-product-card">
            <NavLink to="/">
              <img src={require('assets/media/images/cart-item.png')} alt="product" />
              <div>
                <div className="atm-card-title">Revista</div>
                <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
              </div>
              <div className="atm-card-button">ver mais</div>
            </NavLink>
          </li>
          <li className="mol-product-card">
            <NavLink to="/">
              <img src={require('assets/media/images/cart-item.png')} alt="product" />
              <div>
                <div className="atm-card-title">Revista</div>
                <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
              </div>
              <div className="atm-card-button">ver mais</div>
            </NavLink>
          </li>
          <li className="mol-product-card">
            <NavLink to="/">
              <img src={require('assets/media/images/cart-item.png')} alt="product" />
              <div>
                <div className="atm-card-title">Revista</div>
                <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
              </div>
              <div className="atm-card-button">ver mais</div>
            </NavLink>
          </li>
          <li className="mol-product-card">
            <NavLink to="/">
              <img src={require('assets/media/images/cart-item.png')} alt="product" />
              <div>
                <div className="atm-card-title">Revista</div>
                <div className="atm-card-text">A partir de <IntlMoney>{29}</IntlMoney></div>
              </div>
              <div className="atm-card-button">ver mais</div>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
