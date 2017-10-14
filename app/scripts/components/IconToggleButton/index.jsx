// @flow

import React from 'react';

type Props = {
  id: string,
  title: string,
  iconChecked: {},
  iconUnchecked: {},
  onChange: (value: boolean) => {},
};

type State = {
  checked: boolean,
}

export default class IconToggleButton extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  static defaultProps = {
    checked: false,
  };

  props: Props;
  state: State;

  onChange = () => {
    const { onChange } = this.props;
    const newState  = !this.state.checked;
    this.setState({
      checked: newState,
    });

    if (typeof onChange === 'function') {
      onChange(newState);
    }
  };

  renderIcon() {
    const { iconChecked, iconUnchecked } = this.props;
    const { checked } = this.state;

    if (checked) return iconChecked;
    return iconUnchecked;
  }

  render() {
    const { checked } = this.state;
    const { title } = this.props;
    return (
      <label className="icon-toggle-button">
        <input
          type="checkbox"
          onChange={this.onChange}
          value={checked}
          checked={checked}
        />
        {this.renderIcon()}
        <span>{title}</span>
      </label>
    );
  }
}
