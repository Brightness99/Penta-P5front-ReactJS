// @flow
import React from 'react';

import { InputRegex } from 'quarks/Inputs/Validatable';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  showLabel: boolean,
  showPassword: boolean,
  required: boolean,
  equalsTo: any,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onValidate?: () => {},
};

export default class InputPassword extends React.Component {
  static props: Props;

  handleClick = (ev) => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(ev);
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

  handleChange = (ev) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  handleValidation = (name, value, valid) => {
    const { onValidate } = this.props;

    if (typeof onValidate === 'function') {
      onValidate(name, value, valid);
    }
  };

  getInputType = () => {
    const { showPassword } = this.props;

    if (showPassword) return 'text';
    return 'password';
  };

  render() {
    const pattern = /^([a-zA-Z0-9_-]){6,99}$/;
    const elementProps = {
      ...this.props,
      type: this.getInputType(),
      pattern,
    };

    return (
      <InputRegex
        {...elementProps}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onValidate={this.handleValidation}
      />
    );
  }
}
