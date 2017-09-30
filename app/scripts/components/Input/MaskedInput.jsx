// @flow

import React from 'react';
import Inputmask from 'inputmask';
import { TimesCircleIcon } from 'components/Icons';

type Props = {
  id?: string,
  className?: string,
  name?: string,
  placeholder?: string,
  mask?: string,
  defaultValue?: string,
  onValid: () => {},
  onReset: () => {},
  checkCompleted: () => {},
};

type State = {
  inputValue: string,
};

export default class MaskedInput extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: props.defaultValue || '',
    };
  }

  componentDidMount() {
    const { mask } = this.props;
    Inputmask(mask).mask(this._input);
  }

  componentWillUpdate(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({
        inputValue: nextProps.defaultValue,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;

    if (prevState.inputValue !== inputValue) {
      this.handleFetch();
    }
  }

  static props: Props;

  static state: State;

  handleFetch = () => {
    const { onValid, checkCompleted } = this.props;
    const { inputValue } = this.state;

    if (inputValue.length >= 8) {
      if (typeof onValid === 'function') {
        onValid(inputValue);
      }

      if (typeof checkCompleted === 'function') {
        checkCompleted(true);
      }
    } else if (typeof checkCompleted === 'function') {
      checkCompleted(false);
    }
  };

  onChange = (ev) => {
    this.setState({
      inputValue: ev.target.value.replace(/[^0-9]/g, '').slice(0, 8),
    });
  };

  onClick = () => {
    const { onReset } = this.props;

    if (typeof onReset === 'function') {
      onReset();
    }
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="app__input__masked">
        <input
          type="text"
          onChange={this.onChange}
          value={inputValue}
          ref={(c) => (this._input = c)} // eslint-disable-line no-return-assign
        />
        <button onClick={this.onClick} className="app__reset_zipcode">
          <TimesCircleIcon />
        </button>
      </div>
    );
  }
}
