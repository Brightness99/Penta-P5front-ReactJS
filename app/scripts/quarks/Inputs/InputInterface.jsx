// @flow
import React from 'react';

type Props = {
  id: string,
  name: string,
  placeholder: string,
  showLabel: boolean,
  onClick?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onBlur?: () => {},
};

export default class InputInterface extends React.Component {
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
}
