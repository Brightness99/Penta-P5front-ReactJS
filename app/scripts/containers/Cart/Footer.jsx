// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { RoundedTransparentButton } from 'atoms/Buttons';
import { FileTextOIcon } from 'components/Icons';

type Props = {
  screenSize: string,
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

  renderDesktop() {
    return null;
  }

  renderMobile() {
    return (
      <div className="org-cart-footer">
        <Link to={{ pathname: '/' }} className="atm-cart-shopping">Continuar comprando</Link>
        <RoundedTransparentButton><FileTextOIcon /> Baixar Orçamento</RoundedTransparentButton>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
