// @flow

import React from 'react';
import config from 'config';

type Props = {
  file: string,
  alt: string,
};

const failbackImage = `${config.basePath}assets/final/img/blue-logo.png`;

const ProductImage = (props: Props) => {
  const { file, alt } = props;

  const productImage = file ? `${config.basePath}files/${file}` : failbackImage;

  return (
    <div className="atm-cart-product-image">
      <img src={productImage} alt={alt} />
    </div>
  );
};

export default ProductImage;
