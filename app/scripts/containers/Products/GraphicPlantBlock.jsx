// @flow
import React from 'react';
import config from 'config';
import Slider from 'react-slick';
import Carousel from 'components/Carousel';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { IntlMoney } from 'components/Intl/index';
import { NextArrow, PrevArrow } from 'components/Carousel/Arrows';

type Props = {
  screenSize: string,
  className: string,
  locale: {},
  button?: typeof React.Component,
  graphic_plant: {},
};

export class GraphicPlantBlock extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderListGraphic() {
    const { graphic_plant } = this.props;

    return graphic_plant.LIST.map((item) => (
      <li key={`list-${item}`}>{item}</li>
    ));
  }

  renderMobile() {
    const { graphic_plant } = this.props;

    return (
      <section className="container-graphicPlant">
        <div className="container">
          <h4 className="graphicPlant-title">{graphic_plant.OVER_TITLE}</h4>
          <div className="container-graphicPlant-block">
            <div className="box-graphicPlant">
              <Slider
                arrows={false}
                dots={true}
                dotsClass="atm-carousel-dots"
                key="product-highlights-slider"
              >
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico2" />
              </Slider>
            </div>
            <div className="box-graphicPlant">
              <h4 className="graphicPlant-subtitle">{graphic_plant.TITLE}</h4>
              <p className="fnt-text">{graphic_plant.PARAGRAPH}</p>
              <ul className="list-item awol-pdd awol-list-style">
                {this.renderListGraphic()}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderDesktop() {
    const { graphic_plant } = this.props;

    return (
      <section className="container-graphicPlant">
        <div className="container">
          <h4 className="graphicPlant-title">{graphic_plant.OVER_TITLE}</h4>
          <div className="container-graphicPlant-block">
            <div className="box-graphicPlant">
              <h4 className="graphicPlant-subtitle">{graphic_plant.TITLE}</h4>
              <p className="fnt-text">{graphic_plant.PARAGRAPH}</p>
              <ul className="list-item awol-pdd awol-list-style">
                {this.renderListGraphic()}
              </ul>
            </div>
            <div className="box-graphicPlant">
              <Slider
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                dots={true}
                dotsClass="atm-carousel-dots atm-carousel-dots--inline"
                key="product-highlights-slider"
              >
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico2" />
              </Slider>
            </div>
          </div>
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

export default GraphicPlantBlock;
