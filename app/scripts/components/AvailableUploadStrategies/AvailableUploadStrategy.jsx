// @flow

import React from 'react';
import { BoxRadio } from 'atoms/Inputs';
import AvailableUploadIcon from './AvailableUploadIcon';

type Props = {
  title: string,
  description: string,
  index: number,
  selectedItem: number,
  handleOnSelect: (value: number) => void,
}

export default class AvailableUploadStrategy extends React.Component {
  props: Props;

  handleEvent = (ev) => {
    const { handleOnSelect } = this.props;
    const value = parseInt(ev.currentTarget.value, 10);

    if (typeof handleOnSelect === 'function') {
      handleOnSelect(value);
    }
  };

  render() {
    const { title, description, index, selectedItem } = this.props;
    return (
      <section className="available-upload-strategy-container">
        <label className="main-content">
          <section className="icon-block">
            <AvailableUploadIcon iconIndex={index} />
          </section>
          <BoxRadio
            value={index}
            onChange={this.handleEvent}
            name="strategy-radio"
            checked={selectedItem === index}
          >
            <span>{title}</span>
          </BoxRadio>
        </label>
        <p className="description">{description}</p>
      </section>
    );
  }
}
