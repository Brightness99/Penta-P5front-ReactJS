// @flow
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { ArrowCarousel } from 'components/Icons';

type Props = {
  transition: string,
  apperTransition: true,
  children?: ?[],
}

export default class SliderImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  static props: Props;

  handleNavigation = (ev) => {
    this.setState({
      counter: ev.currentTarget.name,
    });
  }

  prevSlide = () => {
    event.preventDefault();

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

  render() {
    const { children } = this.props;
    const { counter } = this.state;

    return (
      <div className="slider">
        <div className="slider-wrapper">
          <button className="carousel__prev" onClick={this.prevSlide}><ArrowCarousel /></button>
          <ul className="slider-images">
            {children[counter]}
          </ul>
          <button className="carousel__next" onClick={this.nextSlide}><ArrowCarousel /></button>
        </div>
      </div>
    );
  }
}
