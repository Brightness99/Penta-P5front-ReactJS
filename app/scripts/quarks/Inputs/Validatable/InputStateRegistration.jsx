// @flow
import React from 'react';
import ie from 'inscricaoestadual';
import { InputRegex } from 'quarks/Inputs/Validatable';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  state_registration: string,
  showLabel: boolean,
  required: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onValidate?: () => {},
};

export default class InputStateRegistration extends React.Component {
  static props: Props;
  static state: State;

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

  checkValidation = (value) => {
    const { state_registration } = this.props;

    if (state_registration.toUpperCase() !== 'ISENTO') {
      return ie(value, state_registration);
    }
    return false;
  };

  render() {
    const elementProps = {
      ...this.props,
      type: 'text',
    };

    return (
      <InputRegex
        {...elementProps}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onValidate={this.handleValidation}
        checkValidation={this.checkValidation}
      />
    );
  }
}

