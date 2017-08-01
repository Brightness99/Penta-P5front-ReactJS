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
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

export class InputEmail extends React.Component {
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

  handleChange = (ev) => {
    const { name, onChange, pattern } = this.props;
    const value = ev.target.value;
    let valid = true;

    try {
      valid = pattern.test(value);
    } catch (e) {
      valid = false;
    }

    this.setState({ value, valid });

    if (typeof onChange === 'function') {
      onChange(ev, name, valid);
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
    const { id, name, type, showLabel, placeholder } = this.props;
    const { value, valid } = this.state;

    return (
      <Input
        className={cx(valid ? 'valid' : 'invalid')}
        type={type}
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

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(InputEmail);
