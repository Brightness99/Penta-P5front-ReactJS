// @flow
// TODO: Marquee on logos
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import { isMobile } from 'utils/helpers';

import { BlockTitle } from 'atoms/Titles';

type Props = {
  screenSize: string,
  locale: {},
  dispatch: () => {},
};


export class CustomersRelyBlock extends React.Component {
  static props: Props;

  renderTestimonials() {
    const { locale: { testimonials } } = this.props;

    return testimonials.map((item) => (
      <div className="box-commentClient" key={`commentClient-${item.NAME}`}>
        <p className="commentClient-text">"{item.TEXT}"</p>
        <div className="commentClient-img">
          <img src={`https://d2ofpir5gh0cbr.cloudfront.net/assets${item.IMAGE}`} alt={item.name} />
          <p className="commentClient-name">{item.NAME}</p>
          <p className="commentClient-profession">{item.WORK_TITLE}</p>
        </div>
      </div>
    ));
  }

  renderMobile() {
    return (
      <Slider
        className="container-commentsClients"
        arrows={false}
        dots={true}
        dotsClass="atm-carousel-dots"
        autoplay={false}
      >
        {this.renderTestimonials()}
      </Slider>
    );
  }

  renderDesktop() {
    return (
      <div className="container-commentsClients">
        {this.renderTestimonials()}
      </div>
    );
  }

  render() {
    const { screenSize, locale: { clients } } = this.props;

    return (
      <section className="container-customersRely">
        <div className="container">
          <BlockTitle>{clients.TITLE}</BlockTitle>
          <div className="box-images-logo">
            <img src={require('assets/media/images/logos-cortados.jpg')} alt="Logos" />
          </div>
          {isMobile(screenSize) ? this.renderMobile() : this.renderDesktop()}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    router: state.router,
    locale: state.locale.translate.page.home,
  };
}

export default connect(mapStateToProps)(CustomersRelyBlock);
