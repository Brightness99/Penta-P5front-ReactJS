// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { Input } from 'quarks/Inputs';
import { ArrowRightIcon, PencilIcon, TimesIcon } from 'components/Icons';

type Props = {
  value: string,
  placeholder: string,
  aditionalReturn: string,
  onSubmit: () => {},
};

type State = {
  isButtonVisible: boolean,
  isEditing: boolean,
};

export default class EditableText extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isButtonVisible: props.value,
      isEditing: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps: Props) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        isEditing: false,
      });
    }
  }

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      isButtonVisible: ev.currentTarget.value !== '',
    });
  };

  handleSubmit = (ev) => {
    const { onSubmit, aditionalReturn } = this.props;

    this.handleEditingOff();

    if (typeof onSubmit === 'function') {
      onSubmit(ev, aditionalReturn);
    }
  };

  handleEditingOff = () => {
    this.setState({
      isEditing: false,
    });
  }

  handleEditingOn = () => {
    this.setState({
      isEditing: true,
    });
  }

  render() {
    const { placeholder, value } = this.props;
    const { isButtonVisible, isEditing } = this.state;

    if (!isEditing) {
      return (
        <div role="button" onClick={this.handleEditingOn} className="mol-editable-text mol-editable-text--inactive" onSubmit={this.handleSubmit}>
          {value}
          <PencilIcon />
        </div>
      );
    }

    return (
      <div className="org-editable-text">
        <form className="mol-editable-text mol-editable-text--active" onSubmit={this.handleSubmit}>
          <Input
            name="editableInput"
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
        <button
          className="atm-icon-button"
          onClick={this.handleEditingOff}
        >
          <TimesIcon />
        </button>
      </div>
    );
  }
}
