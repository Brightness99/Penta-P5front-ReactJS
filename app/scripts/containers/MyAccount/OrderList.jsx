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


type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

type State = {
  secondStep: boolean,
};

export class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: false,
    };
  }

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
    const { secondStep } = this.state;
    this.setState({
      secondStep: !secondStep,
    });
  }

  renderItems() {
    const { account: { orders }, screenSize } = this.props;
    const { secondStep } = this.state;

    if (orders.list.length <= 0) {
      return <p>There are no orders</p>;
    }

    if (isMobile(screenSize)) {
      return orders.list.map((item) => (
        <div className="box-detailsOrder delivered" key={item.id}>
          <div className="box-firstPart">
            <div>
              <p className="title-myorderMobile">Pedido</p>
              <p className="subtitle-myorderMobile">Nº {item.id}</p>
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
                <p className="txt-secondPart">{item.item_count} produtos</p>
              </div>
            </div>
            <div className="box-statusMobile">
              <div className="box-secondPart-mobile">
                <div>
                  <i><CodeBar /></i>
                </div>
                <div>
                  <p className="title-statusMobile">status</p>
                  <p className="subtitle-statusMobile">Entregue</p>
                </div>
              </div>
            </div>
            <div>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#">
                <i><CodeBar /></i>
                <span>imprimir boleto</span>
              </Link>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#">
                <i><Receipt /></i>
                <span>enviar comprovante</span>
              </Link>
              <Link className="btn-default btn-secondary fnt-bold btn-lg" to="#">ver detalhes</Link>
            </div>
          </div>
        </div>
      ));
    }

    return orders.list.map((item) => (
      <div className="box-detailsOrder delivered" key={item.id}>
        <div className="box-firstPart">
          <div>
            <p>{item.id}</p>
          </div>
          <div>
            <p>{moment(new Date(item.created_at)).format('DD/MM/YYYY')}</p>
          </div>
          <div className="flagOrder">
            <p>Pedido entregue</p>
          </div>
          <div className="box-icons">
            <div className="icons">
              <Link to="#" className="btn-icons">
                <DocumentDownload />
              </Link>
              <Link to="#" className="btn-icons">
                <RepurchaseIcon />
              </Link>
            </div>
            <Link to="#" className="icons align-text" onClick={this.showDetails}>Ver detalhes</Link>
          </div>
        </div>
        {secondStep && (<div className="box-secondPart">
          <div className="box-images">
            <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
            <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
            <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
          </div>
          <div>
            <p className="title-secondPart">Itens do pedido</p>
            <p className="txt-secondPart">{item.item_count} produtos</p>
          </div>
          <div>
            <p className="title-secondPart">Valor total</p>
            <p className="txt-secondPart">R$ {item.total_price}</p>
          </div>
        </div>)}
      </div>
    ));
  }

  render() {
    const { secondStep } = this.state;
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
        <ul className="box-tableOrder">
          <li>Nº do pedido</li>
          <li>Realizado em</li>
          <li>Status</li>
          <li>Ações</li>
        </ul>
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
