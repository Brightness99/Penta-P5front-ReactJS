import React from 'react';
import { Link } from 'react-router-dom';
import { PrintiClub, CloseIcon, CheckIcon } from 'components/Icons';

export class LoyaltyLp extends React.Component {
  render() {
    return (
      <section className="tpl-loyalty-lp">
        <div className="org-loyalty-lp">

          <div className="mol-banner-member-loyalty">

            <div className="atm-banner-loyalty">
              <img src={require('assets/media/images/photo-fidelidade.png')} alt="Programa de Fidelidade" />
              <div className="qrk-banner-text">
                <PrintiClub />
                <h2 className="title-banner-text">Mais vantagens para quem é Printi de carteirinha.</h2>
                <p className="subtitle-banner-text">Seja um membro desse clube e acumule vantagens que só a gráfica do futuro pode oferecer.</p>
                <button className="btn-default btn-secondary btn-lg">Fazer parte</button>
              </div>
            </div>

            <div className="container">
              <div className="atm-member-loyalty">
                <h3 className="title-loyalty">Como se tornar membro</h3>
                <p className="subtitle-loyalty">Muito fácil, como tudo por aqui:</p>
                <div className="qrk-be-member">
                  <div className="qrk-">
                    left
                  </div>
                  <div className="qrk-">
                    line
                  </div>
                  <div className="qrk-">
                    right
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="container">
            
            {/* final container tipos de programa de fidelidade*/}
            <div className="mol-premium-members">
              <h3 className="title-loyalty">Membros premium</h3>
              <p className="subtitle-loyalty">Silver, Gold e Black: mais compras, mais benefícios.</p>
              <div className="atm-type-premium">
                <div className="qrk-premium">
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
                <div className="qrk-premium">
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
                <div className="qrk-premium">
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
                <div className="qrk-premium">
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
            {/* final container tipos de programa de fidelidade*/}

            {/* começo container o que está perdendo */}
            <div className="mol-what-lost">
              <h3 className="title-loyalty">Quer saber o que você está perdendo?</h3>
              <p className="subtitle-loyalty">Separamos alguns benefícios em destaque:</p>
              <div className="qrk-what-lost">
                <div className="img-what-lost">
                  <Link to="#">
                    <img src={require('assets/media/images/loyalty-1.png')} alt="Programa de Fidelidade" />
                  </Link>
                </div>
                <div className="img-what-lost">
                  <Link to="#">
                    <img src={require('assets/media/images/loyalty-2.png')} alt="Programa de Fidelidade" />
                  </Link>
                </div>
              </div>
            </div>
            {/* final container o que está perdendo */}

            {/* começo container ser premium */}
            <div className="mol-start-premium">
              <div className="qrk-start-premium">
                <div className="text-start-premium">
                  <p className="first-text-start-premium">R$ 500 em compras</p>
                  <p className="second-text-start-premium">e você já começa a aproveitar</p>
                </div>
                <div>
                  <button className="btn-default btn-primary btn-lg">Comprar agora</button>
                </div>
              </div>
            </div>
            {/* final container ser premium */}

          </div>

        </div>
      </section>
    );
  }
}

export default LoyaltyLp;
