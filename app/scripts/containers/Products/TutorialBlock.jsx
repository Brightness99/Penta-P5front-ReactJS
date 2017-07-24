// @flow
// TODO: Carousel
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  tutorials: {},
};

export default class TutorialBlock extends React.Component {
  props: Props;

  renderBigBox() {
    const { tutorials } = this.props;

    return tutorials.big_box.videos.map((item, key) => (
      <div key={item.id} name={key}>
        <Link to={item.video.authorurl} target="_blank">
          <img src={item.image.file} alt={item.image.title} />
          <div className="tutorial-legendImg">
            <span className="tutorial-legendImg-category">Categoria</span>
            <p className="tutorial-legendImg-title">{item.title}</p>
          </div>
        </Link>
      </div>
    ));
  }

  renderSmallBox() {
    const { tutorials } = this.props;

    return tutorials.small_box.links.map((item, key) => (
      <div key={item.id} name={key}>
        <Link to={item.external_link} target="_blank">
          <h5>categoria [ñ tem na api]</h5>
          <img src={item.image.file} alt={item.image.title} />
          <p>{item.name}</p>
        </Link>
      </div>
    ));
  }

  render() {
    return (
      <section className="container-tutorial">
        <h4 className="tutorial-title">Tutoriais</h4>
        <div className="container-boxTutorial">
          <div className="box-tutorial">
            {this.renderBigBox()}
          </div>
          <div className="box-tutorial">
            {this.renderSmallBox()}
          </div>
        </div>
      </section>
    );
  }
}
