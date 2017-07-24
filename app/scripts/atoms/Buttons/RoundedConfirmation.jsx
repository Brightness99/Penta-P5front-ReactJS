// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  children?: any,
  value?: any,
  onClick?: () => {},
  isEnabled: boolean,
};

const RoundedConfirmationButton = (props: Props) => {
  const onButtonClick = (ev) => {
    if (props.isEnabled && typeof props.onClick === 'function') {
      props.onClick(ev);
    }
  };

  return (
    <button
      className={cx(
        'atm-button-rounded',
        props.isEnabled && 'atm-button-rounded--enabled'
      )}
      value={props.value}
      onClick={onButtonClick}
    >
      {props.children}
    </button>
  );
};

export default RoundedConfirmationButton;
