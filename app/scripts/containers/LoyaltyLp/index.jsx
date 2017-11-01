import React from 'react';
import { Link } from 'react-router-dom';
import { PrintiClub } from 'components/Icons';

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
            <div className="mol-premium-members">
              <h3 className="title-loyalty">Membros premium</h3>
              <p className="subtitle-loyalty">Silver, Gold e Black: mais compras, mais benefícios.</p>
              <div className="atm-type-premium">
                <div className="qrk-premium">
                  <div className="list-benefits-premium">
                    <span>Club</span>
                    <ul>
                      <li>Promoções exclusivas</li>
                      <li>Descontos especiais</li>
                      <li>Amostras grátis</li>
                      <li>Revisão de arquivos grátis</li>
                      <li>Atendimento exclusivo</li>
                      <li>Entrega rápida com desconto</li>
                    </ul>
                  </div>
                  <div className="amount-money">
                    <p>Para fazer parte:</p>
                    <p className="details-amount-money">R$500 ou mais em quantas compras quiser nos últimos 12 meses.</p>
                  </div>
                </div>
                <div className="qrk-premium">
                  <div className="list-benefits-premium">
                    <span>Silver</span>
                    <ul>
                      <li>Promoções exclusivas</li>
                      <li>Descontos especiais</li>
                      <li>Amostras grátis</li>
                      <li>Revisão de arquivos grátis</li>
                      <li>Atendimento exclusivo</li>
                      <li>Entrega rápida com desconto</li>
                    </ul>
                  </div>
                  <div className="amount-money">
                    <p>Para fazer parte:</p>
                    <p className="details-amount-money">R$3.000 ou mais em no mínimo 5 compras nos últimos 12 meses.</p>
                  </div>
                </div>
                <div className="qrk-premium">
                  <div className="list-benefits-premium">
                    <span>Gold</span>
                    <ul>
                      <li>Promoções exclusivas</li>
                      <li>Descontos especiais</li>
                      <li>Amostras grátis</li>
                      <li>Revisão de arquivos grátis</li>
                      <li>Atendimento exclusivo</li>
                      <li>Entrega rápida com desconto</li>
                    </ul>
                  </div>
                  <div className="amount-money">
                    <p>Para fazer parte:</p>
                    <p className="details-amount-money">R$8.000 ou mais em no mínimo 10 compras nos últimos 12 meses.</p>
                  </div>
                </div>
                <div className="qrk-premium">
                  <div className="list-benefits-premium">
                    <span>Black</span>
                    <ul>
                      <li>Promoções exclusivas</li>
                      <li>Descontos especiais</li>
                      <li>Amostras grátis</li>
                      <li>Revisão de arquivos grátis</li>
                      <li>Atendimento exclusivo</li>
                      <li>Entrega rápida com desconto</li>
                    </ul>
                  </div>
                  <div className="amount-money">
                    <p>Para fazer parte:</p>
                    <p className="details-amount-money">R$30.000 ou mais em no mínimo 20 compras nos últimos 12 meses.</p>
                  </div>
                </div>
              </div>
            </div>

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

            <div className="mol-start-premium">
              <div className="qrk-start-premium">
                <div className="text-start-premium">
                  <p>R$ 500 em compras</p>
                  <p>e você já começa a aproveitar</p>
                </div>
                <div className="text-start-premium">
                  <button className="btn-default btn-primary btn-lg">Comprar agora</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default LoyaltyLp;
