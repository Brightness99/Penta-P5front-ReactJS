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
  inputValue: string,
};

export default class InputAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value || '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      inputValue: ev.currentTarget.value,
    });
  };

  render() {
    const { placeholder, value } = this.props;

    return (
      <div className="mol-input-action">
        <InputText
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
        />
        <button>123</button>
      </div>
    );
  }
}
