// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { PrintiLogoIcon } from 'components/Icons';
import SVG from 'react-inlinesvg';

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

  render() {
    return (
      <div className="org-checkout-content">
        <div className="atm-logo"><PrintiLogoIcon /></div>
        <div className="org-checkout-content-container">Content</div>
        <div className="mol-checkout-content-footer">
          <div className="atm-checkout-certificate atm-checkout-certificate--certisign" />
          <div className="atm-checkout-certificate atm-checkout-certificate--norton" />
          <div className="atm-checkout-certificate atm-checkout-certificate--google" />
        </div>
      </div>
    );
  }
}
