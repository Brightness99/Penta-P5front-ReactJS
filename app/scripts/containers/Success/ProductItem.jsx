// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import moment from 'moment';
import { IntlMoney } from 'components/Intl';

type Props = {
  screenSize: AppStoreType.screenSize,
  item: Object,
  handleShowingModal: () => void,
};

export class ProductItem extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderDesktop() {
    const { item, handleShowingModal } = this.props;
    return (
      <div className="product-item-row">
        <div className="product-item-col-product">
          <img src={(item.info.thumbnail === '' || !item.info.thumbnail) ? require('assets/media/images/blue-logo.png') : item.info.thumbnail} alt="Product" />
          <div>
            <div>{item.info.alias}</div>
            <div>{item.info.type_alias}</div>
            <div>{item.info.parts[0].format}</div>
            <div>{item.info.parts[0].color} - {item.info.parts[0].stock}</div>
            <div><a onClick={() => handleShowingModal(item)}>Ver mais...</a></div>
          </div>
        </div>
        <div className="product-item-col product-item-col-delivery">
          <div>{(moment(new Date(item.info.expected_delivery_date))).format('DD/MM/YYYY')}</div>
          <div>{item.delivery_zipcode.label}: {item.delivery_zipcode.value}</div>
        </div>
        <div className="product-item-col product-item-col-amount">
          <div>{item.info.quantity}</div>
        </div>
        <div className="product-item-col product-item-col-value">
          <div><IntlMoney>{parseFloat(item.info.price)}</IntlMoney></div>
        </div>
      </div>
    );
  }

  renderMobile() {
    const { item, handleShowingModal } = this.props;
    return (
      <div className="product-item-row">
        <div className="product-item-col product-item-col-product">
          <img src={require('assets/media/images/img.png')} alt="Product" />
          <div>
            <div>{item.info.alias}</div>
            <div>{item.info.type_alias}</div>
            <div>{item.info.parts[0].format}</div>
            <div>{item.info.parts[0].color} - {item.info.parts[0].stock}</div>
            <div><a onClick={() => handleShowingModal(item)}>Ver mais...</a></div>
          </div>
        </div>
        <div className="field">
          <div>ENTREGA</div>
        </div>
        <div className="product-item-col product-item-col-delivery">
          <div>{(moment(new Date(item.info.expected_delivery_date))).format('DD/MM/YYYY')}</div>
          <div>{item.delivery_zipcode.label}: {item.delivery_zipcode.value}</div>
        </div>
        <div className="space-between field">
          <div>QUANTIDADE</div>
          <div>VALOR</div>
        </div>
        <div className="space-between">
          <div className="product-item-col product-item-col-amount">
            <div>{item.info.quantity}</div>
          </div>
          <div className="product-item-col product-item-col-value">
            <div><IntlMoney>{parseFloat(item.info.price)}</IntlMoney></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

export default connect(mapStateToProps)(ProductItem);
