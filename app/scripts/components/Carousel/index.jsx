// @flow
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

type Props = {
  transition: string,
  apperTransition: true,
  children?: ?[],
}

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  static defaultProps = {
    transition: 'scale',
  };

  static props: Props;

  handleNavigation = (ev) => {
    this.setState({
      counter: ev.currentTarget.name,
    });
  }

  prevSlide = () => {
    const prevSlide = this.state.counter - 1 < 0 ? this.props.children.length - 1 : this.state.counter - 1;
    this.setState({
      counter: prevSlide,
    });
  }

  nextSlide = () => {
    const nextSlide = this.state.counter + 1 < this.props.children.length ? this.state.counter + 1 : 0;
    this.setState({
      counter: nextSlide,
    });
  }

  pager() {
    const { children } = this.props;

    return children.map((item, key) => (
      <button
        key={item.src}
        name={key}
        onClick={this.handleNavigation}
      >
        {key}
      </button>
    ));
  }

  render() {
    const { children } = this.props;
    const { counter } = this.state;

    return (
      <div className="carousel">
        <div className="carouselBullet">
          {this.pager()}
        </div>
        <button className="carousel__prev" onClick={this.prevSlide}>◀</button>
        <button className="carousel__next" onClick={this.nextSlide}>▶︎</button>
        <CSSTransitionGroup
          transitionName="animate"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          component="div"
          className="carousel__slide"
          transitionAppear={true}
          transitionAppearTimeout={1000}
        >
          {children[counter]}
        </CSSTransitionGroup>
      </div>
    );
  }
}
