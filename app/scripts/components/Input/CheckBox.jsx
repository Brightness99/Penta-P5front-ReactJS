// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

type Props = {
  id: string,
  name: string,
  value: any,
  checked: boolean,
  onChange: () => {},
};

export default class CheckBox extends React.Component {
  static defaultProps = {
    checked: false,
  };

  static props: Props;

  onChange = (ev) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(ev);
    }
  };

  render() {
    const { id, name, value, checked } = this.props;
    return (
      <div className={cx('app__input__checkbox', checked && 'app__input__checkbox--checked')}>
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          onChange={this.onChange}
          checked={checked}
        />
        <SVG src={require('assets/media/svg/icon_check.svg')} />
      </div>
    );
  }
}
