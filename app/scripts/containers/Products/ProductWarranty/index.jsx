// @flow
import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string,
  locale: {},
  product: {},
};

export class ProductWarrantyBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { product: { slug }, locale } = this.props;

    return (
      <section className="container container-warranty">
        <div className="container-warranty-content">
          <div className="box-image-warranty">
            <img src={require('assets/media/images/img-warranty.png')} alt={locale.image.ALT} />
          </div>
          <div className="box-text-warranty">
            <h4 className="warranty-title">{locale.TITLE}</h4>
            <p className="warranty-text">{locale.DESCRIPTION}</p>
          </div>
        </div>
        <div className="box-btn-warranty">
          <NavLink className="atm-button-rounded atm-button-rounded--enabled" to={`/configuracao-${slug}`}>{locale.BUTTON}</NavLink>
        </div>
      </section>
    );
  }

  renderDesktop() {
    const { product: { slug }, locale } = this.props;

    return (
      <section className="container container-warranty">
        <div className="container-warranty-content">
          <div className="box-image-warranty">
            <img src={require('assets/media/images/img-warranty.png')} alt={locale.image.ALT} />
          </div>
          <div className="box-text-warranty">
            <h4 className="warranty-title">{locale.TITLE}</h4>
            <p className="warranty-text">{locale.DESCRIPTION}</p>
          </div>
          <div className="box-btn-warranty">
            <NavLink className="atm-button-rounded atm-button-rounded--enabled" to={`/configuracao-${slug}`}>{locale.BUTTON}</NavLink>
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
    locale: state.locale.translate.page.product_landing_page.warranty,
    product: state.products.product,
  };
}

export default connect(mapStateToProps)(ProductWarrantyBlock);
