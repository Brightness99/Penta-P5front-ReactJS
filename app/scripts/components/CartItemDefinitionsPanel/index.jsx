// @flow
import React from 'react';

type Props = {
  parts: Array<{
    name: string,
    options: Array<{ field: string, value: string }>
  }>
};

export default class CartItemDefinitionsPanel extends React.Component {
  props: Props;

  renderParts() {
    const { parts } = this.props;
    return parts.map(x => (
      <section key={x.name}>
        {parts.length > 1 && <h5>{x.name}</h5>}
        <ul>
          {
            x.options.map(y => <li key={y.field}><span><strong>{`${y.field}: `}</strong>{y.value}</span></li>)
          }
        </ul>
      </section>));
  }

  render() {
    return (
      <aside className="cart-item-definitions-container">
        <h4>Resumo do produto</h4>
        <section className="options">
          {this.renderParts()}
        </section>
        <section className="sub-total">sub-tota</section>
        <hr />
        <section className="additional-options">additional-options</section>
        <hr />
        <section className="total">total</section>
        <section className="delivery-info">delivery</section>
      </aside>
    );
  }
}
