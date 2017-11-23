// @flow

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  placeholder: string,
  value: string,
  onChange: () => {},
  className: string,
};

type State = {
  value: string,
};

export default class SimpleTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    const { onChange } = this.props;

    this.setState({
      value: ev.currentTarget.value,
    });

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  render() {
    const { placeholder, className } = this.props;
    const { value } = this.state;
    return (
      <textarea
        type="text"
        className={cx('atm-input-textarea', className)}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}
