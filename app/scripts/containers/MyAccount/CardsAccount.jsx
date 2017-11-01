// @flow
import React from 'react';
import { connect } from 'react-redux';
import Cards from 'react-credit-cards';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { TrashIcon } from 'components/Icons';
import Loading from 'components/Loading';
import { accountSavedCreditCardDelete, accountSavedCreditCardFetch } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
  setBreadcrumbs: () => void,
  locale: {},
};

export class CardsAccount extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountSavedCreditCardFetch());
    this.handleBreadcrumbs();
  }

  static props: Props;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: 'Cartões salvos',
        },
      ]);
    }
  };

  handleDeleteCard = (id) => {
    const { dispatch } = this.props;

    swal({
      title: 'Tem certeza que deseja deletar o cartão de crédito salvo?',
      text: 'Ao remover este produto ele não estará mais disponível no carrinho!',
      type: 'warning',
      confirmButtonColor: '#2cac57',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true,
    }).then(() => {
      dispatch(accountSavedCreditCardDelete(id));
    });
  };

  renderItems() {
    const { account: { savedCreditCards } } = this.props;

    if (savedCreditCards.cards.length <= 0) {
      return <p>Não existem cartões cadastrados</p>;
    }

    return savedCreditCards.cards.map((item) => (
      <div className="card-saved" key={item.id}>
        <Cards
          number={item.label}
          name={item.brand}
          expiry={item.expiration_date}
        />
        <div className="qrk-trash-icon" onClick={() => this.handleDeleteCard(item.id)}>
          <TrashIcon />
        </div>
      </div>
    ));
  }

  render() {
    const { screenSize, account: { savedCreditCards } } = this.props;

    return (
      <div className="container-creditCard">
        <div className={cx(isMobile(screenSize) && ('container'))}>
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

