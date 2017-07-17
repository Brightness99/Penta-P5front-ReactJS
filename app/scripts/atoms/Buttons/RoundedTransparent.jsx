// @flow

import React from 'react';

type Props = {
  children?: any,
  onClick?: () => {},
}

const RoundedTransparentButton = (props: Props) => {
  const onButtonClick = (ev) => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      className="atm-button-transparent"
      onClick={onButtonClick}
    >
      {props.children}
    </button>
  );
};

export default RoundedTransparentButton;
