// @flow 

import React from 'react';
import { connect } from 'react-redux';

class ProductItem extends React.Component {
  props: Props;

  renderDesktop() {
    return (
      <div className="product-item-row">
        <div className="product-item-col product-item-col-product">
          <img src={require('assets/media/images/img.png')} alt="Product" />
          <div>
            <div>Arte 1</div>
            <div>Cartao de visita</div>
            <div>90x50mm</div>
            <div>4x4 cores - couche brilho 250g</div>
            <div><a>Ver mais...</a></div>
          </div>
        </div>

        <div className="product-item-col product-item-col-delivery">
          <div>12/12/2015</div>
          <div>CEP: 07130-000</div>
        </div>

        <div className="product-item-col product-item-col-amount">
          <div>1.000</div>
        </div>

        <div className="product-item-col product-item-col-value">
          <div>R$75,00</div>
        </div>
      </div>
    );
  }

  renderMobile() {
    return (
      <div className="product-item-row">
        <div className="product-item-col product-item-col-product">
          <img src={require('assets/media/images/img.png')} alt="Product" />
          <div>
            <div>Arte 1</div>
            <div>Cartao de visita</div>
            <div>90x50mm</div>
            <div>4x4 cores - couche brilho 250g</div>
            <div><a>Ver mais...</a></div>
          </div>
        </div>

        <div className="field">
          <div>ENTREGA</div>
        </div>

        <div className="product-item-col product-item-col-delivery">
          <div>12/12/2015</div>
          <div>CEP: 07130-000</div>
        </div>

        <div className="space-between field">
          <div>QUANTIDADE</div>
          <div>VALOR</div>
        </div>

        <div className="space-between">
          <div className="product-item-col product-item-col-amount">
            <div>1.000</div>
          </div>

          <div className="product-item-col product-item-col-value">
            <div>R$75,00</div>
          </div>
        </div>
      </div>
    );
  }
  render() {

    const { app: { screenSize } } = this.props;
    return ['xs', 'is', 'sm', 'ix'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}


function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
