// @flow

import React from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  id: string,
  name: string,
  value: any,
  onChange: () => {},
};

export class RadioButton extends React.Component {
  static props: Props;

  onChange = (ev) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  render() {
    const { id, name, value } = this.props;
    return (
      <div className="app__input--radio">
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={this.onChange}
        />
        <SVG src={require('assets/media/svg/icon_check.svg')} />
      </div>
    );
  }
}

export default RadioButton;
