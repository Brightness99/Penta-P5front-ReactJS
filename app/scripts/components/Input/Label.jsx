// @flow

import React from 'react';

type Props = {
  showLabel: boolean,
  forId: string,
  children: string,
  className: string,
};

const Label = (props: Props) => {
  const { forId, children, className } = props;

  return (
    <label className={className} htmlFor={forId}>
      {children}
    </label>
  );
};

export default Label;
