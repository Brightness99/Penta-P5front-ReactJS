// @flow

import React from 'react';
import cx from 'classnames';

import { InputRadio } from 'quarks/Inputs';

type Props = {
  id?: string,
  name: string,
  value: any,
  checked?: boolean,
  onChange?: () => {},
  children?: any,
};

const BoxRadio = (props: Props) => {
  const { id, name, value, checked, children } = props;

  const handleChange = (ev) => {
    const { onChange } = props;
    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  return (
    <label className={cx('atm-box-radio', props.checked && 'atm-box-radio--selected')}>
      <InputRadio
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      {children}
    </label>
  );
};

export default BoxRadio;
