// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { vsprintf } from 'sprintf-js';
import config from 'config';

type Props = {
  locale: {},
  screenSize: string,
  product: {},
};

export class ProductBannerBlock extends React.Component {

  props: Props;

  render() {
    const { locale, product } = this.props;

    return (
      <section
        className="container container-printiProduct"
        style={{
          backgroundImage: product.image_bottom_banner ? `url('${config.basePath}${product.image_bottom_banner}` : '',
        }}
      >
        <h4 className="printiProduct-title">{vsprintf(locale.print.TITLE, product.title.toLowerCase())}</h4>
        <div className="box-btn-printiProduct">
          <NavLink className="atm-button-rounded atm-button-rounded--enabled" to={`configuracao-${product.slug}`}>
            {locale.common.CONFIGURE_PRODUCT}
          </NavLink>
        </div>
        <p className="fnt-text">{locale.print.QUESTIONS}</p>
      </section>
    );
  }

}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_landing_page,
    product: state.products.product,
  };
}

export default connect(mapStateToProps)(ProductBannerBlock);
