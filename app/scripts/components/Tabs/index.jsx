// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import cx from 'classnames';

type Props = {
  children: any,
  defaultTab: number,
  className: string,
};

type State = {
  activeIndex: number,
};

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.defaultTab || 0,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps) {
    const { defaultTab } = this.props;

    if (nextProps.defaultTab !== defaultTab) {
      this.setState({
        activeIndex: nextProps.defaultTab,
      });
    }
  }

  static props: Props;

  static state: State;

  handleClick = (ev) => {
    const { activeIndex } = this.state;
    const nextIndex = parseInt(ev.currentTarget.value, 10);

    if (nextIndex !== activeIndex) {
      this.setState({
        activeIndex: nextIndex,
      });
    }
  };

  render() {
    const { children, className } = this.props;
    const { activeIndex } = this.state;

    return (
      <div
        className={cx(
          'org-tabs',
          className
        )}
      >
        {children.map((child) => (
          React.cloneElement(
            child,
            {
              ...child.props,
              activeIndex,
              onClick: this.handleClick,
            }
          )
        ))}
      </div>
    );
  }
}

export TabHeader from './TabHeader';
export TabNav from './TabNav';
export TabBody from './TabBody';
export TabItem from './TabItem';

export default Tabs;
