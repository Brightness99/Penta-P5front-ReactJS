// @flow 

import React from 'react';
import { Link } from 'react-router-dom';

export class AboutPrintiText extends React.Component {
  renderAbout() {
    return (
      <div className="org-about-printi-text">
        <h3 className="title-about-printi-text">Revolucionando o mercado gráfico</h3>
        <p className="subtitle-about-printi-text">A Printi está no mercado desde 2012</p>
        <img src={require('assets/media/images/img-about-printi.png')} alt="Sobre a Printi" />
        <div className="mol-about-printi-text">
          <p>A Printi é um modelo inovador de gráfica online no mercado brasileiro, com impressões de alta qualidade a preços acessíveis.
            Utilizamos as mais modernas ferramentas do setor de Web2Print para simplificar e agilizar o complexo processo de encomenda de impressos personalizados.
          </p>
          <p>Fundada a partir de conceitos adquiridos em 25 anos de experiência na indústria gráfica brasileira, a Printi oferece mais de 6.000 combinações diferentes de produtos impressos.
            Todas essas combinações são acessíveis através de nossa revolucionária matriz de customização, que dá ao usuário o total controle de seu produto, e calcula, em trempo real, o custo final do orçamento.
            É essa funcionalidade que traz completa transparência ao processo de compra e que separa a Printi de seus concorrentes no mercado gráfico.
          </p>
          <div className="atm-about-printi">
            <p className="p-blue">"A Printi oferece a checagem online gratuita e imediata da arte final, uma característica oferecida somente pelos mais avançados serviços Web2Print do mundo"</p>
          </div>
          <p>Além da revolucionária matriz de customização, a Printi oferece a checagem online gratuita e imediata da arte final, uma característica oferecida somente pelos mais avançados serviços Web2Print do mundo. A checagem online elimina a maior parte do ineficiente processo de pré-impressão, fornecendo ao cliente final uma experiência rápida e eficiente, sem burocracia e sem transtornos. Essa eficiência permite à Printi repassar a seus clientes as reduções de custo obtidas, assim oferecendo preços excelentes e produtos de altíssima qualidade.</p>
          <p>A Printi convida todos a testarem nosso processo de customização e compra. Em caso de dúvidas, entre em contato conosco através do email <Link to="mailto:suporte@printi.com.br" target="_blank">suporte@printi.com.br</Link> ou do telefone (11) 2318.1919.</p>
        </div>
      </div>
    );
  }
  renderPrintiMentioned() {
    return (
      <div className="org-about-printi-mentions">
        <h4 className="title-printi-mentions">fomos destacados aqui:</h4>
        <div className="mol-about-mentions">
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/forbes-logo.png')} alt="Forbes" />
            </div>
          </div>
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/valor-economico.png')} alt="Valor Econômico" />
            </div>
          </div>
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/info-exame.png')} alt="Exame" />
            </div>
          </div>
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/uol-logo.png')} alt="Uol" />
            </div>
          </div>
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/tech-crunch.png')} alt="Tech Crunch" />
            </div>
          </div>
          <div className="atm-icon-mentions">
            <div className="qrk-icon">
              <img src={require('assets/media/images/inc-logo.png')} alt="INC" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderAbout()}
        {this.renderPrintiMentioned()}
      </div>
    );
  }
}

export default AboutPrintiText;
