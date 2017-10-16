// @flow
// TODO: Carousel on mobile
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { BlockTitle } from 'atoms/Titles';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Logo from 'components/Logo';
import { NavLink } from 'react-router-dom';

import { CheckIcon, CloseIcon } from 'components/Icons';

type Props = {
  screenSize: AppStoreType.screenSize,
  locale: {},
  product: {},
};

export class BenefitsBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;
  static props: Props;

  renderAdvantagesTable() {
    const { locale: { advantages, common }, product: { slug }, screenSize } = this.props;

    return [
      <ul className="box-benefitsCard" key="OTHER_ONLINE_PRINTING_COMPANIES">
        <li className="benefitsCard benefitsCard-title">{advantages.OTHER_ONLINE_PRINTING_COMPANIES}</li>
        <li className="benefitsCard benefitsCard-icon"><CheckIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon"><CheckIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
      </ul>,
      <ul
        className="box-benefitsCard box-benefitsCard-printi"
        key="PRINTI_ONLINE_PRINTING"
      >
        <li className="benefitsCard-title"><Logo /></li>
        {advantages.LIST.map((item) => (
          <li
            key={`advantages-${item}`}
            className="benefitsCard benefitsCard-icon"
          >
            <CheckIcon />{item}
          </li>
        ))}
        {!isMobile(screenSize) &&
          <li className="benefitsCard benefitsCard-btn">
            <NavLink
              to={`/configuracao-${slug}`}
              className="atm-button-rounded atm-button-rounded--enabled"
            >
              {common.CONFIGURE_PRODUCT}
            </NavLink>
          </li>
        }
      </ul>,
      <ul className="box-benefitsCard" key="TRADITIONAL_PRINTING_COMPANIES">
        <li className="benefitsCard benefitsCard-title">{advantages.TRADITIONAL_PRINTING_COMPANIES}</li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon benefitsCard-icon-close"><CloseIcon /></li>
        <li className="benefitsCard benefitsCard-icon"><CheckIcon /></li>
        <li className="benefitsCard benefitsCard-icon"><CheckIcon /></li>
        <li className="benefitsCard benefitsCard-icon"><CheckIcon /></li>
      </ul>,
    ];
  }

  renderMobile() {
    const { locale: { advantages, common }, product: { slug } } = this.props;

    return (
      <div className="container">
        <BlockTitle>{advantages.TITLE}</BlockTitle>
        <div className="container-benefitsCard">
          <Slider
            arrows={false}
            dots={true}
            dotsClass="atm-carousel-dots"
            key="product-highlights-slider"
            initialSlide={1}
            auto={false}
            infinite={false}
          >
            {this.renderAdvantagesTable()}
          </Slider>
        </div>
        <sub>{advantages.CHECK_AVAILABLE_PRODUCTS}</sub>
        <div className="benefitsCard-btn">
          <NavLink
            to={`/configuracao-${slug}`}
            className="atm-button-rounded atm-button-rounded--enabled"
          >
            {common.CONFIGURE_PRODUCT}
          </NavLink>
        </div>
      </div>
    );
  }
  renderDesktop() {
    const { locale: { advantages } } = this.props;

    return (
      <div className="container">
        <div className="container-benefitsCard">
          {this.renderAdvantagesTable()}
        </div>
        <sub>{advantages.CHECK_AVAILABLE_PRODUCTS}</sub>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <section className="container-benefits">
        {isMobile(screenSize) ? this.renderMobile() : this.renderDesktop()}
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

export default connect(mapStateToProps)(BenefitsBlock);
