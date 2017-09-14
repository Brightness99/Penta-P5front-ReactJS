// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IntlMoney } from 'components/Intl/';
import { ProductImage } from 'atoms/Product';

type Props = {
  locale: CommonLocaleType,
  slug: string,
  image?: ImageType,
  title: string,
  price: number,
};

const failbackImage = 'http://dev-cms.printi.com.br/assets/final/img/blue-logo.png';

const ProductCard = (props: Props) => {
  const { locale, slug, image, title, price } = props;

  const productImage = image.file ? `http://dev-cms.printi.com.br/files/${image.file}` : failbackImage;

  return (
    <div className="mol-product-card">
      <NavLink to={`/produto-${slug}`}>
        <img className="atm-card-image" src={productImage} alt={image.alt} />
        <div>
          <div className="atm-card-title">{title}</div>
          <div className="atm-card-text">{locale.STARTING_FROM} <IntlMoney>{price ? parseFloat(price) : 0}</IntlMoney>
          </div>
        </div>
        <div className="atm-card-button">{locale.VIEW_MORE_DRY}</div>
      </NavLink>
    </div>
  );
};


/* istanbul ignore next */
function mapStateToProps(state) {
  return ({
    locale: {
      STARTING_FROM: state.locale.translate.common.STARTING_FROM,
      VIEW_MORE_DRY: state.locale.translate.common.VIEW_MORE_DRY,
    },
  });
}

export default connect(mapStateToProps)(ProductCard);
