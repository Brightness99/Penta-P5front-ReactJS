// @flow
import React from 'react';
import Cards from 'react-credit-cards';
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

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  /*renderMobile() {
    return (
      <p className="testando">Loyalty</p>
    );
  }*/

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div className="container-loyalty">
        <h2>Minha conta</h2>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={this.handleCallback}
        />
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
