// @flow
import React from 'react';

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

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    if (typeof onChange === 'function') {
      onChange(ev);
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
    const { id, type, name, value, showLabel, placeholder, className } = this.props;
    let inputLabel;

    if (showLabel === true) {
      inputLabel = <Label forId={id} placeholder={placeholder} />;
    }

    return (
      <div className="app__qrk__input-container">
        {inputLabel}
        <input
          className={className}
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}
