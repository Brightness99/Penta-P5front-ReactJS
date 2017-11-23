// @flow

import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

type Props = {
  item: Object,
};

export class ProductModalItem extends React.Component {
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

  render() {
    const { item } = this.props;
    const { imageAspect } = this.state;

    return (
      <div>
        <h3>DETALHES DO PRODUTO</h3>
        <div className="product-item-row">
          <div className="product-item-col-product modal-content">
            <div className="image-container">
              {(item.info.thumbnail === '' || !item.info.thumbnail) && <img className="preview" src={require('assets/media/images/blue-logo.png')} alt="Product" />}
              {item.info.thumbnail !== '' && item.info.thumbnail && <img onLoad={this.handleProductImageSize} className={cx('preview', imageAspect === 'height' && 'fit-height')} src={item.info.thumbnail} alt="Product" />}
            </div>
            <div>
              <p><b>{item.info.alias}</b></p>
              <p className="content"><span>{item.info.parts[0].part}</span>: {item.info.parts[0].opt_string}</p>
              <p><b>Opções Adicionais</b></p>
              <p className="content">{item.info.add_opt_string}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(ProductModalItem);
