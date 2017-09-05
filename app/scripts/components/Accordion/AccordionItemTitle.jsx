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
  handleClick: () => {},
};

const AccordionItemTitle = (props: Props) => {
  const { active, icon, children, value, className } = props;

  const onClick = (ev) => {
    const { handleClick } = props;

    if (typeof handleClick === 'function') {
      handleClick(parseInt(ev.currentTarget.value, 10));
    }
  };

  if (icon === 'square') {
    return (
      <button
        className={cx('atm-accordion-title', className)}
        onClick={onClick}
        value={value}
        key={value}
      >
        {active ? <MinusSquareOIcon /> : <PlusSquareOIcon />}{children}
      </button>
    );
  }

  return (
    <button
      className={cx('atm-accordion-title', className)}
      onClick={onClick}
      value={value}
      key={value}
    >
      {children}{active ? <AngleDownIcon /> : <AngleRightIcon />}
    </button>
  );
};

export default AccordionItemTitle;
