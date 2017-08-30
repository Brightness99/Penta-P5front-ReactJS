// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
};

export class ChangePaymentMethod extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  render() {
    return (
      <section className="container-changePayment">
        <div className="container">
          <h2>Mudar o método de pagamento</h2>

          <div className="box-order">
            <ul className="titles-descOrder">
              <li>Produto</li>
              <li>Entrega</li>
              <li>Quantidade</li>
              <li>Valor</li>
            </ul>
            <div className="details-descOrder">
              <div>imagem</div>
              <div>data</div>
              <div>qntidade</div>
              <div>valor</div>
            </div>
            <div className="total-value-descOrder">
              <div>total + valor</div>
            </div>
          </div>

          <div>
            <div>cartao</div>
            <div>dados</div>
          </div>


        </div>
      </section>
    );
  }
}

export default ChangePaymentMethod;
