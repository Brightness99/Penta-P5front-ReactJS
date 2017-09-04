// @flow

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';

import AccordionItem from './AccordionItem';

type Props = {
  children: any,
  component: string,
  className: string,
  defaultItem: number,
};

type State = {
  selectedItem: number,
};

export class Accordion extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: props.defaultItem,
    };
  }

  static defaultProps = {
    component: 'div',
    defaultItem: 0,
  };

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps) {
    const { defaultItem } = this.props;

    if (nextProps.defaultItem !== defaultItem) {
      this.setState({
        defaultItem: nextProps.defaultItem,
      });
    }
  }

  static props: Props;

  static state: State;

  handleNavigation = (ev) => {
    console.log('accordion biiiiiiiiiiiiirl');
  };

  render() {
    const { className, component, children } = this.props;

    if (!Array.isArray(children)) {
      return children;
    }

    console.log(typeof this.props.children, this.props.children, this.props.children.length, Array.isArray(children));
    return (
      <component className={cx('org-accordion', className)}>
        {
          children
            .filter((child) => child.type.displayName === 'AccordionItem')
            .map((child) => React.cloneElement(
              child,
              {
                ...child.props,
                key: child.key,
                handleClick: this.handleNavigation,
              },
              child.props.children
            ))
        }
      </component>
    );
  }
}

export AccordionItem from './AccordionItem';
export AccordionItemBody from './AccordionItemBody';
export AccordionItemTitle from './AccordionItemTitle';
