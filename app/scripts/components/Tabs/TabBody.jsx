// @flow

import React from 'react';

type Props = {
  children: any,
  activeIndex: number,
};

const TabBody = (props: Props) => {
  const { children, activeIndex } = props;


  if (!children) {
    console.warn('Tabs: Empty or errored children passed to TabBody'); // eslint-disable-line no-console
    return null;
  }

  if (!Array.isArray(children)) {
    return <div className="atm-tab-active">{children}</div>;
  }

  return (
    <div className="atm-tab-active">
      {children[activeIndex]}
    </div>
  );
};

export default TabBody;
