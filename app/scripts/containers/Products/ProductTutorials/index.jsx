// @flow
// TODO: Carousel
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import config from 'config';
import { BlockTitle } from 'atoms/Titles';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  tutorials: {},
};

export class ProductTutorialsBlock extends React.Component {

  props: Props;

  // <img src={item.image.file} alt={item.image.title} />
  renderBigBox() {
    const { tutorials } = this.props;

    return tutorials.big_box.videos.map((item) => (
      <div key={item.id}>
        <NavLink to={item.external_link} target="_blank">
          <img src={`${config.basePath}files/${item.image.file}`} alt={item.image.title} className="img-bigBox" />
          <div className="tutorial-legendImg">
            <p className="tutorial-legendImg-title">{item.name}</p>
          </div>
        </NavLink>
      </div>
    ));
  }

  renderSmallBox() {
    const { tutorials } = this.props;

    return tutorials.small_box.links.map((item, key) => (
      <div key={item.id}>
        <NavLink to={item.external_link} target="_blank">
          <div className="container-tutorialMobile">
            <div>
              <img src={`${config.basePath}files/${item.image.file}`} alt={item.image.title} />
            </div>
            <div>
              <p className="p-smallbox">{item.name}</p>
            </div>
          </div>
        </NavLink>
      </div>
    ));
  }

  render() {
    return (
      <section className="container-tutorial">
        <div className="container">
          <BlockTitle>Tutoriais</BlockTitle>
          <div className="container-boxTutorial">
            <div className="box-tutorial box-tutorial-big">
              {this.renderBigBox()}
            </div>
            <div className="box-tutorial box-tutorial-small">
              <h5 className="title-smallbox">Vídeos</h5>
              {this.renderSmallBox()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    locale: state.locale.translate.page.product_landing_page,
    tutorials: state.products.tutorials,
  };
}

export default connect(mapStateToProps)(ProductTutorialsBlock);
