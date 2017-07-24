// @flow

import React from 'react';
import cx from 'classnames';

import { MinusSquareOIcon, PlusSquareOIcon } from 'components/Icons';

type Props = {
  children: any,
  className: string,
  activeIndex: number,
};

type State = {
  activeIndex: number,
};

export const AccordionItem = (props: { children: any }) => (props.children);

export class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex || 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { activeIndex } = this.props;
    if (prevProps.activeIndex !== activeIndex) {
      this.state({
        activeIndex,
      });
    }
  }

  static props: Props;

  static state: State;

  handleTabClick = (nextActiveIndex: number) => {
    const { activeIndex } = this.props;

    if (activeIndex !== nextActiveIndex) {
      this.setState({
        activeIndex: nextActiveIndex,
      });
    }
  };

  renderChildren() {
    const { children } = this.props;
    const { activeIndex } = this.state;


    const accordionChildren = children
      .reduce((prevValue, nextValue) => (prevValue.concat(nextValue.props.children)), []);

    const titles = accordionChildren.filter((obj) => obj.type === 'h3');
    const contents = accordionChildren.filter((obj) => obj.type === 'div');

    return titles
      .map((title, index) => ([
        <h3
          key="h3"
          role="button"
          className={cx(
            'atm-accordion-title',
            index === activeIndex && 'atm-accordion-title--active')
          }
          onClick={() => this.handleTabClick(index)}
        >
          {activeIndex === index ? <MinusSquareOIcon /> : <PlusSquareOIcon />}{title.props.children}
        </h3>,
        <div
          key="div"
          className="atm-accordion-item"
          style={{
            height: activeIndex === index ? 'auto' : 0,
          }}
        >
          {contents[index].props.children}
        </div>,
      ])
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={cx(
          'org-accordion',
          className,
        )}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
