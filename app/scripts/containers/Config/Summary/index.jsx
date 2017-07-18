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
    const componentHeight = document.querySelector('.app__settings__summary').offsetHeight;
    const componentOffset = headerHeight + containerOffset;
    const pageOffset = window.pageYOffset;

    if (pageOffset + componentHeight >= containerHeight) {
      this.setState({
        position: 'absolute',
        right: 0,
        top: containerHeight - componentHeight,
      });
    } else if (position !== 'fixed') {
      console.log('changed');
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
    const { selection, optionSectionInfo, calculator } = this.props;

    return (
      <div className="app__settings__summary" style={this.state}>
        <h3>Resumo do produto</h3>
        {Object.keys(selection).map((option) => (
          <div key={option}>
            {Object.keys(selection).length > 1 && <span>{calculator[option].name}</span>}
            {Object.keys(selection) > 1 && <b>{option}:</b>}
            <ul>
              {Object.keys(selection[option]).map((item) => (
                <li key={item}>
                  <span>{
                    optionSectionInfo[option]
                      .filter(obj => obj.key === item)
                      .reduce((prevValue, currentValue) => currentValue.name, '')
                }</span>: {
                  calculator[option].options[item]
                    .filter(obj => obj.id === selection[option][item])
                    .reduce((prevValue, currentValue) => currentValue.name, '')
                }
                </li>
              ))}
            </ul>
          </div>
        ))}
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
