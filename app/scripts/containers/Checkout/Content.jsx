// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { PrintiLogoIcon } from 'components/Icons';
import DataPane from "./DataPane";

type Props = {
};

type State = {
};

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;


  handlePanes() {
    return <DataPane />;
  }

  render() {
    return (
      <div className="org-checkout-content">
        <div className="atm-logo"><PrintiLogoIcon /></div>
        {this.handlePanes()}
        <div className="mol-checkout-content-footer">
          <div className="atm-checkout-certificate atm-checkout-certificate--certisign" />
          <div className="atm-checkout-certificate atm-checkout-certificate--norton" />
          <div className="atm-checkout-certificate atm-checkout-certificate--google" />
        </div>
      </div>
    );
  }
}
