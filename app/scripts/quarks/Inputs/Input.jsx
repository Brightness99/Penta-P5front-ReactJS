// @flow
import React from 'react';

import Label from './Label';
import InputInterface from './InputInterface';

export default class Input extends InputInterface {
  render() {
    const { id, type, name, value, showLabel, placeholder } = this.props;
    let inputLabel;

    if (showLabel === true) {
      inputLabel = <Label forId={id} placeholder={placeholder} />;
    }

    return (
      <div className="app__qrk__input-container">
        {inputLabel}
        <input
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
