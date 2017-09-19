// @flow

// TODO: Evaluate this

import React from 'react';

type Props = {
  children: any,
};

const TabItem = (props: Props) => {
  const { children } = props;
  return (
    <div className="atm-tab-item">
      {children}
    </div>
  );
};

export default TabItem;
