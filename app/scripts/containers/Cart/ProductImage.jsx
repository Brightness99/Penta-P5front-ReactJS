// @flow

import React from 'react';

type Props = {
  thumbnail: string,
  failbackImage: string,
  alt: string,
};

const ProductImage = (props: Props) => {
  const { thumbnail, failbackImage, alt } = props;

  const productImage = !thumbnail || thumbnail === 'assets/final/img/blue-logo.png' ? failbackImage : thumbnail;

  return (
    <div className="atm-cart-product-image">
      <img src={productImage} alt={alt} />
    </div>
  );
};

export default ProductImage;
