// @flow
// TODO: Carousel
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import config from 'config';
import { BlockTitle } from 'atoms/Titles';
import VideoModal from '../Modals/Video';

type Props = {
  tutorials: {
    big_box: {},
  },
};

type State = {
  isModalOpen: boolean,
  video: {},
};

export class ProductTutorialsBlock extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
      video: {},
    };
  }

  static props: Props;

  static state: State;

  handleModalOpen = (ev) => {
    const { tutorials } = this.props;

    this.setState({
      isModalOpen: true,
      video: tutorials[ev.currentTarget.name].videos[ev.currentTarget.value].video,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
      video: {},
    });
  };

  renderBigBox() {
    const { tutorials } = this.props;
    const bigBoxKey = Object.keys(tutorials.big_box)[0];
    const bigBoxLink = tutorials.big_box[bigBoxKey][0];

    if (bigBoxKey === 'videos') {
      return (
        <button
          value={0}
          name="big_box"
          onClick={this.handleModalOpen}
        >
          <img src={`${config.basePath}files/${bigBoxLink.image.file}`} alt={bigBoxLink.image.title} className="img-bigBox" />
          <div className="tutorial-legendImg">
            <p className="tutorial-legendImg-title">{bigBoxLink.video.title}</p>
          </div>
        </button>
      );
    }

    return (
      <div key={bigBoxLink.id}>
        <NavLink to={bigBoxLink.external_link} target="_blank">
          <img src={`${config.basePath}files/${bigBoxLink.image.file}`} alt={bigBoxLink.image.title} className="img-bigBox" />
          <div className="tutorial-legendImg">
            <p className="tutorial-legendImg-title">{bigBoxLink.name}</p>
          </div>
        </NavLink>
      </div>
    );
  }

  renderSmallBoxLink(item) {
    return (
      <NavLink to={item.external_link} target="_blank" key={item.id}>
        <div className="container-tutorialMobile">
          <div>
            <img src={`${config.basePath}files/${item.image.file}`} alt={item.image.title} />
          </div>
          <div>
            <p className="p-smallbox">{item.name}</p>
          </div>
        </div>
      </NavLink>
    );
  }

  renderSmallBoxVideo(item, index) {
    return (
      <button
        value={index}
        name="small_box"
        onClick={this.handleModalOpen}
      >
        <div className="container-tutorialMobile">
          <div>
            <img src={item.video.thumbnail} alt={item.video.title} />
          </div>
          <div>
            <p className="p-smallbox">{item.name}</p>
          </div>
        </div>
      </button>
    );
  }

  render() {
    const { tutorials } = this.props;
    const { isModalOpen, video } = this.state;

    return (
      <section className="container-tutorial">
        <div className="container">
          <BlockTitle>Tutoriais</BlockTitle>
          <div className="container-boxTutorial">
            <div className="box-tutorial box-tutorial-big">
              {this.renderBigBox()}
            </div>
            <div className="box-tutorial box-tutorial-small">
              {Object.keys(tutorials.small_box).map((item) => ([
                <h5 className="title-smallbox" key={`title-smallbox-${item}`}>{item === 'videos' ? 'Vídeos' : 'Artigos'}</h5>,
                tutorials.small_box[item].map((link, index) => {
                  if (item === 'videos') {
                    return this.renderSmallBoxVideo(link, index);
                  }

                  return this.renderSmallBoxLink(link);
                }),
              ]))}
            </div>
          </div>
        </div>
        {isModalOpen && <VideoModal video={video} onClose={this.handleModalClose} />}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    tutorials: state.products.tutorials,
  };
}

export default connect(mapStateToProps)(ProductTutorialsBlock);
