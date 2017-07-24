// @flow

import React from 'react';
import cx from 'classnames';
import Overlay from 'components/Overlay';
import { isMobile } from 'utils/helpers';

import { BulletListIcon, TimesIcon } from 'components/Icons';

type Props = {
  selection: [],
  screenSize?: 'string',
  optionSectionInfo: {},
  calculator: {},
  children?: any,
};

type State = {
  style: {
    position: string,
    right: number,
    top: number,
    width: number,
  },
  top: number,
};

export default class SideBar extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      showSidebar: false,
      style: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 0,
      },
    };
  }

  componentDidMount() {
    const { screenSize } = this.props;

    if (!isMobile(screenSize)) {
      this.handlePosition();
      window.addEventListener('scroll', this.handlePosition);
      window.addEventListener('resize', this.handlePosition);
    }
  }

  componentWillUnmount() {
    const { screenSize } = this.props;

    if (!isMobile(screenSize)) {
      window.removeEventListener('scroll', this.handlePosition);
      window.removeEventListener('resize', this.handlePosition);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextState);
    const { screenSize } = this.props;
    const nextScreenSize = nextProps.screenSize;

    if (nextScreenSize !== screenSize) {
      if (!isMobile(nextScreenSize)) {
        this.handleSideBarHide();
        this.handlePosition();
        window.addEventListener('scroll', this.handlePosition);
        window.addEventListener('resize', this.handleResize);
      } else {
        window.removeEventListener('scroll', this.handlePosition);
        window.removeEventListener('resize', this.handlePosition);
      }
    }
  }

  static props: Props;

  static state: State;

  handleSideBarHide = () => {
    this.setState({
      showSidebar: false,
    });
  };

  toggleSideBarMobile = () => {
    const { showSidebar } = this.state;

    this.setState({
      showSidebar: !showSidebar,
    });
  };

  handlePosition = () => {
    const { style } = this.state;
    const headerHeight = document.querySelector('.app__header').offsetHeight;
    const bodyWidth = document.querySelector('body').offsetWidth;
    const containerOffset = document.querySelector('.app__config__content').offsetTop;
    const containerHeight = document.querySelector('.app__config__content').offsetHeight;
    const containerWidth = document.querySelector('.app__config__content').offsetWidth;
    const componentHeight = document.querySelector('.org-sidebar').offsetHeight;
    const contentWidth = document.querySelector('.org-sidebar').offsetWidth;
    const componentOffset = headerHeight + containerOffset;
    const pageOffset = window.pageYOffset;

    if (pageOffset + componentHeight >= containerHeight) {
      this.setState({
        style: {
          ...style,
          position: 'absolute',
          right: 0,
          top: containerHeight - componentHeight,
          width: contentWidth,
        }
      });
    } else if (style.position !== 'fixed') {
      this.setState({
        style: {
          ...style,
          position: 'fixed',
          right: (bodyWidth - containerWidth) / 2,
          top: componentOffset,
          width: contentWidth,
        }
      });
    }
  };

  renderMobile() {
    const { children } = this.props;
    const { showSidebar } = this.state;
    return (
      <div
        className={cx(
          'org-sidebar',
          showSidebar && 'org-sidebar--active',
        )}
      >
        {showSidebar && <Overlay onClick={this.handleSideBarHide} />}
        <div
          className="org-sidebar-mobile"
        >
          <button
            onClick={this.toggleSideBarMobile}
            className="atm-sidebar-action"
          >
            {showSidebar ? <TimesIcon /> : <BulletListIcon />}
          </button>
          <div className="mol-sidebar-main">
            {children}
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { children } = this.props;
    const { style } = this.state;
    return (
      <div className="org-sidebar">
        <div className="org-sidebar-desktop" style={style}>
          {children}
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
