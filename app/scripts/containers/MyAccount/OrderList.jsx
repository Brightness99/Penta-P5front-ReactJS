// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { accountOrdersFetch } from 'actions';
import Loading from 'components/Loading';
import Tooltip from 'components/Tooltipster';
import { CodeBar, ImageFileIcon, NFIcon, Clipboard } from 'components/Icons';
import { IntlDate, IntlMoney } from 'components/Intl';

type Props = {
  screenSize: string,
  account: {},
  orders: {},
  locale: {},
  dispatch: () => {},
  setBreadcrumbs: () => {},
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

    this.handleBreadcrumbs();
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

  handleBreadcrumbs = () => {
    const { setBreadcrumbs, locale } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: locale.TITLE,
        },
      ]);
    }
  };

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
    const { orders, locale } = this.props;
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
                {locale.ticket.ORDER} <span>{locale.ticket.ORDER_NUMBER} {order.info.id}</span>
              </div>
              <span className="detach" />
              <div className="mol-orders-body">
                <div className="mol-orders-items">
                  <Clipboard />
                  <div>
                    {locale.ticket.ORDER_ITEMS}
                    <span>{order.items_label}</span>
                  </div>
                </div>
                <div className="mol-orders-status">
                  <i />
                  <div>
                    {locale.ticket.ORDER_STATUS}
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
            {locale.LOAD_MORE}
          </button>
        </div>
        }
      </div>
    );
  }

  renderDesktop() {
    const { orders, locale } = this.props;
    const { page } = this.state;

    return (
      <div className="org-orders org-orders-desktop">
        <ul className="org-orders-header">
          <li>{locale.ticket.ORDER}</li>
          <li>{locale.ticket.ORDER_DATE}</li>
          <li>{locale.ticket.ORDER_STATUS}</li>
          <li>{locale.order_details.actions.TITLE}</li>
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
                  {locale.ticket.ORDER_ITEMS}
                  <span>{order.items_label}</span>
                </div>
                <div>
                  {locale.ticket.ORDER_TOTAL}
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
              {locale.LOAD_MORE}
            </button>
          </div>
        }
      </div>
    );
  }

  renderItems() {
    const { orders, screenSize, locale } = this.props;

    if (!orders.isLoaded && orders.isRunning) {
      return <Loading />;
    }

    if (orders.list.length <= 0) {
      return (
        <div>
          {locale.NO_ORDERS}
        </div>
      );
    }

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }

  render() {
    const { locale } = this.props;

    return (
      <div>
        <h3 className="atm-myorder-title">{locale.TITLE}</h3>
        <span className="atm-myorder-subtitle">{locale.SUB_TITLE}</span>
        {this.renderItems()}
        <Helmet>
          <title>{locale.seo.PAGE_TITLE}</title>
          <meta name="description" content={locale.seo.META_DESCRIPTION} />
        </Helmet>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    orders: state.account.orders,
    locale: state.locale.translate.account.my_orders,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
