// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
};

type State = {
};

export default class AddressPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render() {
    return (
      <div key="addressPane" className="org-checkout-content-container">
        <div className="atm-checkout-content-title">
          2. Endereço
        </div>
        <p className="atm-checkout-content-text">
          Selecione o endereço de entrega:
        </p>
      </div>
    );
  }
}
