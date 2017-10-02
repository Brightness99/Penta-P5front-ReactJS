// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  icon: any,
  title: string,
  className: string,
  onClick: () => {},
};

const IconLeftButton = (props: Props) => {
  const { icon, title, className, onClick } = props;

  const handleClick = (ev) => {
    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <button
      className={cx('icon-left-button ', className)}
      onClick={handleClick}
    >
      {icon}
      {title}
    </button>
  );
};

export default IconLeftButton;
