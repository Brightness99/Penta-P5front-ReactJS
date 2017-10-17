// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { CheckIcon, PrintiClub, CloseIcon } from 'components/Icons';
import Loading from 'components/Loading';
import { ErrorText } from 'atoms/Texts';

type Props = {
  screenSize: string,
  account: {},
  locale: {},
  setBreadcrumbs: () => void,
};

export class Loyalty extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.handleBreadcrumbs();
  }

  static props: Props;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: 'Printi Club',
        },
      ]);
    }
  };

  renderPage() {
    const { screenSize, account: { loyalty } } = this.props;

    if (loyalty.error) {
      return (<div>
        <ErrorText>Something went wrong.</ErrorText>
      </div>);
    }
    return (
      <div>
        <ul className="tab-loyalty">
          <li className="active-underline"><Link to="#">Seu club</Link></li>
          <li><Link to="#">Histórico de compras</Link></li>
        </ul>
        <div className="box-clubGold">
          <h3 className="title-clubGold">{loyalty.loyalty_tier_name}</h3>
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

  renderItems() {
    return this.renderPage();
  }

  render() {
    const { account: { loyalty } } = this.props;

    return (
      <div className="container-loyalty">
        <h3 className="atm-myorder-title"><i className="logo-printiClub"><PrintiClub /></i></h3>
        <span className="atm-myorder-subtitle">{'Acompanhe seu histórico de compras e tudo que você tem com o Printi Club'}</span>
        {!loyalty.isLoaded || loyalty.isRunning ? <Loading /> : this.renderPage()}
        <Helmet>
          <title>{'Minha Conta - Printi Club | Printi'}</title>
          <meta name="description" content={'Minha Conta - Printi Club - Printi'} />
        </Helmet>
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

export default connect(mapStateToProps)(Loyalty);

