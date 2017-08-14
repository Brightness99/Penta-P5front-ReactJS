// @flow

import React from 'react';

type Props = {
  selection: [],
  screenSize: 'string',
  optionSectionInfo: {},
  calculator: {},
};

type State = {
  position: string,
  top: number,
};

export default class SummaryBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 0,
    };
  }

  componentDidMount() {
    this.handlePosition();
    this.handleResize();
    window.addEventListener('scroll', this.handlePosition);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePosition);
    window.removeEventListener('resize', this.handleResize);
  }

  static props: Props;

  static state: State;

  handleResize = () => {
    const bodyWidth = document.querySelector('body').offsetWidth;
    const containerWidth = document.querySelector('.app__config__content').offsetWidth;

    this.setState({
      right: (bodyWidth - containerWidth) / 2,
      width: containerWidth * 0.23,
    });

    this.handlePosition();
  };

  handlePosition = () => {
    const { position } = this.state;
    const headerHeight = document.querySelector('.app__header').offsetHeight;
    const bodyWidth = document.querySelector('body').offsetWidth;
    const containerOffset = document.querySelector('.app__config__content').offsetTop;
    const containerHeight = document.querySelector('.app__config__content').offsetHeight;
    const containerWidth = document.querySelector('.app__config__content').offsetWidth;
    const componentHeight = document.querySelector('.app__sidebar').offsetHeight;
    const componentOffset = headerHeight + containerOffset;
    const pageOffset = window.pageYOffset;

    if (pageOffset + componentHeight >= containerHeight) {
      this.setState({
        position: 'absolute',
        right: 0,
        top: containerHeight - componentHeight,
      });
    } else if (position !== 'fixed') {
      this.setState({
        position: 'fixed',
        right: (bodyWidth - containerWidth) / 2,
        top: componentOffset,
      });
    }
  };

  renderMobile() {
    return (
      <div className="org-summary-mobile">
        {this.renderSummary()}
      </div>
    );
  }

  renderSummary() {
    return (
      <div className="app__sidebar" style={this.state}>
        123
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderSummary();
  }
}
