// @flow
import React from 'react';
import { connect } from 'react-redux';
import { InputRegex } from 'quarks/Inputs/Validatable';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  showLabel: boolean,
  required: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onValidate?: () => {},
  locale: Object,
};

export class InputZipcode extends React.Component {
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

  autoComplete = (value) => {
    const { locale } = this.props;

    if (locale.COUNTRY_CODE === 'BR' && value.length === 5) {
      value += '-';
    }

    return value;
  }

  render() {
    const { locale } = this.props;

    const pattern = (locale.COUNTRY_CODE === 'BR' ? /^([0-9]){5}[-]([0-9]){3}$/ : /(^\d{5}$)|(^\d{5}-\d{4}$)/);
    const elementProps = {
      ...this.props,
      type: 'text',
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
        autoComplete={this.autoComplete}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(InputZipcode);

