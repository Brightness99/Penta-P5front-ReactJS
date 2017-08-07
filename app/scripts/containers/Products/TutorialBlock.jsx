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
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  // <img src={item.image.file} alt={item.image.title} />
  renderBigBox() {
    const { tutorials } = this.props;

    return tutorials.big_box.videos.map((item, key) => (
      <div key={item.id} name={key}>
        <Link to={item.video.authorurl} target="_blank">
          <img src="https://www.printi.com.br/thumbs/740x421c/2016-06/banner-tutorial3.jpg" alt="imagem de teste" className="img-bigBox" />
          <div className="tutorial-legendImg">
            <span className="tutorial-legendImg-category">Categoria</span>
            <p className="tutorial-legendImg-title">{item.name}</p>
          </div>
        </Link>
      </div>
    ));
  }

  // <img src={item.image.file} alt={item.image.title} />

  renderSmallBox() {
    const { tutorials } = this.props;

    return tutorials.small_box.links.map((item, key) => (
      <div key={item.id} name={key}>
        <Link to={item.external_link} target="_blank">
          <h5 className="title-smallbox">Vídeos</h5>
          <img src="https://www.printi.com.br//thumbs/740x421c/2016-06/banner-tutorial3.jpg" alt="imagem de teste" />
          <p className="p-smallbox">{item.name}</p>
        </Link>
      </div>
    ));
  }

  renderMobile() {
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

  renderDesktop() {
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
