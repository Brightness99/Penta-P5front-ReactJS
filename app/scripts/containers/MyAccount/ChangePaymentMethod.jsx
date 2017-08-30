// @flow
import React from 'react';
import Cards from 'react-credit-cards';
import { Input } from 'quarks/Inputs';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
};

export class ChangePaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      name: '',
      exp: '',
      cvc: '',
      focused: '',
    };
  }

  handleInputFocus = (e) => {
    const target = e.target;

    this.setState({
      focused: target.name,
    });
  };

  handleCallback(type, isValid) {
    console.log(type, isValid); //eslint-disable-line no-console
  }

  handleChange = (ev) => {
    this.setState({
      [ev.currentTarget.name]: ev.currentTarget.value,
    });
  };

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
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
            <div className="container-card">
              <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
              <form className="org-checkout-content-data">
                <Input
                  showLabel={true}
                  className="atm-checkout-input atm-checkout-input-full"
                  type="tel"
                  name="number"
                  placeholder="Número do Cartão"
                  onFocus={this.handleInputFocus}
                  onChange={this.handleChange}
                />
                <Input
                  showLabel={true}
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className="atm-checkout-input atm-checkout-input-full"
                  onChange={this.handleChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  showLabel={true}
                  type="tel"
                  name="expiry"
                  placeholder="Validade"
                  className="atm-checkout-input atm-checkout-input-two"
                  onChange={this.handleChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  showLabel={true}
                  type="tel"
                  name="cvc"
                  placeholder="Cód. CVC"
                  className="atm-checkout-input atm-checkout-input-one"
                  onChange={this.handleChange}
                  onFocus={this.handleInputFocus}
                />
              </form>
            </div>
            <div>dados</div>
          </div>


        </div>
      </section>
    );
  }
}

export default ChangePaymentMethod;
