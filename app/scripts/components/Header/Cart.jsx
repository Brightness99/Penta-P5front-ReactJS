// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';

import { cartBasicFetch } from 'actions';

type Props = {
  dispatch: () => {},
};

export default class Cart extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(cartBasicFetch());
  }

  static props: Props;

  static state: State;

  render() {
    return (
      <Link to={{ pathname: '/meu-carrinho' }}>
        <SVG src={require('assets/media/svg/icon-cart.svg')} />
      </Link>
    );
  }
}
