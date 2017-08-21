// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import { IntlMoney } from 'components/Intl';
import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string,
  crossSelling: {},
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
    const { crossSelling } = this.props;
    return (
      <div className="org-cross-sell">
        <PageTitle>Quem comprou também viu</PageTitle>
        <ul className="org-cart-cross-sell">
          {crossSelling.map((product) => {
            return (
              <li className="mol-product-card">
                <NavLink to={`/produto-${product.slug}`}>
                  <img src={`http://printi.com.br/${product.image_small.file}`} alt={product.image_small.alt} />
                  <div>
                    <div className="atm-card-title">{product.title}</div>
                    <div className="atm-card-text">A partir de <IntlMoney>{parseFloat(product.minimum_price)}</IntlMoney>
                    </div>
                  </div>
                  <div className="atm-card-button">ver mais</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
