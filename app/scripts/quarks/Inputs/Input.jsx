// @flow
import React from 'react';
import cx from 'classnames';

import Label from './Label';

type Props = {
  id: string,
  name: string,
  type: string,
  value: string,
  className: string,
  placeholder: string,
  showLabel: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

type State = {
  isFocused: boolean,
  value: string,
};

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocused: false,
    };
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
    const { onChange } = this.props;

    this.setState({
      value: ev.currentTarget.value,
    });

    if (typeof onChange === 'function') {
      onChange(ev);
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

  handleBlur = (ev) => {
    const { onBlur } = this.props;

    this.setState({
      isFocused: false,
    });

    if (typeof onBlur === 'function') {
      onBlur(ev);
    }
  };

  render() {
    const { id, type, name, showLabel, placeholder, className } = this.props;
    const { value, isFocused } = this.state;

    return (
      <div
        className={cx(
          'app__qrk__input-container',
          showLabel && 'app__qrk__input-container--labeled',
        )}
      >
        {showLabel && <Label
            className={cx(
              (value || isFocused) && 'app__qrk__input-label--active'
            )}
            forId={id}
          >
            {placeholder}
          </Label>}
        <input
          className={className}
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={!showLabel ? placeholder : ''}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}
