// @flow 

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  item: Object,
};

class ProductModalItem extends React.Component {
  static props: Props;

  render() {

    const { item } = this.props;

    return (
      <div>
        <h3>DETALHES DO PRODUTO</h3>
        <div className="product-item-row">
          <div className="product-item-col-product modal-content">
            <img src={require('assets/media/images/img.png')} alt="Product" />
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
