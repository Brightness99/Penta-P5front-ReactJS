// @flow
import React from 'react';
import { connect } from 'react-redux';
import Cards from 'react-credit-cards';
import { Link } from 'react-router-dom';
import { Input } from 'quarks/Inputs';
import { isMobile } from 'utils/helpers';
import { BoxRadio, Select } from 'atoms/Inputs';
import Breadcrumbs from 'components/Breadcrumbs';
import { TrashIcon } from 'components/Icons';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
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

  render() {
    const { screenSize } = this.props;
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
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className={cx(isMobile(screenSize) && ('container'))}>
          <h2 className="titl-creditCard">Minha conta</h2>
          <h3 className="subtitle-creditCard">Cartões salvos</h3>
          <div className="container-card">
            <div className="card-saved">
              <div className="card-save-info">
                <div>
                  <img src={require('assets/media/images/visa-card.png')} alt="Visa Card" />
                </div>
                <div className="number-card">
                  <p>123 1231 231 23 123</p>
                </div>
                <div className="card-valid invalid">
                  <p>05/17</p>
                </div>
                <div className="qrk-trash-icon">
                  <TrashIcon />
                </div>
              </div>
            </div>
            <div className="card-saved">
              <div className="card-save-info">
                <div>
                  <img src={require('assets/media/images/mastercard.png')} alt="Visa Card" />
                </div>
                <div className="number-card">
                  <p>123 1231 231 23 123</p>
                </div>
                <div className="card-valid invalid">
                  <p>05/17</p>
                </div>
                <div className="qrk-trash-icon">
                  <TrashIcon />
                </div>
              </div>
            </div>
            <div className="card-saved">
              <div className="card-save-info">
                <div>
                  <img src={require('assets/media/images/visa-card.png')} alt="Visa Card" />
                </div>
                <div className="number-card">
                  <p>123 1231 231 23 123</p>
                </div>
                <div className="card-valid">
                  <p>05/22</p>
                </div>
                <div className="qrk-trash-icon">
                  <TrashIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsAccount);

