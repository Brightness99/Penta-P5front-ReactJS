// @flow
import React from 'react';
import cx from 'classnames';

import { InputRegex } from 'quarks/Inputs/Validatable';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  showLabel: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

export default class InputPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', valid: false };
  }

  static props: Props;
  static state: State;

  handleClick = (ev) => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  handleChange = (ev, inputName, valid) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(ev, inputName, valid);
    }
  };

  handleFocus = (ev) => {
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      onFocus(ev);
    }
  };

  handleBlur = (ev) => {
    const { onBlur } = this.props;

    if (typeof onBlur === 'function') {
      onBlur(ev);
    }
  };

  render() {
    const { id, name, showLabel, placeholder } = this.props;
    const { value, valid } = this.state;
    const pattern = /^([a-zA-Z0-9_-]){6,99}$/;

    return (
      <InputRegex
        className={cx(valid ? 'valid' : 'invalid')}
        type="password"
        pattern={pattern}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        showLabel={showLabel}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}
