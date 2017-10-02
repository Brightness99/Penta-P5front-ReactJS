// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Loading from 'components/Loading';
import { accountOrderFetch } from 'actions';
import { CodeBar, Receipt, ExclamationMark, DocumentDownload, Clipboard, CardsIcon, RepurchaseIcon, WatchIcon } from 'components/Icons';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class OrderList extends React.Component {

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountOrderFetch());
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;
  state: State;

  showDetails = () => {
    
  }

  renderItems() {
    const { account: { orders }, screenSize } = this.props;

    if (orders.list.length <= 0) {
      return <p>There are no orders</p>;
    }

    if (isMobile(screenSize)) {
      return orders.list.map((item) => (
        <div className="box-detailsOrder delivered" key={item.info.id}>
          <div className="box-firstPart">
            <div>
              <p className="title-myorderMobile">Pedido</p>
              <p className="subtitle-myorderMobile">Nº {item.info.id}</p>
            </div>
          </div>
          <span className="detach" />
          <div className="box-secondPart">
            <div className="box-secondPart-mobile">
              <div>
                <i><Clipboard /></i>
              </div>
              <div>
                <p className="title-secondPart">Itens do pedido</p>
                <p className="txt-secondPart">{item.items_label}</p>
              </div>
            </div>
            <div className="box-statusMobile">
              <div className="box-secondPart-mobile">
                <div>
                  <i><CodeBar /></i>
                </div>
                <div>
                  <p className="title-statusMobile">{item.status_label}</p>
                  <p className="subtitle-statusMobile">{item.status_value}</p>
                </div>
              </div>
            </div>
            <div>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#">
                <i><CodeBar /></i>
                <span>{item.actions.invoice.label}</span>
              </Link>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#">
                <i><Receipt /></i>
                <span>{item.actions.upload.label}</span>
              </Link>
              <Link className="btn-default btn-secondary fnt-bold btn-lg" to="#">{item.actions.details.label}</Link>
            </div>
          </div>
        </div>
      ));
    }

    return orders.list.map((item) => (
      <div className={cx('box-detailsOrder', {
        delivered: item.status_value === 'Em andamento',
        pendingPayment: item.status_value === 'Aguardando pagamento',
        inTransport: item.status_value === ''
      })} key={item.info.id}>
        <div className="box-firstPart">
          <div>
            <p>{item.info.id}</p>
          </div>
          <div>
            <p>{item.date_value}</p>
          </div>
          <div className="flagOrder">
            <p>{item.status_value}</p>
          </div>
          <div className="box-icons">
            <div className="icons">
              <Link to="#" className="btn-icons">
                {item.actions.invoice.label}
              </Link>
              <Link to="#" className="btn-icons">
                {item.actions.upload.label}
              </Link>
            </div>
            <Link to={`/minha-conta/pedidos/${item.info.id}`} className="icons align-text" onClick={this.showDetails}>{item.actions.details.label}</Link>
          </div>
        </div>
        <div className="box-secondPart">
          <div className="box-images">
            <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
            <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
            <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
          </div>
          <div>
            <p className="title-secondPart">Itens do pedido</p>
            <p className="txt-secondPart">{item.items_label}</p>
          </div>
          <div>
            <p className="title-secondPart">Valor total</p>
            <p className="txt-secondPart">R$ {item.info.total_price}</p>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { account: { orders }, screenSize } = this.props;

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
      },
    ];
    return (
      <div className="container-myorder">
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <h2>Minha conta</h2>
        <h3 className="subtitle-myorder">Meus pedidos</h3>
        <p className="legend-myorder">Acompanhe os status do seus pedidos</p>
        {!isMobile(screenSize) && (<ul className="box-tableOrder">
          <li>Nº do pedido</li>
          <li>Realizado em</li>
          <li>Status</li>
          <li>Ações</li>
        </ul>)}
        {!orders.isLoaded || orders.isRunning ? <Loading /> : this.renderItems()}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
