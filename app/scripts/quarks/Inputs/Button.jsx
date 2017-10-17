// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  children?: any,
  className: string,
  disabled: boolean,
  kind: string,
  name: string,
  onClick?: () => {},
  type: string,
  isLoading: boolean,
};

const Button = (props: Props) => {
  const {
    children,
    className,
    disabled,
    kind,
    name,
    onClick,
    type,
    isLoading,
  } = props;

  const handleClick = (ev) => {
    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };
  const content = isLoading ? 'Loading...' : children;

  return (
    <button
      className={cx(
        className,
        'app__qrk__button',
        (kind !== undefined && kind.length > 0) ? kind : ''
      )}
      disabled={disabled || isLoading}
      name={name}
      onClick={handleClick}
      type={type}
    >
      {content}
    </button>
  );
};

export default Button;
