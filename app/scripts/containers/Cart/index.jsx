// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { cartFetch, cartAddFetch } from 'actions';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';
import Loading from 'components/Loading';
import CartEmpty from './Empty';
import CartCrossSell from './CrossSell';
import CartFooter from './Footer';
import CartHeader from './Header';
import CartItens from './Itens';
import CartSummary from './Summary';
import CartVoucher from './Voucher';

type Props = {
  app: {},
  cart: {},
  dispatch: () => {}
};

export class Cart extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(cartFetch());
  }

  static props: Props;

  handleFakeAddToCart = () => {
    const { dispatch } = this.props;

    dispatch(cartAddFetch());
  };

  renderContent() {
    const { app: { screenSize } } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }

  renderDesktop() {
    const { app: { screenSize }, cart: { data: { prices, items, zipcode }, count }, dispatch } = this.props;

    return (
      <div>
        <main className="mol-cart-content">
          <CartHeader screenSize={screenSize} totalPrice={prices.total} totalItems={count} />
          <CartItens screenSize={screenSize} items={items} zipcode={zipcode} dispatch={dispatch} />
          <CartCrossSell screenSize={screenSize} />
          <CartVoucher screenSize={screenSize} />
          <CartSummary screenSize={screenSize} totalItems={count} totalPrice={prices.total} />
          <CartFooter screenSize={screenSize} />
        </main>
      </div>
    );
  }

  renderMobile() {
    const { app: { screenSize }, cart: { data: { prices, items, zipcode }, count }, dispatch } = this.props;

    return (
      <main>
        <CartHeader screenSize={screenSize} totalPrice={prices.total} totalItems={count} />
        <CartItens screenSize={screenSize} items={items} zipcode={zipcode} dispatch={dispatch} />
        <CartVoucher screenSize={screenSize} />
        <CartSummary screenSize={screenSize} totalItems={count} totalPrice={prices.total} />
        <CartFooter screenSize={screenSize} />
      </main>
    );
  }

  render() {
    const { cart: { count, isRunning, isLoaded } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Seu carrinho',
      },
    ];

    if (isRunning || !isLoaded) {
      return (<Loading />);
    }

    return (
      <div className="page-cart container">
        <Breadcrumbs links={breadcrumb} />
        <PageTitle>Seu Carrinho</PageTitle>
        { count > 0 ? this.renderContent() : <CartEmpty /> }
        <button onClick={this.handleFakeAddToCart}>Add product to cart</button>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    app: state.app,
    cart: state.cart,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
