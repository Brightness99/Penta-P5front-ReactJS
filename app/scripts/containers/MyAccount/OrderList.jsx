// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Loading from 'components/Loading';
import Tooltip from 'components/Tooltipster';
import { accountOrdersFetch } from 'actions';
import { CodeBar, Receipt, ImageFileIcon, NFIcon, Clipboard } from 'components/Icons';
import { IntlDate, IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  account: {},
  orders: {},
  dispatch: () => {},
};

type State = {
  page: number,
};

export class OrderList extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.state;

    dispatch(accountOrdersFetch(page));
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const { page } = this.state;

    if (prevState.page !== page) {
      dispatch(accountOrdersFetch(page));
    }
  }

  static props: Props;

  static state: State;

  handleLoadMore = () => {
    const { page } = this.state;

    this.setState({
      page: page + 1,
    });
  };

  renderItemsO() {
    const { orders } = this.props;

    if (orders.list.length <= 0) {
      return <p>There are no orders</p>;
    }

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

  renderActions(order) {
    const { screenSize } = this.props;

    if (Object.keys(order.actions).length <= 0) {
      return null;
    }

    return (
      <div className="mol-orders-actions">
        {
          Object.keys(order.actions)
            .filter((key) => key !== 'details' && order.actions[key].enabled)
            .slice(0, 2)
            .map((key) => {
              let icon = null;

              switch (key) {
                case 'boleto':
                  icon = <CodeBar />;
                  break;
                case 'invoice':
                  icon = <NFIcon />;
                  break;
                case 'upload':
                  icon = <ImageFileIcon />;
                  break;
                default:
                  icon = null;
                  break;
              }

              if (isMobile(screenSize)) {
                return (
                  <Link
                    to={order.actions[key].path || ''}
                    className="atm-button-transparent"
                    key={key}
                  >
                    {icon}{order.actions[key].label}
                  </Link>
                );
              }

              return (
                <Tooltip
                  key={key}
                  text={order.actions[key].label}
                >
                  <Link to={order.actions[key].path || ''} className="atm-transparent-button">
                    {icon}
                  </Link>
                </Tooltip>
              );
            })
        }
      </div>
    );
  }

  renderMobile() {
    const { orders } = this.props;
    const { page } = this.state;

    return (
      <div className="org-orders-mobile">
        <ul className="org-orders-list">
          {orders.list.map((order) => (
            <li
              key={order.info.id}
              className={order.status_class}
            >
              <div className="mol-orders-header">
                Pedido <span>Nº {order.info.id}</span>
              </div>
              <span className="detach" />
              <div className="mol-orders-body">
                <div className="mol-orders-items">
                  <Clipboard />
                  <div>
                    Itens do pedido
                    <span>{order.items_label}</span>
                  </div>
                </div>
                <div className="mol-orders-status">
                  <i />
                  <div>
                    Status
                    <span>{order.status_value}</span>
                  </div>
                </div>
                {this.renderActions(order)}
                  {order.actions.details.enabled &&
                    <div className="mol-orders-details">
                      <Link
                        to={`/minha-conta/pedidos/${order.info.id}`}
                        className="atm-button-rounded atm-button-rounded--blue"
                      >
                        {order.actions.details.label}
                      </Link>
                    </div>
                  }
              </div>
            </li>
          ))}
          {orders.isLoaded && orders.isRunning && <Loading />}
        </ul>
        {page < Math.ceil(orders.total_count / 10) &&
        <div className="atm-orders-load-more">
          <button
            className="atm-button-transparent"
            onClick={this.handleLoadMore}
          >
            Carregar mais pedidos
          </button>
        </div>
        }
      </div>
    );
  }

  renderDesktop() {
    const { orders } = this.props;
    const { page } = this.state;

    return (
      <div className="org-orders-desktop">
        <ul className="org-orders-header">
          <li>Nº DO PEDIDO</li>
          <li>REALIZADO EM</li>
          <li>STATUS</li>
          <li>AÇÕES</li>
        </ul>
        <ul className="org-orders-list">
          {orders.list.map((order) => (
            <li
              key={order.info.id}
              className={order.status_class}
            >
              <div className="org-orders-list-data">
                <div>{order.info.id}</div>
                <div><IntlDate>{order.info.created_at}</IntlDate></div>
                <div><i />{order.status_value}</div>
                {this.renderActions(order)}
                <div>{order.actions.details.enabled && <Link to={`/minha-conta/pedidos/${order.info.id}`}>{order.actions.details.label}</Link>}</div>
              </div>
              <div className="org-orders-list-expand">
                <div>
                  Itens do pedido
                  <span>{order.items_label}</span>
                </div>
                <div>
                  Valor total
                  <IntlMoney>{order.info.total_price}</IntlMoney>
                </div>
              </div>
            </li>
          ))}
          {orders.isLoaded && orders.isRunning && <Loading />}
        </ul>
        {page < Math.ceil(orders.total_count / 10) &&
          <div className="atm-orders-load-more">
            <button
              className="atm-button-transparent"
              onClick={this.handleLoadMore}
            >
              Carregar mais pedidos
            </button>
          </div>
        }
      </div>
    );
  }

  renderItems() {
    const { orders, screenSize } = this.props;

    console.log('isRunning', orders.isRunning, 'isLoaded', orders.isLoaded);

    if (!orders.isLoaded && orders.isRunning) {
      return <Loading />;
    }

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }

  render() {
    const { screenSize } = this.props;

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
        {this.renderItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    orders: state.account.orders,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
