// @flow

import React from 'react';

type Props = {
  showLabel: boolean,
  forId: string,
  children: string,
};

const Label = (props: Props) => {
  const { forId, children } = props;

  return (
    <label htmlFor={forId}>
      {children}
    </label>
  );
};

export default Label;
