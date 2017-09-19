// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  activeIndex: number,
  children: any,
  onClick: () => {},
};

type State = {
  style: {
    justifyContent: string,
    translateX: number,
  },
};

type Pan = {
  latestPan: number,
  isPanning: boolean,
};

export default class TabHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        justifyContent: 'center',
        translateX: 0,
      },
    };

    this.pan = {
      latestPan: 0,
      isPanning: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    window.addEventListener('resize', this.handleJustify);
    this.handleJustify();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleJustify);
  }

  static props: Props;

  static state: State;

  static pan: Pan;

  setPan = (pan: Pan) => {
    const { style: { justifyContent } } = this.state;

    if (justifyContent !== 'center') {
      this.pan = pan;
    }
  };

  handleJustify = () => {
    const { style } = this.state;
    const containerSize = window.innerWidth;
    const childrenSize = this.nav.scrollWidth;

    if (childrenSize > containerSize && style.justifyContent !== 'flex-start') {
      this.setState({
        style: {
          ...style,
          justifyContent: 'flex-start',
        },
      });
    } else if (childrenSize <= containerSize && style.justifyContent !== 'center') {
      this.setState({
        style: {
          translateX: 0,
          justifyContent: 'center',
        },
      });
    }
  };

  handleTouchStart = (ev) => {
    this.setPan({
      latestPan: ev.touches[0].clientX,
      isPanning: true,
    });
  };

  handleTouchMove = (ev) => {
    this.handlePosition(ev.touches[0].clientX);

    this.setPan({
      ...this.pan,
      latestPan: ev.touches[0].clientX,
    });
  };

  handleTouchEnd = () => {
    this.setPan({
      latestPan: 0,
      isPanning: false,
    });
  };

  handleMouseDown = (ev) => {
    this.setPan({
      latestPan: ev.clientX,
      isPanning: true,
    });
  };

  handleMouseMove = (ev) => {
    if (this.pan.isPanning) {
      this.handlePosition(ev.clientX);

      this.setPan({
        ...this.pan,
        latestPan: ev.clientX,
      });
    }
  };

  handleMouseUp = () => {
    this.setPan({
      isPanning: false,
      latestPan: 0,
    });
  };

  handlePosition(clientX: number) {
    const { style } = this.state;
    const containerSize = this.nav.parentElement.offsetWidth;
    const childrenSize = this.nav.scrollWidth;
    const maxTranslateX = (childrenSize - containerSize) * -1;

    let nextTranslateX = style.translateX + (clientX - this.pan.latestPan);


    if (nextTranslateX >= 0) {
      nextTranslateX = 0;
    } else if (nextTranslateX <= maxTranslateX) {
      nextTranslateX = maxTranslateX;
    }

    this.setState({
      style: {
        ...style,
        translateX: nextTranslateX,
      },
    });
  }

  renderChildren = (child, tabIndex) => {
    const { onClick, children, activeIndex } = this.props;

    return React.cloneElement(
      child,
      {
        ...child.props,
        onClick,
        isTabActive: !Array.isArray(children) ? true : tabIndex === activeIndex,
        tabIndex,
      },
      child.props.children,
    );
  };

  render() {
    const { children } = this.props;
    const { style: { justifyContent, translateX } } = this.state;

    return (
      <nav
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        className="mol-tabs-header"
        style={{
          justifyContent,
          transform: `translateX(${translateX}px)`,
        }}
        ref={c => this.nav = c} // eslint-disable-line no-return-assign
      >
        {!Array.isArray(children)
          ? this.renderChildren(children, 0)
          : children.map((child, index) => this.renderChildren(child, index))
        }
      </nav>
    );
  }
}
