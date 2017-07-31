// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

type Props = {
  id: string,
  name: string,
  value: any,
  checked: boolean,
  onClick?: () => {},
};

const InputRadio = (props: Props) => {
  const { id, name, value, checked } = props;

  const onChange = (ev) => {
    const { onClick } = props;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  return (
    <div className={cx('qrk-input-radio', checked && 'qrk-input-radio--checked')}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <SVG src={require('assets/media/svg/icon_check.svg')} />
    </div>
  );
};

export default InputRadio;
