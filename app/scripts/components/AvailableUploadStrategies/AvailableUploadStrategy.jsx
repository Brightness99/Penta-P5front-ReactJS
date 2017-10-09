// @flow

import React from 'react';
import { BoxRadio } from 'atoms/Inputs';
import AvailableUploadIcon from './AvailableUploadIcon';

type Props = {
  title: string,
  description: string,
  index: number
}

export default class AvailableUploadStrategy extends React.Component {
  props: Props;

  render() {
    const { title, description, index } = this.props;
    return (
      <section className="available-upload-strategy-container">
        <label className="main-content">
          <section className="icon-block">
            <AvailableUploadIcon iconIndex={index} />
          </section>
          <BoxRadio name="box-radio">
            <span>{title}</span>
          </BoxRadio>
        </label>
        <p className="description">{description}</p>
      </section>
    );
  }
}
