// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';

const Cart = () => (
  <Link to={{ pathname: '/meu-carrinho' }}>
    <SVG src={require('assets/media/svg/icon-cart.svg')} />
  </Link>
);

export default Cart;
