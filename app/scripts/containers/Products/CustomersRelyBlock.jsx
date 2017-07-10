// @flow
import React from 'react';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
};

export default class CustomersRelyBlock extends React.Component {

  render() {
    return (
      <section className="container-customersRely">
        <h4 className="customersRely-title">Mais de 50 mil clientes confiam na printi</h4>
        <div>
          <p>Slider dos logos</p>
        </div>
        <div className="container-commentsClients">
          <div className="box-commentClient">
            <p className="commentClient-text">"Trabalhar com a Printi tem sido uma grande economia de tempo para nós. Conseguimos fazer nossas cotações em instantes e a equipe de atendimento é muito ágil. Recomendo!"</p>
            <div className="commentClient-img">
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/cliente-2.jpg" alt="imagem do cliente" />
              <span className="commentClient-name">Mayara Souza</span>
              <span className="commentClient-profession">Analista de marketing</span>
            </div>
          </div>
          <div className="box-commentClient">
            <p className="commentClient-text">"Trabalhar com a Printi tem sido uma grande economia de tempo para nós. Conseguimos fazer nossas cotações em instantes e a equipe de atendimento é muito ágil. Recomendo!"</p>
            <div className="commentClient-img">
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/cliente-2.jpg" alt="imagem do cliente" />
              <span className="commentClient-name">Mayara Souza</span>
              <span className="commentClient-profession">Analista de marketing</span>
            </div>
          </div>
          <div className="box-commentClient">
            <p className="commentClient-text">"Trabalhar com a Printi tem sido uma grande economia de tempo para nós. Conseguimos fazer nossas cotações em instantes e a equipe de atendimento é muito ágil. Recomendo!"</p>
            <div className="commentClient-img">
              <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/cliente-2.jpg" alt="imagem do cliente" />
              <span className="commentClient-name">Mayara Souza</span>
              <span className="commentClient-profession">Analista de marketing</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
