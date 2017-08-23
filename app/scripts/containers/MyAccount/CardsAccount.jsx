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

  handleInputChange = (e) => {
    const target = e.target;

    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    } else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    } else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback(type, isValid) {
    console.log(type, isValid); //eslint-disable-line no-console
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  /*renderMobile() {
    return (
      <p className="testando">Loyalty</p>
    );
  }*/


/* 
  <div>
    <input
      type="tel"
      name="number"
      placeholder="Número do Cartão"
      onKeyUp={this.handleInputChange}
      onFocus={this.handleInputFocus}
    />
    <div>E.g.: 49..., 51..., 36..., 37...</div>
  </div>
  <input
    type="text"
    name="name"
    placeholder="Name"
    onKeyUp={this.handleInputChange}
    onFocus={this.handleInputFocus}
  />
  <input
    type="tel"
    name="expiry"
    placeholder="Valid Thru"
    onKeyUp={this.handleInputChange}
    onFocus={this.handleInputFocus}
  />
  <input
    type="tel"
    name="cvc"
    placeholder="CVC"
    onKeyUp={this.handleInputChange}
    onFocus={this.handleInputFocus}
  />

*/
  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div className="container-creditCard">
        <h2>Minha conta</h2>
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
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <Input
              showLabel={true}
              type="text"
              name="name"
              placeholder="Name"
              className="atm-checkout-input atm-checkout-input-full"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <Input
              showLabel={true}
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              className="atm-checkout-input atm-checkout-input-one"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <Input
              showLabel={true}
              type="tel"
              name="cvc"
              placeholder="CVC"
              className="atm-checkout-input atm-checkout-input-one"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </form>
        </div>
      </div>
    );
  }

  /*render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }*/
}

export default CardsAccount;
