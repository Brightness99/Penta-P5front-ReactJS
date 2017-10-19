// @flow
import React from 'react';

type Props = {
  options: Array<{field: string, value: string}>
};

export default class CartItemDefinitionsPanel extends React.Component {
  props: Props;

  render() {
    const { options } = this.props;
    return (
      <aside className="cart-item-definitions-container">
        <h4>Resumo do produto</h4>
        <section className="options">
          <ul>
            {
              options.map(x => <li key={x.field}><span><strong>{`${x.field}: `}</strong>{x.value}</span></li>)
            }
          </ul>
        </section>
        <hr />
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
