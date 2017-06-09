// @flow

import React from 'react';

type Props = {
  id?: string,
  className?: string,
  name?: string,
  placeholder?: string,
  mask?: string,
  onValid: () => {},
};

type State = {
  inputValue: string,
};

export default class MaskedInput extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;

    if (inputValue.length >= 8 && prevState.inputValue !== inputValue) {
      this.handleFetch();
    }
  }

  static props: Props;

  static state: State;

  handleFetch = () => {
    const { onValid } = this.props;
    const { inputValue } = this.state;

    if (typeof onValid === 'function') {
      onValid(inputValue);
    }
  };

  onChange = (ev) => {
    this.setState({
      inputValue: ev.target.value.replace(/[^0-9]/g, '').slice(0, 8),
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="app__input__masked">
        <input
          type="text"
          onChange={this.onChange}
          value={inputValue}
        />
        <button onClick={this.handleFetch}>Ok</button>
      </div>
    );
  }
}
