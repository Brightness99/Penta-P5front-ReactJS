// @flow
import React from 'react';
import { connect } from 'react-redux';

import Loading from 'components/Loading';
import Carousel from 'components/Carousel';

type Props = {
  app: AppStore,
  //screenSize: string,
  className: string,
  locale: {},
  dispatch: () => {},
  button?: typeof React.Component,
  graphic_plant: {},
};

export class GraphicPlantBlock extends React.Component {

  static props: Props;

  renderListGraphic() {
    const { locale: { translate: { page: { product_landing_page: { graphic_plant } } } } } = this.props;

    return graphic_plant.LIST.map((item) => (
      <li key={`list-${item}`}>{item}</li>
    ));
  }

  renderMobile() {
    const { locale: { translate: { page: { product_landing_page: { graphic_plant } } } } } = this.props;

    return (
      <section className="container-graphicPlant">
        <div className="container">
          <h4 className="graphicPlant-title">{graphic_plant.OVER_TITLE}</h4>
          <div className="container-graphicPlant-block">
            <div className="box-graphicPlant">
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
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
    const { locale: { graphic_plant } } = this.props;

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
              <Carousel>
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico2" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { locale: { isRunning, isLoaded }, app: { screenSize } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
    ? this.renderMobile()
    : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphicPlantBlock);
