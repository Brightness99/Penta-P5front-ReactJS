// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import cx from 'classnames';
import { ChevronDownIcon } from 'components/Icons';
import Label from 'quarks/Inputs/Label';

type Props = {
  id: string,
  children: any,
  className: string,
  showLabel: boolean,
  name: string,
  placeholder: string,
  required: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

type State = {
  value: string,
  valid: boolean,
  dirty: boolean,
  isFocused: boolean,
};

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valid: false,
      dirty: false,
      isFocused: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

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
      valid: !!ev.currentTarget.value,
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
    const { onBlur, required } = this.props;

    this.setState({
      isFocused: false,
      dirty: required,
    });

    if (typeof onBlur === 'function') {
      onBlur(ev);
    }
  };

  render() {
    const { id, className, showLabel, children, placeholder, required } = this.props;
    const { isFocused, value, valid, dirty } = this.state;

    return (
      <div
        className={cx(
          'atm-simple-select',
          showLabel && 'atm-simple-select--labeled',
          className,
          valid ? 'valid' : 'invalid',
          dirty && 'dirty',
        )}
      >
        {showLabel && <Label
          className={cx(
            'app__qrk__input-label',
            (value !== '' || isFocused) && 'app__qrk__input-label--active'
          )}
          forId={id}
        >
          {`${placeholder}${required ? '*' : ''}`}
        </Label>}
        <select
          id={id}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          <option />
          {children}
        </select>
        <ChevronDownIcon />
      </div>
    );
  }
}
