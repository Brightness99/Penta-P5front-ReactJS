// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  isTabActive: boolean,
  onClick: () => {},
  tabIndex: number,
  children: any,
};

const TabNav = (props: Props) => {
  const { isTabActive, tabIndex, children } = props;

  const handleClick = (ev) => {
    const { onClick } = props;

    console.log(onClick);

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      className={cx(
        'atm-tab-nav',
        isTabActive && 'atm-tab-nav--active',
      )}
      value={tabIndex}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default TabNav;
