// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { Input } from 'quarks/Inputs';

type Props = {
  app: AppStore,
  router: RouterStore,
  pattern: any,
  locale: {},
  dispatch: () => {},
  id: string,
  name: string,
  type: string,
  placeholder: string,
  showLabel: boolean,
  required: boolean,
  equalsTo: any,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onValidate?: () => {},
};

export class InputRegex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valid: false,
      dirty: false,
    };
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { equalsTo } = this.props;

    if (equalsTo && equalsTo !== nextProps.equalsTo) {
      this.setState(this.handleValidation(this.state.value, nextProps.equalsTo));
    }
  }

  handleValidation(value, equalsTo) {
    const { onValidate, pattern, required, name } = this.props;

    let valid = true;

    try {
      valid = pattern.test(value);
    } catch (e) {
      valid = false;
    }

    if (valid === true && required === true) {
      valid = (value && value !== null && value.length > 0);
    }

    if (valid === true && equalsTo) {
      valid = (value === equalsTo);
    }

    if (typeof onValidate === 'function') {
      onValidate(name, value, valid);
    }

    return { value, valid, dirty: true };
  }

  static props: Props;
  static state: State;

  handleChange = (ev) => {
    const { onChange, equalsTo } = this.props;
    const validated = this.handleValidation(ev.target.value, equalsTo);

    this.setState(validated);

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  handleBlur = (ev) => {
    const { onBlur, equalsTo } = this.props;
    const validated = this.handleValidation(ev.target.value, equalsTo);

    this.setState(validated);

    if (typeof onBlur === 'function') {
      onBlur(ev);
    }
  };

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

  render() {
    const { id, name, type, showLabel, placeholder } = this.props;
    const { value, valid, dirty } = this.state;

    return (
      <Input
        className={cx(valid ? 'valid' : 'invalid', dirty && 'dirty')}
        id={id}
        name={name}
        placeholder={placeholder}
        showLabel={showLabel}
        type={type}
        value={value}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(InputRegex);
