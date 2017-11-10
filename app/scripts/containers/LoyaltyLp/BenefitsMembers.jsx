// @flow

import React from 'react';
import { isMobile } from 'utils/helpers';
import Slider from 'react-slick';
import { CloseIcon, CheckIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class BenefitsMembers extends React.Component {
  props: Props;

  renderMobile() {
    return (
      <div className="mol-premium-members">
        <div className="atm-type-premium">
          <Slider
            className="org-component-banners"
            dots={true}
            dotsClass="atm-carousel-dots"
            autoplay={false}
          >
            <div>
              <div className="qrk-premium club-premium">
                <div className="list-benefits-premium">
                  <div className="logo-title-loyalty">
                    <div className="logo-loyalty bg-club">
                      <span className="title-logo-loyalty">Club</span>
                    </div>
                  </div>
                  <ul className="color-club">
                    <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                    <li>Descontos especiais<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Amostras grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Revisão de arquivos grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Atendimento exclusivo<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                  </ul>
                </div>
                <div className="amount-money">
                  <p>Para fazer parte:</p>
                  <p className="details-amount-money">R$500 ou mais em quantas compras quiser nos últimos 12 meses.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="qrk-premium silver-premium">
                <div className="list-benefits-premium">
                  <div className="logo-title-loyalty">
                    <div className="logo-loyalty bg-silver">
                      <span className="title-logo-loyalty">Silver</span>
                    </div>
                  </div>
                  <ul className="color-silver">
                    <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                    <li>Descontos especiais<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Amostras grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Revisão de arquivos grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Atendimento exclusivo<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                  </ul>
                </div>
                <div className="amount-money">
                  <p>Para fazer parte:</p>
                  <p className="details-amount-money">R$3.000 ou mais em no mínimo 5 compras nos últimos 12 meses.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="qrk-premium gold-premium">
                <div className="list-benefits-premium">
                  <div className="logo-title-loyalty">
                    <div className="logo-loyalty bg-gold">
                      <span className="title-logo-loyalty">Gold</span>
                    </div>
                  </div>
                  <ul className="color-gold">
                    <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                    <li>Descontos especiais<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Amostras grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Revisão de arquivos grátis<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Atendimento exclusivo<span className="closeIcon"><CloseIcon /></span></li>
                    <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                  </ul>
                </div>
                <div className="amount-money">
                  <p>Para fazer parte:</p>
                  <p className="details-amount-money">R$8.000 ou mais em no mínimo 10 compras nos últimos 12 meses.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="qrk-premium black-premium">
                <div className="list-benefits-premium">
                  <div className="logo-title-loyalty">
                    <div className="logo-loyalty bg-black">
                      <span className="title-logo-loyalty">Black</span>
                    </div>
                  </div>
                  <ul className="color-black">
                    <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                    <li className="li-active-color">Descontos especiais<span className="checkIcon"><CheckIcon /></span></li>
                    <li className="li-active-color">Amostras grátis<span className="checkIcon"><CheckIcon /></span></li>
                    <li className="li-active-color">Revisão de arquivos grátis<span className="checkIcon"><CheckIcon /></span></li>
                    <li className="li-active-color">Atendimento exclusivo<span className="checkIcon"><CheckIcon /></span></li>
                    <li className="li-active-color">Entrega rápida com desconto<span className="checkIcon"><CheckIcon /></span></li>
                  </ul>
                </div>
                <div className="amount-money">
                  <p>Para fazer parte:</p>
                  <p className="details-amount-money">R$30.000 ou mais em no mínimo 20 compras nos últimos 12 meses.</p>
                </div>
              </div>
            </div>

          </Slider>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="container">
        <div className="mol-premium-members">
          <h3 className="title-loyalty">Membros premium</h3>
          <p className="subtitle-loyalty">Silver, Gold e Black: mais compras, mais benefícios.</p>
          <div className="atm-type-premium">

            <div className="qrk-premium club-premium">
              <div className="list-benefits-premium">
                <div className="logo-title-loyalty">
                  <div className="logo-loyalty bg-club">
                    <span className="title-logo-loyalty">Club</span>
                  </div>
                </div>
                <ul className="color-club">
                  <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                  <li>Descontos especiais<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Amostras grátis<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Revisão de arquivos grátis<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Atendimento exclusivo<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                </ul>
              </div>
              <div className="amount-money">
                <p>Para fazer parte:</p>
                <p className="details-amount-money">R$500 ou mais em quantas compras quiser nos últimos 12 meses.</p>
              </div>
            </div>

            <div className="qrk-premium silver-premium">
              <div className="list-benefits-premium">
                <div className="logo-title-loyalty">
                  <div className="logo-loyalty bg-silver">
                    <span className="title-logo-loyalty">Silver</span>
                  </div>
                </div>
                <ul className="color-silver">
                  <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Descontos especiais<span className="checkIcon"><CheckIcon /></span></li>
                  <li>Amostras grátis<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Revisão de arquivos grátis<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Atendimento exclusivo<span className="closeIcon"><CloseIcon /></span></li>
                  <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                </ul>
              </div>
              <div className="amount-money">
                <p>Para fazer parte:</p>
                <p className="details-amount-money">R$3.000 ou mais em no mínimo 5 compras nos últimos 12 meses.</p>
              </div>
            </div>

            <div className="qrk-premium gold-premium">
              <div className="list-benefits-premium">
                <div className="logo-title-loyalty">
                  <div className="logo-loyalty bg-gold">
                    <span className="title-logo-loyalty">Gold</span>
                  </div>
                </div>
                <ul className="color-gold">
                  <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Descontos especiais<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Amostras grátis<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Revisão de arquivos grátis<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Atendimento exclusivo<span className="checkIcon"><CheckIcon /></span></li>
                  <li>Entrega rápida com desconto<span className="closeIcon"><CloseIcon /></span></li>
                </ul>
              </div>
              <div className="amount-money">
                <p>Para fazer parte:</p>
                <p className="details-amount-money">R$8.000 ou mais em no mínimo 10 compras nos últimos 12 meses.</p>
              </div>
            </div>

            <div className="qrk-premium black-premium">
              <div className="list-benefits-premium">
                <div className="logo-title-loyalty">
                  <div className="logo-loyalty bg-black">
                    <span className="title-logo-loyalty">Black</span>
                  </div>
                </div>
                <ul className="color-black">
                  <li className="li-active-color">Promoções exclusivas<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Descontos especiais<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Amostras grátis<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Revisão de arquivos grátis<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Atendimento exclusivo<span className="checkIcon"><CheckIcon /></span></li>
                  <li className="li-active-color">Entrega rápida com desconto<span className="checkIcon"><CheckIcon /></span></li>
                </ul>
              </div>
              <div className="amount-money">
                <p>Para fazer parte:</p>
                <p className="details-amount-money">R$30.000 ou mais em no mínimo 20 compras nos últimos 12 meses.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

export default BenefitsMembers;
