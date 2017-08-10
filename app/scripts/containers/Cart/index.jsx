// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { cartFetch } from 'actions';

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

type State = {
  isVoucherActive: boolean,
};

export class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVoucherActive: false,
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(cartFetch());
  }

  static props: Props;

  handleVoucherToggle = () => {
    const { isVoucherActive } = this.state;

    this.setState({
      isVoucherActive: !isVoucherActive,
    });
  };

  renderContent() {
    const { app: { screenSize } } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }

  renderDesktop() {
    const { app: { screenSize }, cart: { data: { prices, items, zipcode }, count }, dispatch } = this.props;
    const { isVoucherActive } = this.state;

    return (
      <div>
        <main className="mol-cart-content">
          <CartItens screenSize={screenSize} items={items} zipcode={zipcode} dispatch={dispatch} />
          <CartCrossSell screenSize={screenSize} />
          <div className="mol-cart-desktop-summary">
            <CartVoucher screenSize={screenSize} isActive={isVoucherActive} />
            <CartSummary
              screenSize={screenSize}
              totalItems={count}
              prices={prices}
              isVoucherActive={isVoucherActive}
              handleVoucherToggle={this.handleVoucherToggle}
            />
          </div>
          <CartFooter screenSize={screenSize} dispatch={dispatch} />
        </main>
      </div>
    );
  }

  renderMobile() {
    const { app: { screenSize }, cart: { data: { prices, items, zipcode }, count }, dispatch } = this.props;
    const { isVoucherActive } = this.state;

    return (
      <main>
        <CartItens screenSize={screenSize} items={items} zipcode={zipcode} dispatch={dispatch} />
        <CartVoucher screenSize={screenSize} isActive={isVoucherActive} />
        <CartSummary
          screenSize={screenSize}
          totalItems={count}
          prices={prices}
          isVoucherActive={isVoucherActive}
          handleVoucherToggle={this.handleVoucherToggle}
        />
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
