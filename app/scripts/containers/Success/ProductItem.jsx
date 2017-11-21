// @flow

import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney, IntlDate } from 'components/Intl';
import WarningMessage from './WarningMessage';

type Props = {
  screenSize: AppStoreType.screenSize,
  item: Object,
  handleShowingModal: () => void,
};

export class ProductItem extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  state = {
    imageAspect: 'width',
  };

  handleProductImageSize = ({ target: img }) => {
    if (img.width < img.height) {
      this.setState({
        imageAspect: 'height',
      });
    }
  };

  renderDesktop() {
    const { item, handleShowingModal } = this.props;
    const { imageAspect } = this.state;

    return (
      <div className="product-item-row">
        <div className="product-item-col-product">
          {(item.info.thumbnail === '' || !item.info.thumbnail) && <img className="preview" src={require('assets/media/images/blue-logo.png')} alt="Product" />}
          {item.info.thumbnail !== '' && item.info.thumbnail && <img onLoad={this.handleProductImageSize} className={cx('preview', imageAspect === 'height' && 'fit-height')} src={item.info.thumbnail} alt="Product" />}
          <div>
            <div>{item.info.alias}</div>
            <div>{item.info.type_alias}</div>
            <div>{item.info.parts[0].format}</div>
            <div>{item.info.parts[0].color} - {item.info.parts[0].stock}</div>
            <div><a onClick={() => handleShowingModal(item)}>Ver mais...</a></div>
          </div>
        </div>
        <div className="product-item-col product-item-col-delivery">
          <div><IntlDate>{item.info.expected_delivery_date}</IntlDate></div>
          <div>{item.delivery_zipcode.label}: {item.delivery_zipcode.value}</div>
          {(item.info.type !== 'upload' || item.info.upload_date) && <div>
            <WarningMessage>
              <b>{item.upload_message && item.upload_message.label}</b>
            </WarningMessage>
          </div>}
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
    const { imageAspect } = this.state;
    return (
      <div className="product-item-row">
        <div className="product-item-col product-item-col-product">
          {(item.info.thumbnail === '' || !item.info.thumbnail) && <img className="preview" src={require('assets/media/images/blue-logo.png')} alt="Product" />}
          {item.info.thumbnail !== '' && item.info.thumbnail && <img onLoad={this.handleProductImageSize} className={cx('preview', imageAspect === 'height' && 'fit-height')} src={item.info.thumbnail} alt="Product" />}
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
          <div><IntlDate>{item.info.expected_delivery_date}</IntlDate></div>
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
