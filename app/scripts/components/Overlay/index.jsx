// @flow

import React from 'react';
import cx from 'classnames';

const Overlay = (props: { onClick?: () => {}, className: string }) => {
  const handleClick = (ev) => {
    ev.preventDefault();

    const { onClick } = props;

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <a
      className={cx('app__overlay', props.className)}
      onClick={handleClick}
      href="overlay-click"
      title="overlay"
    >
      Click Overlay
    </a>
  );
};

export default Overlay;
