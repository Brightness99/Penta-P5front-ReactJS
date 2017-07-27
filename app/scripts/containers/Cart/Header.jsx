// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

type Props = {
  screenSize: string,
}

export default class CartHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    return <div className="mol-cart-header--mobile">R$ 120,00 <span>(2 itens)</span></div>;
  }

  renderDesktop() {
    return null;
  }

  render() {
    const { screenSize } = this.props;
    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
