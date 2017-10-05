// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { CheckIcon, PrintiClub, CloseIcon } from 'components/Icons';
import Loading from 'components/Loading';
import { accountLoyaltyFetch } from 'actions';
import cx from 'classnames';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class Loyalty extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static defaultProps = {
    screenSize: 'xs',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountLoyaltyFetch(35330));
  }

  static props: Props;

  renderPage() {

    const { screenSize } = this.props;

    return (
      <div>
        <ul className="tab-loyalty">
          <li className="active-underline"><Link to="#">Seu club</Link></li>
          <li><Link to="#">Histórico de compras</Link></li>
        </ul>

        <div className="box-clubGold">
          <h3 className="title-clubGold">Printi Club Gold</h3>
          <p className="subtitle-clubGold">Seu saldo nos últimos 12 meses:</p>
         
          {isMobile(screenSize) && <div className="boxes-gold">
            <div className="box-gold first-box-gold">
              <p className="first-title-gold">Gold</p>
            </div>
            <div className="box-gold--mobile">
              <div className="box-gold">
                <p className="title-gold">R$12.520,22</p>
                <p className="subtitle-gold">valor nos últimos 12 meses</p>
              </div>
              <div className="box-gold">
                <p className="title-gold">17</p>
                <p className="subtitle-gold">compras nos últimos 12 meses</p>
              </div>
            </div>
          </div>}
          {!isMobile(screenSize) && <div className="boxes-gold">
            <div className="box-gold first-box-gold">
              <p className="first-title-gold">Gold</p>
            </div>
            <div className="box-gold">
              <p className="title-gold">R$12.520,22</p>
              <p className="subtitle-gold">valor nos últimos 12 meses</p>
            </div>
            <div className="box-gold">
              <p className="title-gold">17</p>
              <p className="subtitle-gold">compras nos últimos 12 meses</p>
            </div>
          </div>}

        </div>

        <div className="advantages-clubGold">
          <h4 className="title-advantages">O que ganha fazendo parte do Club Gold</h4>
          <div className="boxes-advantagesClubGold">
            <div className="box-advantagesClubGold bg-maizeLight">
              <p>Entrega rápida com desconto<i><CheckIcon /></i></p>
            </div>
            <div className="box-advantagesClubGold bg-maizeLight">
              <p>Entrega rápida com desconto<i><CheckIcon /></i></p>
            </div>
            <div className="box-advantagesClubGold bg-maizeLight ">
              <p>Entrega rápida com desconto<i><CheckIcon /></i></p>
            </div>
            <div className="box-advantagesClubGold bg-maizeLight ">
              <p>Entrega rápida com desconto<i><CheckIcon /></i></p>
            </div>
            <div className="box-advantagesClubGold bg-maizeLight ">
              <p>Entrega rápida com desconto<i><CheckIcon /></i></p>
            </div>
            <div className="box-advantagesClubGold bg-grayLight">
              <p>Entrega rápida com desconto<i><CloseIcon /></i></p>
            </div>
          </div>
        </div>

        <div className="become-clubBlack">
          <h4 className="title-clubBlack">Para virar um membro Printi Club Black:</h4>
          <div className="boxes-become">

            <div className="box-become">
              <div className="become-goldOrBlack">
                <div className="become-gold">
                  <p className="bg-gold">Gold</p>
                  <p className="fnt-number">R$8.000,00</p>
                </div>
                <div className="become-black">
                  <p className="fnt-number">R$30.000,00</p>
                  <p className="bg-black">Black</p>
                </div>
              </div>
              <span className="line-score line-become-value" />
              <p className="total-club">R$12.520,22</p>
            </div>

            <div className="box-become">
              <div className="become-goldOrBlack">
                <div className="become-gold">
                  <p className="bg-gold">Gold</p>
                  <p className="fnt-number">10 compras</p>
                </div>
                <div className="become-black">
                  <p className="fnt-number">30 compras</p>
                  <p className="bg-black">Black</p>
                </div>
              </div>
              <span className="line-score line-become-total" />
              <p className="total-club">17 compras</p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  renderMobile() {
    const { account: { loyalty } } = this.props;
    return (
      <div className="container-loyalty">
        <div className="container">
          <h2 className="title-loyalty">Minha conta</h2>
          <i className="logo-printiClub"><PrintiClub /></i>
          <p className="subtitle-loyalty">Acompanhe seu histórico de compras e tudo que você tem com o Printi Club</p>
          {!loyalty.isLoaded || loyalty.isRunning ? <Loading /> : this.renderPage()}
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { account: { loyalty } } = this.props;
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
        title: 'Printi Club',
      },
    ];
    return (
      <div className="container-loyalty">
        <Breadcrumbs links={breadcrumb} />
        <h2 className="title-loyalty">Minha conta</h2>
        <i className="logo-printiClub"><PrintiClub /></i>
        <p className="subtitle-loyalty">Acompanhe seu histórico de compras e tudo que você tem com o Printi Club</p>
        {!loyalty.isLoaded || loyalty.isRunning ? <Loading /> : this.renderPage()}
      </div>
    );
  }

  render() {
    const { screenSize, account: { loyalty } } = this.props;
    console.log(loyalty.error);

    return isMobile(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
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

export default connect(mapStateToProps, mapDispatchToProps)(Loyalty);

