// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  children: any,
};

type State = {
};

export default class StickBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: 0,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.handleContent();

    window.addEventListener('resize', this.handleContent);
    window.addEventListener('scroll', this.handleContent);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleContent);
    window.removeEventListener('scroll', this.handleContent);
  }

  static props: Props;

  static state: State;

  handleContent = () => {
    const containerRect = document.querySelector('.org-stick-bar').getBoundingClientRect();
    const contentRect = document.querySelector('.org-stick-bar-content').getBoundingClientRect();
    const pageYOffset = window.pageYOffset;

    if (pageYOffset + contentRect.height >= containerRect.height) {
      this.setState({
        left: 0,
        width: containerRect.width,
        top: containerRect.height - contentRect.height,
        position: 'absolute',
      });
    } else {
      this.setState({
        left: containerRect.left,
        width: containerRect.width,
        top: (pageYOffset + containerRect.top),
        position: 'fixed',
      });
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className="org-stick-bar">
        <div className="org-stick-bar-content" style={this.state}>
          {children}
        </div>
      </div>
    );
  }
}
