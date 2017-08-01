// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { InputGeneric } from 'quarks/Inputs/Validatable';

type Props = {
  dispatch: () => {},
  id: string,
  name: string,
  placeholder: string,
  showLabel: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

export default class InputEmail extends React.Component {
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
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <InputGeneric
        className={cx(valid ? 'valid' : 'invalid')}
        type="email"
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
