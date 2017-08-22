// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'components/Icons';

type Props = {
  locale: {},
};

const EmptyCart = (props: Props) => {
  const { locale } = this.props;

  return (
    <div className="mol-cart-empty">
      {locale.EMPTY_CART}
      <Link to={{ pathname: '/' }}><ChevronLeftIcon />{locale.GO_TO_HOMEPAGE}</Link>
    </div>
  );
};

export default EmptyCart;
