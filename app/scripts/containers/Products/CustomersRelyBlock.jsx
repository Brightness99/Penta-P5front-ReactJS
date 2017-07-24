// @flow
// TODO: Carousel on mobile
import React from 'react';
import Carousel from 'components/Carousel';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  testimonials: {},
  clients: {},
};

type State = {
  counter: number,
  //slideToShow: number,
}

export default class CustomersRelyBlock extends React.Component {
  props: Props;
  static state: State;


  renderTestimonials() {
    const { testimonials } = this.props;
    //const { slideToShow } = this.state;

    return testimonials.map((item, key) => (
      <div className="box-commentClient" name={key}>
        <p className="commentClient-text">"{item.TEXT}"</p>
        <div className="commentClient-img">
          <img src={'https://d2ofpir5gh0cbr.cloudfront.net/assets' + item.IMAGE} alt={item.name} />
          <p className="commentClient-name">{item.NAME}</p>
          <p className="commentClient-profession">{item.WORK_TITLE}</p>
        </div>
      </div>
    ));
  }

  render() {
    const { clients } = this.props;

    return (
      <section className="container-customersRely">
        <h4 className="customersRely-title">{clients.TITLE}</h4>
        <div>
          <Carousel>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="um" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2016-06/cartao-visita-header2.jpg" alt="dois" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2016-05/cartao-visita-header1.jpg" alt="trêss" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="quatro" />
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/files/2016-06/cartao-visita-header2.jpg" alt="cinco" />
            <img src="https://simg.minhateca.com.br/29b7da040214fe652630df4032e1a02e90cb9479?url=http%3A%2F%2Fi62.tinypic.com%2F2mw9kr9.jpg" alt="seis" />
          </Carousel>
        </div>
        <div className="container-commentsClients">
          {this.renderTestimonials()}
        </div>
      </section>
    );
  }
}
