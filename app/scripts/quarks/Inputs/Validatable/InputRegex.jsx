// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Input } from 'quarks/Inputs';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  pattern: any,
  locale: {},
  className: string,
  dispatch: () => {},
  id: string,
  name: string,
  type: string,
  placeholder: string,
  showLabel: boolean,
  required: boolean,
  equalsTo: any,
  value: string,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onValidate?: () => {},
  onEnterKeyPress?: () => {},
  checkValidation?: () => {},
  autoComplete?: () => {},
};

export class InputRegex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      valid: false,
      dirty: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { equalsTo } = this.props;
    const { value } = nextProps;

    if (equalsTo && equalsTo !== nextProps.equalsTo) {
      this.setState(this.handleValidation(this.state.value, nextProps.equalsTo));
    }

    if (value !== this.props.value) {
      this.setState(this.handleValidation(value));
    }
  }

  handleValidation(value, equalsTo) {
    const { onValidate, pattern, required, name, checkValidation, autoComplete } = this.props;

    let valid = true;

    if (pattern) {
      try {
        valid = pattern.test(value);
      } catch (e) {
        valid = false;
      }
    }

    if (valid === true && required === true) {
      valid = (value && value !== null && value.length > 0);
    }

    if (valid === true && equalsTo) {
      valid = (value === equalsTo);
    }

    if (valid === true && (typeof checkValidation === 'function')) {
      valid = checkValidation(value);
    }

    if (typeof autoComplete === 'function') {
      value = autoComplete(value);
    }

    if (typeof onValidate === 'function') {
      onValidate(name, value, valid);
    }

    return { value, valid };
  }

  static props: Props;
  static state: State;

  handleChange = (ev) => {
    const { onChange, equalsTo } = this.props;
    const validated = this.handleValidation(ev.target.value, equalsTo);

    this.setState({ ...validated, dirty: true });

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  handleBlur = (ev) => {
    const { onBlur, equalsTo } = this.props;
    const validated = this.handleValidation(ev.target.value, equalsTo);

    this.setState({ ...validated, dirty: true });

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

  handleEnterKeyPress = (ev) => {
    const { onEnterKeyPress } = this.props;

    if (ev.key === 'Enter') {
      if (typeof onEnterKeyPress === 'function') {
        onEnterKeyPress(ev);
      }
    }
  };

  render() {
    const { id, name, type, showLabel, placeholder, className } = this.props;
    const { value, valid, dirty } = this.state;

    return (
      <Input
        className={cx(valid ? 'valid' : 'invalid', dirty && 'dirty', className)}
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
        onEnterKeyPress={this.handleEnterKeyPress}
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
