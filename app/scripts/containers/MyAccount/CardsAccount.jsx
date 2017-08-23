// @flow
import React from 'react';
import Cards from 'react-credit-cards';
import { Input } from 'quarks/Inputs';
import { BoxRadio, Select } from 'atoms/Inputs';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel, PencilIcon, TrashIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class CardsAccount extends React.Component {
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

  renderMobile() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div className="container-creditCard">
        <div className="container">
          <h2 className="titl-creditCard">Minha conta</h2>
          <h3 className="subtitle-creditCard">Cartões salvos</h3>
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
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { name, number, expiry, cvc, focused } = this.state;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus cartões',
      },
    ];
    return (
      <div className="container-creditCard">
        <Breadcrumbs links={breadcrumb} />
        <h2 className="titl-creditCard">Minha conta</h2>
        <h3 className="subtitle-creditCard">Cartões salvos</h3>
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
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default CardsAccount;
