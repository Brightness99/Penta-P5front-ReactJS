// @flow

import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';
import CartEmpty from './Empty';
import CartHeader from './Header';
import CartItens from './Itens';
import CartSummary from './Summary';

type Props = {
  app: {},
  cart: {},
};

export class Config extends React.Component {
  static props: Props;

  renderContent() {
    const { app: { screenSize } } = this.props;
    return (
      <div className="content">
        <CartHeader screenSize={screenSize} />
        <CartItens screenSize={screenSize} />
        <CartSummary screenSize={screenSize} />
      </div>
    );
  }

  render() {
    const { cart: { count } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Seu carrinho',
      },
    ];

    return (
      <div className="page-cart container">
        <Breadcrumbs links={breadcrumb} />
        <PageTitle>Seu Carrinho</PageTitle>
        <main>
          { count > 0 ? this.renderContent() : <CartEmpty /> }
        </main>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return ({
    app: state.app,
    cart: state.cart,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
