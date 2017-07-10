// @flow
import React from 'react';
import Carousel from 'components/Carousel';


type Props = {
  screenSize: string,
  className: string,
  locale: {},
  button?: typeof React.Component,
  product: {}
};

export class ProductBlock extends React.Component {

  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderList() {
    return (
      <ul className="list-item awol-pdd awol-list-style">
        <li>- Modelos personalizados de acordo com a sua estratégia</li>
        <li>- Perfeitos para conquistar e fidelizar clientes e parceiros</li>
        <li>- Invista nos melhores papéis e conquiste a eficiência na mensagem</li>
      </ul>
    );
  }

  renderMobile() {
    const { product } = this.props;

    return (
      <section className="container-product">
        <div className="box-product">
          <h2 className="product-title">{product.title}</h2>
          <h3 className="product-subtitle">{product.subtitle}</h3>
          <br />
          <Carousel>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2017-02/banner1-banner.jpg" alt="1" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2016-06/banner-header2.jpg" alt="2" />
          </Carousel>
        </div>
        <div className="box-product">
          <div className="product-price">
            <p className="p-fnt-price">A partir de</p>
            <p className="fnt-price">R${product.minimum_price}</p>
          </div>
          <button className="btn-default btn-primary btn-lg">Configure este produto</button>
          <span className="spec-product">Na próxima tela você pode configurar as especificações do seu produto e conferir o preço.</span>
        </div>
      </section>
    );
  }

  renderDesktop() {
    const { product } = this.props;

    return (
      <section className="container-product">
        <div className="box-product">
          <Carousel>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2017-02/banner1-banner.jpg" alt="1" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2016-06/banner-header2.jpg" alt="2" />
          </Carousel>
        </div>
        <div className="box-product">
          <h4 className="product-category">Papelaria</h4>
          <h2 className="product-title">{product.title}</h2>
          <h3 className="product-subtitle">{product.subtitle}</h3>
          { this.renderList() }
          <div className="product-price">
            <p className="p-fnt-price">A partir de</p>
            <p className="fnt-price">R${product.minimum_price} <span className="fnt-unit">/100 un</span></p>
          </div>
          <button className="btn-default btn-primary btn-lg">Configure este produto</button>
          <span className="spec-product">Na próxima tela você pode configurar as especificações do seu produto e conferir o preço.</span>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default ProductBlock;
