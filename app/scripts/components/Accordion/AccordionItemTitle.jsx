// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  handleClick: () => {},
  className: string,
  component: string,
  value: number,
  children: any,
};

const AccordionItemTitle = (props: Props) => {
  const { component, value, className, children } = props;

  const onClick = (ev) => {
    const { handleClick } = props;

    if (typeof handleClick === 'function') {
      handleClick(ev);
    }
  };

  console.log(component);

  return React.createElement(
    component,
    {
      className: cx('atm-accordion-title', className),
      role: 'button',
      onClick: onClick,
      value: value,
    },
    children
  );
};

AccordionItemTitle.defaultProps = {
  component: 'button',
};

export default AccordionItemTitle;
