// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { Input } from 'quarks/Inputs';
import { ArrowRightIcon } from 'components/Icons';

type Props = {
  value: string,
  placeholder: string,
  name: string,
  onSubmit: () => {},
  voucher: {},
  value: string,
};

type State = {
  isButtonVisible: boolean,
};

export default class InputAction extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isButtonVisible: props.value,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      isButtonVisible: ev.currentTarget.value !== '',
    });
  };

  handleSubmit = (ev) => {
    const { onSubmit } = this.props;

    if (typeof onSubmit === 'function') {
      onSubmit(ev);
    }
  };

  render() {
    const { placeholder, name, value } = this.props;
    const { isButtonVisible } = this.state;

    return (
      <form className="mol-action-button" onSubmit={this.handleSubmit}>
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        {isButtonVisible && <button
          className="atm-icon-button"
        >
          <ArrowRightIcon />
        </button>}
      </form>
    );
  }
}
