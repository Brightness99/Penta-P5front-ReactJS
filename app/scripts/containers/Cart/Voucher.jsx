// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
};

type State = {
};

export default class CartVoucher extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render () {
    return (
      <div>Voucher</div>
    );
  }
}
