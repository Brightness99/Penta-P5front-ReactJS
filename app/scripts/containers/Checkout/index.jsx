// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
};

type State = {
};

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render() {
    return (
      <div>
        123
      </div>
    );
  }
}
