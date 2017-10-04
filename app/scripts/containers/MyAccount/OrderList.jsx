// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { accountOrdersFetch } from 'actions';
import Loading from 'components/Loading';
import Tooltip from 'components/Tooltipster';
import { CodeBar, Receipt, ImageFileIcon, NFIcon, Clipboard } from 'components/Icons';
import { IntlDate, IntlMoney } from 'components/Intl';
import { PageTitle } from 'atoms/Titles';

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
      <div className="org-orders org-orders-mobile">
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
      <div className="org-orders org-orders-desktop">
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
      <div className="container-myaccount-content">
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <PageTitle>Minha conta</PageTitle>
        <h3 className="atm-myorder-title">Meus pedidos</h3>
        <span className="atm-myorder-subtitle">Acompanhe os status do seus pedidos</span>
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
