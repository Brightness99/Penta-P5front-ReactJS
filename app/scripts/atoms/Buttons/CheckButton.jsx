// @flow

import React from 'react';
import cx from 'classnames';
import { CheckCircleOIcon } from 'components/Icons';

type Props = {
  icon: any,
  title: string,
  className: string,
  onClick: () => {},
};

const CheckButton = (props: Props) => {
  const { title, className, onClick } = props;

  const handleClick = (ev) => {
    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      className={cx('check-button ', className)}
      onClick={handleClick}
    >
      <CheckCircleOIcon />
      {title}
    </button>
  );
};

export default CheckButton;
