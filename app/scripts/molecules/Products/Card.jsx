// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import config from 'config';
import { IntlMoney } from 'components/Intl/';

type Props = {
  locale: CommonLocaleType,
  slug: string,
  image?: ImageType,
  title: string,
  price: number,
  className: string,
};

const failbackImage = `${config.basePath}assets/final/img/blue-logo.png`;

const ProductCard = (props: Props) => {
  const { locale, slug, image, title, price, className } = props;

  const productImage = image.file ? `${config.basePath}files/${image.file}` : failbackImage;

  return (
    <div
      className={cx(
        'mol-product-card',
        className,
      )}
    >
      <NavLink to={`/produtos-${slug}`}>
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
