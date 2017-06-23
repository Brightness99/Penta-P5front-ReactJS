// @flow

import React from 'react';
import { MaskedInput } from 'components/Input';
import { settingsMatrixFetch } from 'actions';

type Props = {
  locale: {},
  order: number,
  className: string,
  onZipcodeValid: () => {},
};

export default class MatrixZipcode extends React.Component {
  static props: Props;

  onValid = (zipcode: number) => {
    const { onZipcodeValid } = this.props;

    if (typeof onZipcodeValid === 'function') {
      onZipcodeValid(zipcode);
    }
  };

  render() {
    return (
      <div>
        <h4>Digite seu CEP</h4>
        <MaskedInput mask="99999-999" onValid={this.onValid} />
      </div>
    );
  }
}
