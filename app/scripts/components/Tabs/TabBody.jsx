// @flow

import React from 'react';

type Props = {
  children: any,
  activeIndex: number,
};

const TabBody = (props: Props) => {
  const { children, activeIndex } = props;

  if (!Array.isArray(children)) {
    return <div className="atm-tab-active">{children}</div>;
  }

  return <div className="atm-tab-active">{children[activeIndex]}</div>;
};

export default TabBody;
