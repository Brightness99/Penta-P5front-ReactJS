// @flow

import React from 'react';
import cx from 'classnames';

import { InputRadio } from 'quarks/Inputs';

type Props = {
  id?: string,
  name: string,
  value: any,
  checked?: boolean,
  onCLick?: () => {},
  children?: any,
};

const BoxRadio = (props: Props) => {
  const { id, name, value, checked, onCLick, children } = props;

  return (
    <label className={cx('atm-box-radio', props.checked && 'atm-box-radio--selected')}>
      <InputRadio
        name={name}
        id={id}
        value={value}
        onCLick={onCLick}
        checked={checked}
      />
      {children}
    </label>
  );
};

export default BoxRadio;
