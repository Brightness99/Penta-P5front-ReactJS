// @flow

import React from 'react';
import Inputmask from 'inputmask';
import cx from 'classnames';

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
  fullValue: string,
};

export default class MaskedInput extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: props.defaultValue || '',
      fullValue: props.defaultValue || '',
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
        fullValue: nextProps.defaultValue,
      });
    }
    if (this.props.mask !== nextProps.mask) {
      Inputmask(nextProps.mask).mask(this._input);
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
    const { onValid, checkCompleted, mask } = this.props;
    const { inputValue, fullValue } = this.state;

    if (inputValue.length >= mask.replace(/[^0-9]/g, '').length) {
      if (typeof onValid === 'function') {
        onValid(inputValue);
      }

      if (typeof checkCompleted === 'function') {
        checkCompleted(true, fullValue);
      }
    } else if (typeof checkCompleted === 'function') {
      checkCompleted(false, inputValue);
    }
  };

  onChange = (ev) => {
    this.setState({
      inputValue: ev.target.value.replace(/[^0-9]/g, ''),
      fullValue: ev.target.value,
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
    const { className } = this.props;
    return (
      <div className={cx('app__input__masked', className)}>
        <input
          type="text"
          onChange={this.onChange}
          value={inputValue}
          ref={(c) => (this._input = c)} // eslint-disable-line no-return-assign
        />
      </div>
    );
  }
}
