// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
};

type State = {
};

export default class CartFooter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render () {
    return (
      <div>Footer</div>
    );
  }
}
