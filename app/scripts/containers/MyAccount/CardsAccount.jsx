// @flow
import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { TrashIcon } from 'components/Icons';
import Loading from 'components/Loading';
import { accountSavedCreditCardDelete, accountSavedCreditCardFetch } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class CardsAccount extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountSavedCreditCardFetch());
  }

  static props: Props;

  handleDeleteCard = (id) => {
    const { dispatch } = this.props;

    dispatch(accountSavedCreditCardDelete(id));
  };

  renderItems() {
    const { account: { savedCreditCards } } = this.props;

    if (savedCreditCards.cards.length <= 0) {
      return <p>Não existem cartões cadastrados</p>;
    }

    return savedCreditCards.cards.map((item) => (
      <div className="card-saved" key={item.id}>
        <div className="card-save-info">
          <div>
            {item.brand === 'mastercard'
              ? <img src={require('assets/media/images/mastercard.png')} alt="{item.brand}" />
              : <img src={require('assets/media/images/visa-card.png')} alt="{item.brand}" />
            }
          </div>
          <div className="cxnumber-card">
            <p>{item.label}</p>
          </div>
          <div
            className={cx('card-valid', {
              invalid: item.expired === true,
            })}
          >
            <p>{item.expiration_date}</p>
          </div>
          <div className="qrk-trash-icon" onClick={() => this.handleDeleteCard(item.id)}>
            <TrashIcon />
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { screenSize, account: { savedCreditCards } } = this.props;

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
            {!savedCreditCards.isLoaded || savedCreditCards.isRunning ? <Loading /> : this.renderItems()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsAccount);

