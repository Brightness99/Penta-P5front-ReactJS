// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { cartFetch, cartPickupFetch } from 'actions';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import StickBar from 'components/StickBar';

import { PageTitle } from 'atoms/Titles';
import Loading from 'components/Loading';
import CartEmpty from './Empty';
import CartCrossSell from './CrossSell';
import CartFooter from './Footer';
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
    const { cart: { voucher, use_pickup_places, pickup_place_id }, dispatch } = this.props;

    if (voucher.voucher_name) {
      this.setState({
        isVoucherActive: true,
      });
    }

    dispatch(cartFetch());

    if (use_pickup_places) {
      dispatch(cartPickupFetch(pickup_place_id));
    }

  }

  componentWillUpdate(nextProps) {
    const { cart: { voucher, data: { use_pickup_places } }, dispatch } = this.props;
    const nextCart = nextProps.cart;

    if (nextCart.voucher.voucher_name && voucher.voucher_name !== nextCart.voucher.voucher_name ) {
      this.setState({
        isVoucherActive: true,
      });
    }

    if (nextCart.data.use_pickup_places && nextCart.data.use_pickup_places !== use_pickup_places) {
      dispatch(cartPickupFetch(nextCart.data.pickup_place_id));
    }
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
    const { app: { screenSize }, cart: { data: { prices, items, zipcode, use_pickup_places, pickup_place_id }, voucher, count, pickupPlaces, crossSelling }, dispatch } = this.props;
    const { isVoucherActive } = this.state;

    return (
      <div className="page-cart-content">
        <main className="mol-cart-content">
          <CartItens
            screenSize={screenSize}
            items={items}
            zipcode={zipcode}
            dispatch={dispatch}
            usePickupPlaces={use_pickup_places}
            pickupPlaces={pickupPlaces}
            pickupPlaceId={pickup_place_id}
          />
          <CartCrossSell screenSize={screenSize} crossSelling={crossSelling} />
          <div className="mol-cart-desktop-summary">
            <CartVoucher
              screenSize={screenSize}
              isActive={isVoucherActive}
              dispatch={dispatch}
              voucher={voucher}
              handleVoucherToggle={this.handleVoucherToggle}
            />
            <CartSummary
              screenSize={screenSize}
              totalItems={count}
              prices={prices}
            />
          </div>
          <CartFooter screenSize={screenSize} dispatch={dispatch} />
        </main>
        <StickBar>
          <div className="org-cart-stickbar">
            <div className="atm-cart-sidebar-title">Resumo do carrinho</div>
            <div className="mol-cart-sidebar-summary">
              <CartSummary
                screenSize={screenSize}
                totalItems={count}
                prices={prices}
              />
            </div>
          </div>
          <NavLink to="/pagamento" className="atm-button-rounded atm-button-rounded--enabled">finalizar compra</NavLink>
        </StickBar>
      </div>
    );
  }

  renderMobile() {
    const { app: { screenSize }, cart: { data: { prices, items, zipcode, use_pickup_places }, voucher, count, pickupPlaces, crossSelling }, dispatch } = this.props;
    const { isVoucherActive } = this.state;

    return (
      <main>
        <CartItens
          screenSize={screenSize}
          items={items}
          zipcode={zipcode}
          dispatch={dispatch}
          usePickupPlaces={use_pickup_places}
          pickupPlaces={pickupPlaces}
        />
        <CartSummary
          screenSize={screenSize}
          totalItems={count}
          prices={prices}
        />
        <CartVoucher
          screenSize={screenSize}
          isActive={isVoucherActive}
          dispatch={dispatch}
          voucher={voucher}
          handleVoucherToggle={this.handleVoucherToggle}
        />
        <CartFooter screenSize={screenSize} />
      </main>
    );
  }

  render() {
    const { cart: { count, isRunning, isLoaded, data } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Seu carrinho',
      },
    ];

    if ((isRunning || !isLoaded) && !data.items) {
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
