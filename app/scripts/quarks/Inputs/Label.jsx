// @flow

import React from 'react';

type Props = {
  showLabel: boolean,
  forId: string,
  placeholder: string,
};

const Label = (props: Props) => {
  const { showLabel, forId, placeholder } = props;

  if (showLabel === true) {
    return (
      <label htmlFor={forId}>
        {placeholder}
      </label>
    );
  }

  return null;
};

export default Label;
