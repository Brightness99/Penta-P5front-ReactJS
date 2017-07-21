// @flow

import React from 'react';
import cx from 'classnames';

import { InputRadio } from 'quarks/Inputs';

type Props = {
  id?: string,
  name: string,
  value: any,
  checked?: boolean,
  onClick?: () => {},
  children?: any,
};

const BoxRadio = (props: Props) => {
  const { id, name, value, checked, onClick, children } = props;

  return (
    <label className={cx('atm-box-radio', props.checked && 'atm-box-radio--selected')}>
      <InputRadio
        name={name}
        id={id}
        value={value}
        onCLick={onClick}
        checked={checked}
      />
      {children}
    </label>
  );
};

export default BoxRadio;
