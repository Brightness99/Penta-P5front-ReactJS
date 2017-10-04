// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel } from 'components/Icons';
import { accountOrderDetailFetch } from 'actions';
import Loading from 'components/Loading';

type Props = {
  screenSize: string,
  account: {},
  match: {},
  dispatch: () => {},
};

export class OrderListDetails extends React.Component {

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch, match: { params: { orderNumber } } } = this.props;

    dispatch(accountOrderDetailFetch(orderNumber));
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderActionButtons() {
    const { account: { selectedOrder } } = this.props;

    return Object.keys(selectedOrder.actions).map((key) => (
      selectedOrder.actions[key].enabled && <Link to="#" key={key} className="btn-default btn-quarter fnt-bold btn-lg">{selectedOrder.actions[key].label}</Link>
    ));
  }

  renderItemActionButtons(item) {

    return Object.keys(item.actions).map((key) => (
      item.actions[key].enabled && <Link key={key} className="btn-default btn-quarter fnt-sbold btn-lg" to="#"><i><Archive /></i>{item.actions[key].label}</Link>
    ));
  }

  renderSummary() {
    const { account: { selectedOrder } } = this.props;

    return (
      <div>
        <h3 className="subtitle-details">Pedido nº{selectedOrder.info.id}</h3>
        <p className="total-value">Valor total: <span>R$ {selectedOrder.info.total_price}</span></p>
      </div>
    );
  }

  renderWarningMessage() {

    const { account: { selectedOrder } } = this.props;

    return (
      <div className="box-warningDetails">
        <div>
          <i><Warning /></i>
        </div>
        <div>
          <p><span>Atenção!</span> {selectedOrder.messages[0].message}</p>
        </div>
        <div>
          <i><CloseIcon /></i>
        </div>
      </div>
    );
  }

  renderAddressInfo() {
    const { screenSize, account: { selectedOrder } } = this.props;
    const billingAddressInfo = selectedOrder.info.addresses.filter((address) => address.type === 'BILLING');
    const shippingAddressInfo = selectedOrder.info.addresses.filter((address) => address.type === 'SHIPPING');
    
    return (
      <div className="box-paymentDetails-dataDelivery">
        <div className="box-paymentDetails">
          <div className="box-headerDetails">
            <h4 className="title-details">Dados de pagamento</h4>
            {!isMobile(screenSize) && <Link to="#" className="link-alterDetails"><Change />Alterar</Link>}
          </div>
          <div className="paymentDetails-dataDelivery">
            <div className="details">
              <p className="firstDetail">Nome</p>
              <p className="secondDetail">{billingAddressInfo[0].receiver_name}</p>
            </div>
            <div className="details">
              <p className="firstDetail">Endereço</p>
              <p className="secondDetail">
                {billingAddressInfo[0].street}, {billingAddressInfo[0].number}
                {billingAddressInfo[0].additional_address && ' - ' + billingAddressInfo[0].additional_address}
                {billingAddressInfo[0].neighborhood && billingAddressInfo[0].neighborhood + ', '} {billingAddressInfo[0].state} - {billingAddressInfo[0].zipcode}
              </p>
            </div>
            <div className="details">
              <p className="firstDetail">Cidade/UF</p>
              <p className="secondDetail">{billingAddressInfo[0].city}/{billingAddressInfo[0].state}</p>
            </div>
            <div className="details">
              <p className="firstDetail">CEP</p>
              <p className="secondDetail">{billingAddressInfo[0].zipcode}</p>
            </div>
            <p className="paymentMethod-details">forma de pagamento: <span className="typeMethod">{selectedOrder.payment_method_name}</span></p>
            {isMobile(screenSize) && <Link to="#" className="link-alterDetails--mobile"><Change />Alterar forma de pagamento</Link>}
          </div>
        </div>
        <div className="box-dataDelivery">
          <div className="box-headerDetails">
            <h4 className="title-details">Entrega</h4>
            {!isMobile(screenSize) && <Link to="#" className="link-alterDetails"><Change />Alterar</Link>}
          </div>
          <div className="paymentDetails-dataDelivery">
            <div className="details">
              <p className="firstDetail">Nome</p>
              <p className="secondDetail">{shippingAddressInfo[0].receiver_name}</p>
            </div>
            <div className="details">
              <p className="firstDetail">Endereço</p>
              <p className="secondDetail">
                {shippingAddressInfo[0].street}, {shippingAddressInfo[0].number}
                {shippingAddressInfo[0].additional_address && ' - ' + shippingAddressInfo[0].additional_address}
                {shippingAddressInfo[0].neighborhood && shippingAddressInfo[0].neighborhood + ', '} {shippingAddressInfo[0].state} - {shippingAddressInfo[0].zipcode}
              </p>
            </div>
            <div className="details">
              <p className="firstDetail">Cidade/UF</p>
              <p className="secondDetail">{shippingAddressInfo[0].city}/{shippingAddressInfo[0].state}</p>
            </div>
            <div className="details">
              <p className="firstDetail">CEP</p>
              <p className="secondDetail">{shippingAddressInfo[0].zipcode}</p>
            </div>
            {isMobile(screenSize) && <Link to="#" className="link-alterDetails--mobile"><Change />Alterar dados de entrega</Link>}
          </div>
        </div>
      </div>
    );
  }

  renderMobileProducts() {
    const { account: { selectedOrder } } = this.props;

    return selectedOrder.info.items.map((item) => (
      <div className="box-detailsAboutProduct allright" key={item.info.id}>
        <div className="header-detailsAboutProduct header-detailsAboutProduct--mobile">
          <h4 className="title-detailsAboutProduct">{item.info.alias}</h4>
          <div className="alignTitles--mobile">
            <p className="title-numberOrder">[item nº {item.info.id}]</p>
            <Link to="#">
              + Toque para mais detalhes
            </Link>
          </div>
        </div>
        <div className="box-aboutProduct">
          <div className="box-statusAboutProduct-mobile">
            <ul className="status-aboutProduct scroll-statusMobile">
              <li className="allright">
                <p className="legend-statusProduct">{item.info.customer_status_name}</p>
              </li>
            </ul>
          </div>
          <div className="box-detailsTransport">
            <div className="details-product">
              <div className="detail imageProduct">
                <div className="title-imageProduct--mobile">
                  <p className="title--mobile">Arquivo</p>
                </div>
                <div>
                  <div className="box-imageProduct--mobile">
                    <div>
                      <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                    </div>
                    <div>
                      <h5 className="title-status"><i><CheckIcon /></i>{item.upload_message.title}</h5>
                      <p>{item.upload_message.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail">
                <div className="title-imageProduct--mobile">
                  <p className="title--mobile">Datas</p>
                </div>
                <div>
                  <div className="box-calendarProduct--mobile">
                    <div className="icon-calendarProduct">
                      <CalendarIcon />
                    </div>
                    <div className="text-calendarProduct">
                      <p>Previsão de entrega</p>
                      <p className="title-data">{(moment(new Date(item.info.expected_delivery_date))).format('DD/MM/YYYY')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail">
                <div className="title-imageProduct--mobile">
                  <p className="title--mobile">Ações</p>
                </div>
                <div>
                  {this.renderItemActionButtons(item)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  renderDesktopProducts() {
    const { account: { selectedOrder } } = this.props;

    return selectedOrder.info.items.map((item) => (
      <div className="box-detailsAboutProduct allright" key={item.info.id}>
        <div className="header-detailsAboutProduct">
          <h4 className="title-detailsAboutProduct">{item.info.alias}</h4>
          <p className="title-numberOrder">[item nº {item.info.id}]</p>
          <Link to="#">
            + Mais detalhes
          </Link>
        </div>
        <div className="box-aboutProduct">
          <ul className="status-aboutProduct">
            <li className="allright">{item.info.customer_status_name}</li>
          </ul>
          <div className="box-detailsTransport">
            <ul className="titlesDetails-product">
              <li>Arquivo</li>
              <li>Datas</li>
              <li>Ações</li>
            </ul>
            <div className="details-product">
              <div className="detail imageProduct">
                <div>
                  <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                </div>
                <div>
                  <h5 className="title-status"><i><CheckIcon /></i>{item.upload_message.title}</h5>
                  <p>{item.upload_message.message}</p>
                </div>
              </div>
              <div className="detail">
                <p className="title-data">{(moment(new Date(item.info.expected_delivery_date))).format('DD/MM/YYYY')}</p>
                <p>Previsão de entrega</p>
              </div>
              <div className="detail">
                {this.renderItemActionButtons(item)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  renderMobile() {

    const { account: { selectedOrder } } = this.props;

    return (
      <div className="container">
        <div className="box-headerDetails headerDetails--mobile">
          {this.renderSummary()}
          <div>
            <Link to="#"><i><ArrowCarousel /></i>Voltar</Link>
          </div>
        </div>
        {selectedOrder.messages[0] && this.renderWarningMessage()}
        <div className="btns-details">
          {this.renderActionButtons()}
        </div>
        {this.renderAddressInfo()}
        {this.renderMobileProducts()}
        <Link to="#" className="btn-default btn-quarter btn-xs fnt-bold">Carregar todos produtos (2)</Link>
      </div>
    );
  }

  renderDesktop() {

    const { account: { selectedOrder } } = this.props;

    return (
      <div>
        <div className="box-headerDetails">
          {this.renderSummary()}
          <div className="btns-details">
            {this.renderActionButtons()}
          </div>
        </div>
        {selectedOrder.messages[0] && this.renderWarningMessage()}
        {this.renderAddressInfo()}
        {this.renderDesktopProducts()}
      </div>
    );
  }

  render() {
    const { screenSize, account: { selectedOrder } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus pedidos',
        url: '/minha-conta/meus-pedidos',
      },
      {
        title: 'Pedido nº' + (selectedOrder.info && selectedOrder.info.id),
      },
    ];

    return (
      <section className="container-myaccountdetails">
        {!isMobile(screenSize) && selectedOrder.isLoaded && !selectedOrder.isRunning && <Breadcrumbs links={breadcrumb} />}
        <h2>Minha conta</h2>
        {!selectedOrder.isLoaded || selectedOrder.isRunning ? <Loading /> : (isMobile(screenSize) ? this.renderMobile() : this.renderDesktop())}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListDetails);
