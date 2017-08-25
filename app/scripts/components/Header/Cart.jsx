// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import { CartIcon } from 'components/Icons';

import { cartBasicFetch } from 'actions';

type Props = {
  totalCartItems: number,
  dispatch: () => {},
};

export default class Cart extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(cartBasicFetch());
  }

  static props: Props;

  render() {
    const { totalCartItems } = this.props;
    return (
      <div className="mol-cart-icon">
        <NavLink to="/meu-carrinho">
          <CartIcon />
        </NavLink>
        {totalCartItems > 0 && <div className="atm-cart-icon-total">{totalCartItems}</div>}
      </div>
    );
  }
}
