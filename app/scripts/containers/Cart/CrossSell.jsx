// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import { IntlMoney } from 'components/Intl';
import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string,
  locale: {},
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

  renderCrossSell() {
    const { crossSelling, locale } = this.props;

    return (
      <ul className="org-cart-cross-sell">
        {crossSelling.map((product) => (
          <li key={product.slug} className="mol-product-card">
            <NavLink to={`/produto-${product.slug}`}>
              <img src={`http://dev-cms.printi.com.br/${product.image_small.file}`} alt={product.image_small.alt} />
              <div>
                <div className="atm-card-title">{product.title}</div>
                <div className="atm-card-text">{locale.FROM_PRICE} <IntlMoney>{parseFloat(product.minimum_price)}</IntlMoney>
                </div>
              </div>
              <div className="atm-card-button">{locale.LABEL}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  renderMobile() {
    return null;
  }

  renderDesktop() {
    const { locale } = this.props;

    return (
      <div className="org-cross-sell">
        <PageTitle>{locale.TITLE}</PageTitle>
        {this.renderCrossSell()}
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
