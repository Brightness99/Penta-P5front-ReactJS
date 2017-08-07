// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  className: string,
  children: any,
  onClick: () => {},
};

const TextButton = (props: Props) => {
  const { className, children, onClick } = props;

  const handleClick = (ev) => {
    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      className={cx('atm-button-text', className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default TextButton;
