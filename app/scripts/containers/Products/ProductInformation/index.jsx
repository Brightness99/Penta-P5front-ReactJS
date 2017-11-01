// @flow
// TODO: Carousel this
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import config from 'config';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { Tabs, TabHeader, TabNav, TabBody } from 'components/Tabs';
import { NextArrow, PrevArrow } from 'components/Carousel';

type Props = {
  screenSize: string,
  locale: ProductLandingPageLocaleType.informations,
  informations: ProductsStoreType.informations,
};

export class InformationBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleHeader(key) {
    const { locale } = this.props;

    switch (key) {
      case 'tips':
        return locale.HINTS;
      case 'utilizations':
        return locale.HOW_TO_USE;
      default:
        return null;
    }
  }

  renderChildren(children) {
    return children.map((item) => (
      <div className="card-productInformation" key={item.id}>
        <div className="card-productInformation-image">
          <img src={`${config.basePath}files/${item.image.file}`} alt={item.image.title} />
        </div>
        <div className="card-productInformation-text">
          <h4 className="card-productInformation-title">{item.name}</h4>
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    ));
  }

  render() {
    const { screenSize, informations } = this.props;

    if (informations.length === 0) {
      return null;
    }

    return (
      <section className="container-productInformation">
        <div className="container">
          <div className="box-productInformation">
            <Tabs>
              <TabHeader>
                {Object.keys(informations).map((information) => <TabNav key={information}>{this.handleHeader(information)}</TabNav>)}
              </TabHeader>
              <TabBody>
                {
                  Object.keys(informations).map((information) => (
                    <Slider
                      arrows={!isMobile(screenSize)}
                      nextArrow={<NextArrow />}
                      prevArrow={<PrevArrow />}
                      dots={true}
                      dotsClass="atm-carousel-dots"
                      key={`product-informations-${information}`}
                    >
                      {this.renderChildren(informations[information])}
                    </Slider>
                  ))
                }
              </TabBody>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}


function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_landing_page.informations,
    informations: state.products.informations,
  };
}

export default connect(mapStateToProps)(InformationBlock);
