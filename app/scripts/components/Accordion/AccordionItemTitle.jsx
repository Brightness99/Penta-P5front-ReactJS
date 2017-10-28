// @flow

import React from 'react';
import cx from 'classnames';
import { AngleDownIcon, AngleRightIcon, MinusSquareOIcon, PlusSquareOIcon } from 'components/Icons';

type Props = {
  active: boolean,
  className: string,
  value: number,
  children: any,
  icon: string,
  handleActive: () => {},
  handleClick: () => {},
};

class AccordionItemTitle extends React.Component {
  constructor(props) {
    super(props);
    this.isClick = false;
  }

  componentWillReceiveProps(newProps) {
    const { active, handleActive } = this.props;
    if (active !== newProps.active && this.isClick) {
      if (typeof handleActive === 'function') {
        handleActive(newProps.active);
      }
      this.isClick = false;
    }
  }

  props: Props;

  onClick = (ev) => {
    const { handleClick } = this.props;
    if (typeof handleClick === 'function') {
      this.isClick = true;
      handleClick(parseInt(ev.currentTarget.value, 10));
    }
  };

  render() {
    const { active, icon, children, value, className } = this.props;
    const renderMark = (icon === 'square') ?
      (
        <button
          className={cx('atm-accordion-title', className)}
          onClick={this.onClick}
          value={value}
          key={value}
        >
          {active ? <MinusSquareOIcon /> : <PlusSquareOIcon />}{children}
        </button>
      ) :
      (
        <button
          className={cx('atm-accordion-title', className)}
          onClick={this.onClick}
          value={value}
          key={value}
        >
          {children}{active ? <AngleDownIcon /> : <AngleRightIcon />}
        </button>
      );
    return renderMark;
  }
}

export default AccordionItemTitle;
