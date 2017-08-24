// @flow

import React from 'react';

import ProductImage from '../ProductImage';

type Props = {
  item: {},
  failbackImage: string,
  locale: {
    TITLE: string,
    ADDITIONAL_OPTIONS: string,
  },
};

const ProductDetailsModal = (props: Props) => {
  const { item, failbackImage, locale } = props;

  const partsKeys = Object.keys(item.product_parts);

  const renderProductDetails = (partTitle: ?string, part: {}) => (
    <div key={partTitle}>
      {partTitle ? <b>{partTitle}: </b> : null}
      {
        Object.keys(part)
          .reduce((prevPart, currentPart) => {
            if (!prevPart) {
              return part[currentPart].name;
            }

            return `${prevPart}, ${part[currentPart].name}`;
          }, '')
      }
    </div>
  );

  return (
    <div className="org-products-details-modal">
      <div className="atm-product-details-modal-title">{locale.TITLE}</div>
      <div className="mol-product-details-modal">
        <ProductImage thumbnail={item.thumbnail} failbackImage={failbackImage} alt={item.final_product.name} />
        <ul className="mol-cart-product-details-body">
          <li>
            <span>{`${item.project_name} - ${item.final_product.name}`}</span>
            {partsKeys.length === 1
              ? renderProductDetails(item.final_product.name, item.product_parts[partsKeys[0]].options)
              : partsKeys.map((partId) => renderProductDetails(item.product_parts[partId].name, item.product_parts[partId].options))
            }
          </li>
          <li>
            <span>{locale.ADDITIONAL_OPTIONS}</span>
            {renderProductDetails('', {
              proof: item.additional_options.proof,
              file_format: item.additional_options.file_format,
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
