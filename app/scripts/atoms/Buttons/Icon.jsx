// @flow

import React from 'react';

type Props = {
  icon: any,
};

const IconButton = (props: Props) => {
  const { icon } = props;

  return (
    <button
      className="atm-icon-button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
