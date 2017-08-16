// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { PrintiLogoIcon } from 'components/Icons';
import SVG from 'react-inlinesvg';
import { Input } from 'quarks/Inputs';

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

  renderDataPane() {
    return (
      <div key="dataPane" className="org-checkout-content-container">
        <div className="atm-checkout-content-title">
          1. Dados
        </div>
        <p className="atm-checkout-content-text">
          Complete seus dados para seguir em frente. Esses dados serão solicitados apenas uma vez. Suas próximas compras serão muito mais rápidas e fáceis.
        </p>
        <div className="org-checkout-content-data">
          <Input placeholder="Test placeholder" />
        </div>
      </div>
    );
  }

  handlePanes() {
    return this.renderDataPane();
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
