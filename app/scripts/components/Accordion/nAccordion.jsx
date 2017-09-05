// @flow

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';

import AccordionItem from './AccordionItem';

type Props = {
  children: any,
  className: string,
  onChange: () => {},
  id: any,
  icon: string,
};

type State = {
  activeItem: number,
};

export class Accordion extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeItem: -1,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.handleDefaultItem();
  }

  componentWillReceiveProps() {
    this.handleDefaultItem();
  }

  static props: Props;

  static state: State;

  handleDefaultItem = () => {
    const { children } = this.props;
    let { activeItem } = this.state;

    if (Array.isArray(children)) {
      children.forEach((child, index) => {
       if (child.props.active) {
         activeItem = index;
       }
      });
    } else if (children.props.active) {
      activeItem = 0;
    }

    this.setState({
      activeItem,
    });
  };

  handleNavigation = (nextActiveItem) => {
    const { activeItem } = this.state;
    let finalActiveItem = nextActiveItem;

    if (nextActiveItem === activeItem) {
      finalActiveItem = -1;
    }

    this.setState({
      activeItem: finalActiveItem,
    });
  };

  render() {
    const { id, className, children, icon, onChange } = this.props;
    const { activeItem } = this.state;

    return (
      <div
        id={id}
        className={cx('org-accordion', className)}
        ref={(accordion) => this.accordion = accordion}  // eslint-disable-line no-return-assign
      >
        {
          !Array.isArray(children) ?
            React.cloneElement(
              children,
              {
                ...children.props,
                key: 'Accordion-0',
                handleClick: this.handleNavigation,
                active: activeItem === 0,
                icon,
                itemId: 0,
                onChange,
                onUpdate: this.handleUpdate,
              },
              children.props.children
            )
            : children
            .filter((child) => child.type.displayName === 'AccordionItem')
            .map((child, index) => React.cloneElement(
              child,
              {
                ...child.props,
                key: child.key,
                handleClick: this.handleNavigation,
                active: index === activeItem,
                icon,
                itemId: index,
                onChange,
                onUpdate: this.handleUpdate,
              },
              child.props.children
            ))
        }
      </div>
    );
  }
}

export AccordionItem from './AccordionItem';
export AccordionItemBody from './AccordionItemBody';
export AccordionItemTitle from './AccordionItemTitle';
