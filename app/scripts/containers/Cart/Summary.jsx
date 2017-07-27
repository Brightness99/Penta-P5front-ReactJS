// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

type Props = {
  screenSize: string,
};

type State = {
};

export default class CartSummary extends React.Component {
  constructor(props) {
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
      <div>
        <div>
          Resumo do seu carrinho <span>(2 itens)</span>
        </div>
        <div>
          <div>subtotal <span>R$150,00</span></div>
          <div>desconto <span>- R$30,00</span></div>
        </div>
        <div>
          Total <span>R$120,00</span>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
