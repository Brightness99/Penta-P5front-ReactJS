// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'components/Icons';

type Props = {
};

const EmptyCart = (props: Props) => (
  <div className="mol-cart-empty">
    Seu carrinho está vazio!
    <Link to={{ pathname: '/' }}><ChevronLeftIcon />Voltar para a home</Link>
  </div>
);
export default EmptyCart;
