// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CheckIcon, PrintiClub, CloseIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class Loyalty extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <div className="container-loyalty">
        <div className="container">
          <h2 className="title-loyalty">Minha conta</h2>
          <i className="logo-printiClub"><PrintiClub /></i>
          <p className="subtitle-loyalty">Acompanhe seu histórico de compras e tudo que você tem com o Printi Club</p>
          <div>
            <ul className="tab-loyalty">
              <li className="active-underline"><Link to="#">Seu club</Link></li>
              <li><Link to="#">Histórico de compras</Link></li>
            </ul>

            <div className="box-clubGold">
              <h3 className="title-clubGold">Printi Club Gold</h3>
              <p className="subtitle-clubGold">Seu saldo nos últimos 12 meses:</p>

              <div className="boxes-gold">
                <div className="box-gold first-box-gold">
                  <p className="first-title-gold">Gold</p>
                </div>
                <div className="box-gold--mobile">
                  <div className="box-gold">
                    <p className="title-gold">R$12.520,22</p>
                    <p className="subtitle-gold">valor comprado</p>
                  </div>
                  <div className="box-gold">
                    <p className="title-gold">17</p>
                    <p className="subtitle-gold">número de compras</p>
                  </div>
                </div>
              </div>
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
        </div>
      </div>
    );
  }

  renderDesktop() {
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
        <div>
          <ul className="tab-loyalty">
            <li className="active-underline"><Link to="#">Seu club</Link></li>
            <li><Link to="#">Histórico de compras</Link></li>
          </ul>

          <div className="box-clubGold">
            <h3 className="title-clubGold">Printi Club Gold</h3>
            <p className="subtitle-clubGold">Seu saldo nos últimos 12 meses:</p>

            <div className="boxes-gold">
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
            </div>
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

export default Loyalty;
