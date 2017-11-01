// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import config from 'config';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { BlockTitle } from 'atoms/Titles';
import { PrevArrow, NextArrow } from 'components/Carousel';

const highlightsJson = {
  TITLE: 'Destaques',
  list: [
    {
      TITLE: 'Saiba como pagar faturado',
      TEXT: 'Conte com os benefícios e facilidades do pagamento faturado. Veja como solicitar o seu.',
      link: {
        URL: '/solicitacao-faturamento',
        TITLE: 'Pague faturado na gráfica Printi',
      },
      image: {
        URL: 'assets/final/img/destaque-pagar-faturado.jpg',
        ALT: 'Pague faturado na gráfica Printi',
      },
    },
    {
      TITLE: 'Veja como editar sua arte',
      TEXT: 'Baixe o gabarito e edite seu arquivo nos padrões recomendados para impressão.',
      link: {
        URL: '/download-de-gabaritos',
        TITLE: 'Baixe Gabaritos da grafica online Printi',
      },
      image: {
        URL: 'assets/final/img/destaque-pagina-gabaritos.jpg',
        ALT: 'Baixe Gabaritos da grafica online Printi',
      },
    },
    {
      TITLE: 'Evite erros na impressão',
      TEXT: 'Consulte nosso guia de impressão e solucione todas as dúvidas antes de imprimir.',
      link: {
        URL: '/guia-de-impressao',
        TITLE: 'Guia de impressão da grafica online melhor do Brasil',
      },
      image: {
        URL: 'assets/final/img/destaque-guia-impressao.jpg',
        ALT: 'Guia de impressão da grafica online melhor do Brasil',
      },
    },
    {
      TITLE: 'Aprenda a montar sua arte',
      TEXT: 'Encontre todas as informações que você precisa para montar seu arquivo corretamente.',
      link: {
        URL: '/montagem-do-arquivo',
        TITLE: 'Montagem do arquivo da Printi melhor gráfica do Brasil',
      },
      image: {
        URL: 'assets/final/img/destaque-montagem-arquivo.jpg',
        ALT: 'Montagem do arquivo da Printi melhor gráfica do Brasil',
      },
    },
    {
      TITLE: 'Tutorial de cartão de visita',
      TEXT: 'Aprenda sobre as especificações, características e formas de uso dos cartões de visita.',
      link: {
        URL: '/tutoriais/cartao-de-visita',
        TITLE: 'Tutorial de cartões de visita da grafica online Printi',
      },
      image: {
        URL: 'assets/final/img/destaque-tutorial-cartao-visita.jpg',
        ALT: 'Tutorial de cartões de visita da grafica online Printi',
      },
    },
  ],
};

type Props = {
  screenSize: AppStoreType.screenSize,
};

export class HighlightsBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderHighlights = () => (
    highlightsJson.list.map((highlight) => (
      <NavLink to={highlight.link.URL} title={highlight.link.TITLE} key={highlight.link.URL} className="box-highlight">
        <img src={`${config.basePath}${highlight.image.URL}`} alt={highlight.image.ALT} />
        <div className="desc-highlight">
          <h4 className="box-highlight-title">{highlight.TITLE}</h4>
          <p>{highlight.TEXT}</p>
        </div>
      </NavLink>
    ))
  );

  renderMobile = () => (
    <div className="container">
      <section className="container-highlight">
        <h4 className="title-highlight">{highlightsJson.TITLE}</h4>
        <Slider
          className="boxes-highlight"
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          dots={true}
          dotsClass="atm-carousel-dots"
          autoplay={false}
        >
          {this.renderHighlights()}
        </Slider>
      </section>
    </div>
  );

  renderDesktop = () => (
    <div className="container">
      <section className="container-highlight">
        <BlockTitle>{highlightsJson.TITLE}</BlockTitle>
        <Slider
          className="boxes-highlight"
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          dots={true}
          dotsClass="atm-carousel-dots"
          autoplay={false}
          slidesToShow={3}
          slidesToScroll={3}
        >
          {this.renderHighlights()}
        </Slider>
      </section>
    </div>
  );

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}


function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

export default connect(mapStateToProps)(HighlightsBlock);
