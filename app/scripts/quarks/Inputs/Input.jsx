// @flow

import React from 'react';
import cx from 'classnames';

import Label from './Label';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  value: any,
  type: string,
  showLabel: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

const Input = (props: Props) => {
  const {
    id,
    type,
    name,
    value,
    showLabel,
    placeholder,
    onClick,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const handleClick = (ev) => {
    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  const handleChange = (ev) => {
    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  const handleFocus = (ev) => {
    if (typeof onFocus === 'function') {
      onFocus(ev);
    }
  };

  const handleBlur = (ev) => {
    if (typeof onBlur === 'function') {
      onBlur(ev);
    }
  };

  let inputLabel;

  if (showLabel === true) {
    inputLabel = <Label showLabel={showLabel} forId={id} placeholder={placeholder} />;
  }

  return (
    <div className="qrk-input-container">
      {inputLabel}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onClick={handleClick}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;
