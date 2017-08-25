// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import { IntlMoney } from 'components/Intl';
import Slider from 'react-slick';
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

  renderMobile() {
    const { locale, crossSelling } = this.props;

    const sliderSettings = {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '25px',
    };

    return (
      <div className="org-cross-sell">
        <PageTitle>{locale.TITLE}</PageTitle>
        <div className="org-cross-sell-list">
          <Slider {...sliderSettings}>
            {crossSelling.map((product) => (
              <div>
                <div key={product.slug} className="mol-product-card">
                  <NavLink to={`/produto-${product.slug}`}>
                    <img src={`http://dev-cms.printi.com.br/${product.image_small.file}`} alt={product.image_small.alt} />
                    <div>
                      <div className="atm-card-title">{product.title}</div>
                      <div className="atm-card-text">{locale.FROM_PRICE} <IntlMoney>{parseFloat(product.minimum_price)}</IntlMoney>
                      </div>
                    </div>
                    <div className="atm-card-button">{locale.LABEL}</div>
                  </NavLink>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { locale, crossSelling } = this.props;

    return (
      <div className="org-cross-sell">
        <PageTitle>{locale.TITLE}</PageTitle>
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
      </div>
    );
  }

  render() {
    const { screenSize, crossSelling } = this.props;
    if (crossSelling.length <= 0) {
      return null;
    }

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
