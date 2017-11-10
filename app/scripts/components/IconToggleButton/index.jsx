// @flow

import React from 'react';

type Props = {
  checked: boolean,
  children: React.Children,
  iconChecked: {},
  iconUnchecked: {},
  onChange: (value: boolean) => {},
};

const IconToggleButton = ({
                            checked,
                            children,
                            iconChecked,
                            iconUnchecked,
                            onChange,
                          }: Props) => {
  const icon = checked ? iconChecked : iconUnchecked;
  const handleChange = () => onChange(!checked);

  return (
    <label className="icon-toggle-button">
      <input
        type="checkbox"
        onChange={handleChange}
        value={checked}
        checked={checked}
      />
      {icon}
      {children}
    </label>
  );
};

export default IconToggleButton;

