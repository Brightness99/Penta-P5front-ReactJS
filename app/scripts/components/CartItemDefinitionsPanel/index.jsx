// @flow
import React from 'react';
import TruckIcon from 'components/Icons/Truck';

type Props = {
  expectedDeliveryDate: string,
  totalPrice: number,
  subTotal: number,
  additionalOptions: [],
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
    const { expectedDeliveryDate, totalPrice, subTotal } = this.props;

    return (
      <aside className="cart-item-definitions-container">
        <h4>Resumo do produto</h4>
        <section className="options">
          {this.renderParts()}
        </section>
        <hr />
        <section className="sub-total">Sub-total: <span>{`R$${subTotal}`}</span>(R$0,18un)</section>
        <hr />
        <section className="additional-options">additional-options</section>
        <hr />
        <section className="total">Total: <span>{`R$${totalPrice}`}</span></section>
        <section className="delivery-info">
          <TruckIcon />
          <span>Previsão de entrega:</span>
          <span>{`${expectedDeliveryDate}`}</span>
        </section>
      </aside>
    );
  }
}
