// @flow
// TODO: Carousel this
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import config from 'config';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl/index';
import { NextArrow, PrevArrow } from 'components/Carousel/Arrows';

type Props = {
  screenSize: string,
  locale: {},
  products: {}
};

export class ProductHightlightsBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { products: { product } } = this.props;

    return (
      <section className="org-product-highlights">
        <div className="mol-product-highlights-header">
          <span className="atm-product-highlights-big">{product.title}</span>
          <p className="atm-product-highlights-description">{product.subtitle}</p>
        </div>
        <Slider
          arrows={false}
          dots={true}
          dotsClass="atm-carousel-dots"
          key="product-highlights-slider"
        >
          {product.imagelist
            .sort((a, b) => a.order - b.order)
            .map((image) => (
              <img
                src={`${config.basePath}files/${image.filename}`}
                alt={image.title}
                key={image.filename}
              />
            )
          )}
        </Slider>
        <div className="mol-product-highlights-body">
          <div className="atm-product-highlights-price">
            A partir de
            <IntlMoney className="atm-product-highlights-big atm-product-highlights-big--blue">{product.minimum_price_format}</IntlMoney>
          </div>
          <NavLink className="atm-button-rounded atm-button-rounded--enabled" to={`configuracao-${product.slug}`}>
            Configure este produto
          </NavLink>
          <span className="atm-product-highlights-spec">Na próxima tela você pode configurar as especificações do seu produto e conferir o preço.</span>
        </div>
      </section>
    );
  }

  renderDesktop() {
    const { products: { product, category } } = this.props;

    return (
      <section className="org-product-highlights">
        <div className="container">
          <div className="mol-product-highlights-carousel">
            <Slider
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              dots={true}
              dotsClass="atm-carousel-dots atm-carousel-dots--inline"
              key="product-highlights-slider"
            >
              {product.imagelist
                .sort((a, b) => a.order - b.order)
                .map((image) => (
                  <div key={image.filename}>
                    <img
                      src={`${config.basePath}files/${image.filename}`}
                      alt={image.title}
                    />
                  </div>
                  )
                )}
            </Slider>
          </div>
          <div className="mol-product-highlights-body">
            <span className="atm-product-highlights-category">{category}</span>
            <span className="atm-product-highlights-big">{product.title}</span>
            <p className="atm-product-highlights-description">{product.subtitle}</p>
            <div className="atm-product-highlights-list" dangerouslySetInnerHTML={{ __html: product.teaser_lp }} />
            <div className="atm-product-highlights-price">
              A partir de
              <span className="atm-product-highlights-price--desktop">
                <IntlMoney className="atm-product-highlights-big atm-product-highlights-big--blue">{product.minimum_price_format}</IntlMoney>
                / {product.minimum_quantity} un
              </span>
            </div>
            <NavLink className="atm-button-rounded atm-button-rounded--enabled" to={`configuracao-${product.slug}`}>
              Configure este produto
            </NavLink>
            <span className="atm-product-highlights-spec">Na próxima tela você pode configurar as especificações do seu produto e conferir o preço.</span>
          </div>
        </div>
      </section>
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
    locale: state.locale,
    router: state.router,
    products: state.products,
  };
}

export default connect(mapStateToProps)(ProductHightlightsBlock);
