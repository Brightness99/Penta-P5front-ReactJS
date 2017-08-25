// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { PrintiLogoIcon } from 'components/Icons';
import DataPane from './DataPane';
import AddressPane from './AddressPane';

type Props = {
  handleNavigation?: () => {},
  activePanel: number,
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
    const { handleNavigation, activePanel } = this.props;

    switch (activePanel) {
      case 1:
        return (
          <DataPane
            handleNavigation={handleNavigation}
          />
        );
      case 2:
        return (
          <AddressPane
            handleNavigation={handleNavigation}
          />
        );
      default: return null;
    }
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
