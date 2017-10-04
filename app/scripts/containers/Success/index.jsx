// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { CheckCircleIcon, MyAccountIcon, RefreshIcon } from 'components/Icons';
import { successfulPurchaseFetch } from 'actions';
import Loading from 'components/Loading';
import WarningMessage from './WarningMessage';
import MethodItem from './MethodItem';
import ProductItem from './ProductItem';
import StayTunedItem from './StayTunedItem';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  successfulPurchase: {},
  dispatch: () => {},
  match: {},
};

export class Success extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  componentDidMount() {
    const { dispatch, match: { params: { orderNumber } }  } = this.props;

    dispatch(successfulPurchaseFetch(orderNumber));
  }

  renderSubTotalMobile() {

    const { successfulPurchase } = this.props;

    return (
      <div className="sub-total">
        <div className="mb-total-label">TOTAL</div>
        <div className="mb-total-value">R$ {successfulPurchase.order.info.total_price}</div>
      </div>
    );
  }

  renderSubTotalDesktop() {

    const { successfulPurchase } = this.props;

    return (
      <div className="sub-total">

        <div className="sub-total-row">
          <div className="key">Sub-total</div>
          <div className="value">R$ {successfulPurchase.order.info.total_price}</div>
        </div>

        <div className="sub-total-row">
          <div className="key">Cupom</div>
          <div className="value">R$ {successfulPurchase.order.info.total_discount_price}</div>
        </div>

        <div className="sub-total-row">
          <div className="key">Total</div>
          <div className="value total-value">R$ {successfulPurchase.order.info.total_price}</div>
        </div>

      </div>
    );
  }

  renderActions(actions) {
    return Object.keys(actions).map((key) => (
      actions[key].enabled && <MethodItem buttonText={actions[key].label} key={key} linkText="Copiar código do boleto" />
    ));
  }

  renderProductItems(items) {
    return items.map((item) => (
      <ProductItem item={item} key={item.info.id} />
    ));
  }

  renderStayTunedItems() {
    const { locale } = this.props;

    return locale.translate.page.successful_purchase.sidebar.ITEMS.map((item) => (
      <StayTunedItem text={item} key={item} />
    ));
  }

  render() {

    const { app: { screenSize }, locale, successfulPurchase, match: { params: { orderNumber } } } = this.props;

    const shippingAddressInfo = (successfulPurchase.isLoaded && !successfulPurchase.isRunning) ? successfulPurchase.order.info.addresses.filter((address) => address.type === 'SHIPPING') : {};

    return (
      <section>
        <div className="container">
          {(!successfulPurchase.isLoaded || successfulPurchase.isRunning) && <Loading />}
          {successfulPurchase.isLoaded && !successfulPurchase.isRunning && <div className="template-success">

            <div className="success-message atm-success-text">
              <CheckCircleIcon />
              <span>Pedido nº{successfulPurchase.order.info.id} efetuado com sucesso!</span>
            </div>

            <div>Falta pouco! Agora é só pagar o boleto para finalizar o seu pedido.</div>

            {successfulPurchase.order.messages[0] && <div>
              <WarningMessage message={successfulPurchase.order.messages[0].message} />
            </div>}

            <div className="method-container">
              {this.renderActions(successfulPurchase.order.actions)}
            </div>

            <div className="main-container">

              <div className="product-container">

                <h3>RESUMO DO SEU PEDIDO</h3>

                <div className="product-item-row product-item-header">
                  <div className="product-item-col product-item-col-product">
                    <h4>PRODUTO</h4>
                  </div>

                  <div className="product-item-col product-item-col-delivery">
                    <h4>ENTREGA</h4>
                  </div>

                  <div className="product-item-col product-item-col-amount">
                    <h4>QUANTIDADE</h4>
                  </div>

                  <div className="product-item-col product-item-col-value">
                    <h4>VALOR</h4>
                  </div>
                </div>

                <div className="product-item-body">
                  {this.renderProductItems(successfulPurchase.order.info.items)}
                </div>

                <div className="product-sub-total">
                  {isMobile(screenSize) ? this.renderSubTotalMobile() : this.renderSubTotalDesktop()}
                </div>

              </div>

              <div className="stay-tuned-container">
                <h3>{locale.translate.page.successful_purchase.sidebar.TITLE}</h3>

                <div>
                  {this.renderStayTunedItems()}
                </div>

                <div className="my-account">
                  <Link to={'/minha-conta/pedidos/' + orderNumber}>
                    <MyAccountIcon />
                    <div>MINHA CONTA</div>
                  </Link>
                </div>

                <h3>{locale.translate.page.successful_purchase.sidebar.DELIVERY_ADDRESS}</h3>

                <div className="address">
                  {shippingAddressInfo[0].street}, {shippingAddressInfo[0].number}
                  {shippingAddressInfo[0].additional_address && ' - ' + shippingAddressInfo[0].additional_address}
                  {shippingAddressInfo[0].neighborhood && shippingAddressInfo[0].neighborhood + ', '} {shippingAddressInfo[0].state} - {shippingAddressInfo[0].zipcode}
                </div>

                <div className="delivery-address">
                  <RefreshIcon />
                  <div>Alterar endereço de entrega</div>
                </div>

              </div>

            </div>

          </div>}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    locale: state.locale,
    successfulPurchase: state.successfulPurchase,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Success);

