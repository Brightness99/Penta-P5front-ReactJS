// @flow
import React from 'react';
import { connect } from 'react-redux';

type Props = {
  className?: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  product: {},
};

export class ProductDetailsBlock extends React.Component {
  props: Props;

  render() {
    const { product, locale } = this.props;

    return (
      <section className="container-detailsProduct">
        <div className="container">
          <h4 className="detailsProduct-title">{locale.common.TITLE}</h4>
          {product.template_title1 && product.template_teaser1 && <div className="box-detailsProduct">
            <h5 className="detailsProduct-subtitle">{product.template_title1}</h5>
            <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.template_teaser1 }} />
          </div>}
          {product.template_title2 && product.template_teaser2 && <div className="box-detailsProduct">
            <h5 className="detailsProduct-subtitle">{product.template_title2}</h5>
            <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.template_teaser2 }} />
          </div>}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_landing_page,
    router: state.router,
    product: state.products.product,
  };
}

export default connect(mapStateToProps)(ProductDetailsBlock);
