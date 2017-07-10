// @flow
import React from 'react';

type Props = {
  screenSize: string,
  className: string,
  locale: {},
  button?: typeof React.Component,
};

export class BlogBlock extends React.Component {

  props: Props;

  render() {
    return (
      <section className="container-blog">
        <h4 className="blog-title">Últimas do blog</h4>
        <div className="box-blogCards">
          <div className="blogCard">
            <span>Biblioteca</span>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/src/img/ultima-papel-couche.jpg" alt="Papel" />
            <div className="blogCard-text">
              <h5>Papel couché - Saiba o que é!</h5>
              <p>O papel couché é, sem dúvidas, um dos mais utilizados pela indústria gráfica. Você sabe quais...</p>
              <sub>data</sub>
              <sub>minutos</sub>
            </div>
          </div>
          <div className="blogCard">
            <span>Biblioteca</span>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/blog-ultima-laminacao.jpg" alt="Laminação" />
            <div className="blogCard-text">
              <h5>Laminação fosca: o que é e para que serve</h5>
              <p>Os impressos promocionais representam mais de 8% da produção gráfica no Brasil, enquanto...</p>
              <sub>data</sub>
              <sub>minutos</sub>
            </div>
          </div>
          <div className="blogCard">
            <span>Materiais Impressos</span>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/src/img/blog-ultima-refile.jpg" alt="Refile" />
            <div className="blogCard-text">
              <h5>Você sabe o que é refile?</h5>
              <p>Refile é uma das etapas finais do processo gráfico e é considerado um tipo de acabamento. Mas, o que é um acabamento gráfico?</p>
              <sub>data</sub>
              <sub>minutos</sub>
            </div>
          </div>
          <div className="blogCard">
            <span>Materiais impressos</span>
            <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/blog-ultima-acabamento.jpg" alt="Acabamento" />
            <div className="blogCard-text">
              <h5>Qual é o melhor acabamento para o meu cartão de visita?</h5>
              <p>O acabamento brilhante dá ao cartão de visita uma aparência mais marcante..</p>
              <sub>data</sub>
              <sub>minutos</sub>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default BlogBlock;
