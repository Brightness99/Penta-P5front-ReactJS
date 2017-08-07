// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { InputText } from 'atoms/Inputs';

type Props = {
  placeholder: string,
  value: string,
  onChange: () => {},
};

type State = {
};

export default class InputAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render() {
    const { placeholder, value } = this.props;

    return (
      <div className="mol-input-action">
        <InputText
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}
