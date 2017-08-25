// @flow
import React from 'react';
import cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

import { ArrowCarousel } from 'components/Icons';

type Props = {
  transition: string,
  apperTransition: true,
  children?: ?[],
  className?: string,
  activeSlide?: number,
  showArrows: boolean,
  showBullets: boolean,
}

type State = {
  counter: number,
  containerStyle: {},
  childrenStyle: {},
  screenSize: number,
}

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: props.activeSlide || 0,
      screenSize: 0,
      containerStyle: {
        width: 0,
      },
      childrenStyle: {
        width: 0,
      },
    };
  }

  static defaultProps = {
    activeSlide: 0,
    transition: 'scale',
    showArrows: false,
    showBullets: false,
  };

  componentWillMount() {
    this.setState({
      screenSize: window.innerWidth,
    });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const { activeSlide } = this.props;

    if (activeSlide !== nextProps.activeSlide) {
      this.setState({
        counter: nextProps.activeSlide,
      });
    }
  }

  static props: Props;

  static state: State;

  childRefs: [] = [];

  handleResize = () => {
    const { containerStyle, childrenStyle } = this.state;

    const containerWidth = this.childRefs.reduce((prevChildren, currentChildren) => {
      return prevChildren + currentChildren.getBoundingClientRect().width + 10;
    }, 0);

    this.setState({
      containerStyle: {
        ...containerStyle,
        width: containerWidth,
      },
      childrenStyle: {
        ...childrenStyle,
        width: this.slideRef.getBoundingClientRect().width - 50,
      }
    });
  };

  handleNavigation = (ev) => {
    this.setState({
      counter: ev.currentTarget.name,
    });
  };

  prevSlide = () => {
    const prevSlide = this.state.counter - 1 < 0 ? this.props.children.length - 1 : this.state.counter - 1;
    this.setState({
      counter: prevSlide,
    });
  };

  nextSlide = () => {
    const nextSlide = this.state.counter + 1 < this.props.children.length ? this.state.counter + 1 : 0;
    this.setState({
      counter: nextSlide,
    });
  };

  renderArrows() {
    const { showArrows } = this.props;
    if (!showArrows) {
      return null;
    }

    return [
      <button className="cmp-carousel__prev" onClick={this.prevSlide}>
        <ArrowCarousel />
      </button>,
      <button className="cmp-carousel__next" onClick={this.nextSlide}>
        <ArrowCarousel />
      </button>
    ];
  }

  renderBullets() {
    const { children, showBullets } = this.props;

    if (!showBullets) {
      return null;
    }

    return (
      <div className="cmp-carousel__bullet">
        {children.map((item, key) => (
          <button
            key={item.src}
            name={key}
            onClick={this.handleNavigation}
          />
        ))}
      </div>
    );
  }

  render() {
    const { children, className } = this.props;
    const { containerStyle, childrenStyle } = this.state;

    return (

      <div
        className={cx('cmp-carousel', className)}
        ref={c => this.slideRef = c}
      >
        <div
          className="cmp-carousel__slide"
          style={containerStyle}
        >
          {children.map((child) => (
            React.cloneElement(
              child,
              {
                ...child.props,
                ref: c => this.childRefs.push(c),
                style: childrenStyle,
              }
            )
          ))}
        </div>
        {this.renderArrows()}
        {this.renderBullets()}
      </div>
    );
  }
}
