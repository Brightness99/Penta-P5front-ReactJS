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
import { accountSavedCreditCardDelete } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class CardsAccount extends React.Component {

  handleDeleteCard = (id) => {
    const { dispatch } = this.props;

    dispatch(accountSavedCreditCardDelete({
      id: id.toString()
    }));
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  render() {
    const { screenSize, account } = this.props;

    let cardItems;

    if (account.savedCreditCards) {
      cardItems = account.savedCreditCards.map((item) => {
        let cardImageElement;
        if (item.brand === 'mastercard') {
          cardImageElement = (
            <img src={require('assets/media/images/mastercard.png')} alt="{item.brand}" />
          );
        } else {
          cardImageElement = (
            <img src={require('assets/media/images/visa-card.png')} alt="{item.brand}" />
          );
        }

        return (
          <div className="card-saved" key={item.id}>
            <div className="card-save-info">
              <div>
                {cardImageElement}
              </div>
              <div className="cxnumber-card">
                <p>{item.label}</p>
              </div>
              <div className={cx('card-valid', {
                  invalid: item.expired === true
                })}>
                <p>{item.expiration_date}</p>
              </div>
              <div className="qrk-trash-icon" onClick={() => this.handleDeleteCard(item.id)}>
                <TrashIcon />
              </div>
            </div>
          </div>
        );
      });
    }

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
            {cardItems}
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

