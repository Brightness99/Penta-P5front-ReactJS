// @flow
// TODO: Carousel on mobile
import React from 'react';

import { connect } from 'react-redux';

// import Carousel from 'components/Carousel';

type Props = {
  className: string,
  locale: {},
  blog: {},
  button?: typeof React.Component,
  screenSize: string,
  testimonials: {},
  clients: {},
  dispatch: () => {},
};

type State = {
  counter: number,
}

export class CustomersRelyBlock extends React.Component {
  props: Props;
  static state: State;


  renderTestimonials() {
    const { locale: { translate: { page: { home: { testimonials } } } } } = this.props;

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

  render() {
    const { locale: { translate: { page: { home: { clients } } } } } = this.props;
    return (
      <section className="container-customersRely">
        <div className="container">
          <h4 className="customersRely-title">{clients.TITLE}</h4>
          <div className="box-images-logo">
            <img src={require('assets/media/images/logos-cortados.jpg')} alt="Logos" />
          </div>
          <div className="container-commentsClients">
            {this.renderTestimonials()}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(CustomersRelyBlock);
