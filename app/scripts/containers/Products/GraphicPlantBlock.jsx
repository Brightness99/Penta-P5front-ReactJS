// @flow
import React from 'react';
import Carousel from 'components/Carousel';

type Props = {
  screenSize: string,
  className: string,
  locale: {},
  button?: typeof React.Component,
};

export class GraphicPlantBlock extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <section className="container-graphicPlant">
        <h4 className="graphicPlant-title">Parque Gráfico</h4>
        <div className="box-graphicPlant">
          <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
        </div>
        <div className="box-graphicPlant">
          <h4 className="graphicPlant-subtitle">Nossa gráfica produz impressão offset de alta qualidade!</h4>
          <p className="fnt-text">Produzimos altas tiragens e grandes formatos com os preços mais baixos do mercado. Veja nosso parque gráfico ao lado com seus próprios olhos.</p>
          <ul className="list-item">
            <li>Maquinário avançado;</li>
            <li>Impressão offset e digital;</li>
            <li>Grandes formatos;</li>
            <li>Altas tiragens;</li>
            <li>Variedade de acabamentos.</li>
          </ul>
        </div>
      </section>
    );
  }

  renderDesktop() {
    return (
      <section className="container-graphicPlant">
        <h4 className="graphicPlant-title">Parque Gráfico</h4>
        <div className="container-graphicPlant-block">
          <div className="box-graphicPlant">
            <h4 className="graphicPlant-subtitle">Nossa gráfica produz impressão offset de alta qualidade!</h4>
            <p className="fnt-text">Produzimos altas tiragens e grandes formatos com os preços mais baixos do mercado. Veja nosso parque gráfico ao lado com seus próprios olhos.</p>
            <ul className="list-item">
              <li>Maquinário avançado;</li>
              <li>Impressão offset e digital;</li>
              <li>Grandes formatos;</li>
              <li>Altas tiragens;</li>
              <li>Variedade de acabamentos.</li>
            </ul>
          </div>
          <div className="box-graphicPlant">
            <Carousel>
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico2" />
            </Carousel>
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
