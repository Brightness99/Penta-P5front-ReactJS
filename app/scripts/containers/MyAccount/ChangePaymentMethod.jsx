// @flow
import React from 'react';
import { isMobile } from 'utils/helpers';
import Cards from 'react-credit-cards';
import { Input } from 'quarks/Inputs';
import { BoxRadio, Select } from 'atoms/Inputs';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';

import { CardsIcon } from 'components/Icons';


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


  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

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

  render() {
    const { screenSize } = this.props;
    const { name, number, expiry, cvc, focused } = this.state;
    const certisign = {
      backgroundImage: `url('${require('../../../../assets/media/images/sprites.png')}')`,
      backgroundPosition: '-243px 0',
      width: '97px',
      height: '39px',
      display: 'inline-flex',
    };
    const google = {
      backgroundImage: `url('${require('../../../../assets/media/images/sprites.png')}')`,
      backgroundPosition: '-459px -1px',
      width: '83px',
      height: '39px',
      display: 'inline-flex',
    };
    const norton = {
      backgroundImage: `url('${require('../../../../assets/media/images/sprites.png')}')`,
      backgroundPosition: '-362px 0',
      width: '77px',
      height: '41px',
      display: 'inline-flex',
    };
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Meus pedidos',
        url: '/meus-pedidos',
      },
      {
        title: 'Mudar o método de pagamento',
      },
    ];
    return (
      <section className="container-changePayment">
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <h2 className="title-changePayment">Mudar o método de pagamento</h2>

          <div className="box-order">
            <ul className="titles-descOrder">
              <li>Produto</li>
              <li>Entrega</li>
              <li>Quantidade</li>
              <li>Valor</li>
            </ul>
            <div className="container-detailsOrder">
              <div className="details-descOrder">
                <div className="image-text-descOrder">
                  <div>
                    <p className="title-blockMobile align-center">Produto</p>
                    <div className="image-descOrder">
                      <img src={require('assets/media/images/image-product-envelope.png')} alt="bla" />
                    </div>
                  </div>
                  <div>
                    <p className="title-descOrder">Cartaz</p>
                    <p className="fnt-w600 mrg-half">Item #801342</p>
                    <p className="fnt-w600 mrg-half">Cartaz - Criação de arte</p>
                    <p>Cartaz</p>
                    <p>A3 (29,7 x 42,0 cm)</p>
                    <p>Frente</p>
                    <Link to="#">Ver mais...</Link>
                  </div>
                </div>
                <div className="flex-blockMobile">
                  <div>
                    <p className="title-blockMobile">Entrega</p>
                  </div>
                  <div>
                    <p className="title-descOrder">08/09/2017</p>
                    <p>CEP: 05308-000</p>
                  </div>
                </div>
                <div className="flex-blockMobile">
                  <div>
                    <p className="title-blockMobile">Quantidade</p>
                  </div>
                  <div>
                    <p className="title-descOrder">1</p>
                  </div>
                </div>
                <div className="flex-blockMobile">
                  <div>
                    <p className="title-blockMobile">Total</p>
                  </div>
                  <div>
                    <p className="title-descOrder">R$ 83,99</p>
                  </div>
                </div>
              </div>
              <div className="total-value-descOrder">
                <div className="box-total-value">
                  <div>
                    <p className="text-total">Total</p>
                  </div>
                  <div>
                    <p className="text-value">R$ 83,99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-cards">
            <Link to="#" className="btn-default btn-secondary fnt-sbold btn-lg btn-credit-card"><CardsIcon />Cartão de crédito</Link>
            <div className="box-savecards">
              <Link to="#" className="btn-default btn-secondary fnt-sbold btn-sm">usar cartão salvo</Link>
              <BoxRadio
                value="person"
                onChange={this.handleSelection}
                name="pane-type"
                checked={'person'}
              >
                Salvar cartão
            </BoxRadio>
            </div>
            <div className="box-cards">
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
                  className="atm-checkout-input atm-checkout-input-two"
                  onChange={this.handleChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  showLabel={true}
                  type="tel"
                  name="expiry"
                  placeholder="Validade"
                  className="atm-checkout-input atm-checkout-input-one"
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
                <Select
                  className="atm-checkout-input atm-checkout-input-two"
                  name=""
                  showLabel={true}
                  id=""
                  placeholder="Parcelas"
                  required={true}
                >
                  <option value="1x">1 x R$ 83,99 (À vista)</option>
                  <option value="2x">2 x R$ 83,99</option>
                </Select>
              </form>
            </div>
            <div className="box-footer-card">
              <div>
                <span style={certisign} />
                <span style={google} />
                <span style={norton} />
              </div>
              <div>
                <Link to="#" className="btn-default btn-primary fnt-sbold btn-lg">Finalizar compra</Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default ChangePaymentMethod;
