// @flow

import React from 'react';

type Props = {
  file: string,
  alt: string,
};

const failbackImage = 'http://dev-cms.printi.com.br/assets/final/img/blue-logo.png';

const ProductImage = (props: Props) => {
  const { file, alt } = props;

  const productImage = file ? `http://dev-cms.printi.com.br/files/${file}` : failbackImage;

  return (
    <div className="atm-cart-product-image">
      <img src={productImage} alt={alt} />
    </div>
  );
};

export default ProductImage;
