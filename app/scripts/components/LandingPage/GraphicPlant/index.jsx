// @flow
import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import config from 'config';
import Slider from 'react-slick';
import { BlockTitle } from 'atoms/Titles';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { NextArrow, PrevArrow } from 'components/Carousel/Arrows';

type Props = {
  screenSize: AppStoreType.screenSize,
  locale: ProductLandingPageLocaleType.graphic_plant,
};

export class GraphicPlantBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderSlider = (children) => {
    const { locale, screenSize } = this.props;

    return (
      <Slider
        arrows={!isMobile(screenSize)}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        dots={true}
        dotsClass={cx(
          'atm-carousel-dots',
          !isMobile(screenSize) && 'atm-carousel-dots--inline',
        )}
        key="product-highlights-slider"
      >
        {children}
      </Slider>
    );
  };

  render() {
    const { locale } = this.props;

    return (
      <section className="container-graphicPlant">
        <div className="container">
          <BlockTitle>{locale.OVER_TITLE}</BlockTitle>
          <div className="container-graphicPlant-block">
            <div className="box-graphicPlant">
              <h4 className="graphicPlant-subtitle">{locale.TITLE}</h4>
              <p className="fnt-text">{locale.PARAGRAPH}</p>
              <ul className="list-item awol-pdd awol-list-style">
                {locale.LIST.map((item) => (
                  <li key={`list-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="box-graphicPlant">
              <img
                className="atm-graphic-plant-image"
                src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg"
                alt="Parque Gráfico"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}


function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_landing_page.graphic_plant,
  };
}

export default connect(mapStateToProps)(GraphicPlantBlock);
