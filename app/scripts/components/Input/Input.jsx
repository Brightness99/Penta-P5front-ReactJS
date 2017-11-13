// @flow
import React from 'react';
import Inputmask from 'inputmask';
import cx from 'classnames';

import Label from './Label';

type Props = {
  id?: string,
  name?: string,
  type?: string,
  value?: string,
  className?: string,
  placeholder?: string,
  pattern?: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
  onEnterKeyPress?: () => {},
  checkValidation?: () => {},
  readOnly?: boolean,
  required?: boolean,
};

type State = {
  isFocused: boolean,
  value: string,
  dirty: boolean,
  valid: boolean,
};

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      isFocused: false,
      dirty: false,
      valid: false,
    };
  }

  static defaultProps = {
    id: `input-${new Date()}`,
    readOnly: false,
    type: 'text',
  };

  componentDidMount() {
    const { type, pattern, onChange } = this.props;

    if (pattern && ['text', 'tel', 'password'].includes(type)) {
      Inputmask({
        showMaskOnHover: false,
        showMaskOnFocus: false,
        ...pattern instanceof RegExp
          ? {
            isComplete: () => pattern.test(this.state.value),
          }
          : { mask: pattern },
      }).mask(this._input);
    }

    if (typeof onChange === 'function') {
      onChange(this.handleValidation(this.state.value), this.state.value);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { onChange } = this.props;

    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        valid: this.handleValidation(nextProps.value),
      });
    }

    if ((nextState.valid !== this.state.valid || nextState.value !== this.state.value) && typeof onChange === 'function') {
      onChange(nextState.valid, nextState.value);
    }
  }

  static props: Props;
  static state: State;

  handleChange = (ev) => {
    this.setState({
      value: ev.currentTarget.value,
      valid: this.handleValidation(ev.currentTarget.value),
      dirty: true,
    });
  };

  handleBlur = (ev) => {
    const { onBlur } = this.props;

    this.setState({
      value: ev.currentTarget.value,
      valid: this.handleValidation(ev.target.value),
      isFocused: false,
    });

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

    this.setState({
      isFocused: true,
    });

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

  handleValidation = (value) => {
    const { required, checkValidation } = this.props;

    if (required && value === '') {
      return false;
    }

    if (this._input.inputmask && !this._input.inputmask.isComplete() && !this._input.inputmask.isValid()) {
      return false;
    }

    if (typeof checkValidation === 'function') {
      return checkValidation(value);
    }

    return true;
  };

  render() {
    const {
      id,
      type,
      name,
      placeholder,
      className,
      readOnly,
      required,
    } = this.props;

    const {
      value,
      isFocused,
      dirty,
      valid,
    } = this.state;

    return (
      <div
        className={cx(
          'app__qrk__input-container',
          !!placeholder && 'app__qrk__input-container--labeled',
          className,
          !isFocused && dirty && 'dirty',
          valid ? 'valid' : 'invalid'
        )}
      >
        {
          !!placeholder &&
          <Label
            className={cx(
              'app__qrk__input-label',
              (value || isFocused) && 'app__qrk__input-label--active'
            )}
            forId={id}
          >
            {placeholder}{required && '*'}
          </Label>
        }
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyPress={this.handleEnterKeyPress}
          readOnly={readOnly}
          ref={(c) => (this._input = c)} // eslint-disable-line no-return-assign
        />
      </div>
    );
  }
}
