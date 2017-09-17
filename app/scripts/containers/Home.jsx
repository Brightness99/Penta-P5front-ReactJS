// @flow

import React from 'react';
import config from 'config'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

import { Banners, Highlights, BlogBlock, CustomersRelyBlock, CategoriesCarousel } from 'components/LandingPage';

type Props = {
  screenSize: AppStoreType.screenSize,
};

const bannerImages = [
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730548_banner-home-site-1920x420px.jpg',
      MOBILE: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730557_banner-home-mobile-1578x932px.jpg',
    },
    ALT: 'promo carnaval',
  },
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: 'http://dev-cms.printi.com.br/files/2017-02/lan-amentos-printi.png',
      MOBILE: 'http://dev-cms.printi.com.br/files/2017-02/1486471907_lan-amentos-printi.png',
    },
    ALT: 'promo carnaval',
  },
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: '',
      MOBILE: 'http://dev-cms.printi.com.br/files/2016-12/1482158857_matix.png',
    },
    ALT: 'mobile only',
  },
  {
    file: {
      DESKTOP: 'http://dev-cms.printi.com.br/files/2016-12/banner-desktop.png',
      MOBILE: '',
    },
    ALT: 'teste somente desktop',
  },
];

const highlightsJson = {
  TITLE: 'Destaques',
  list: [
    {
      TITLE: 'SAIBA COMO PAGAR FATURADO',
      TEXT: 'Conte com os benefícios e facilidades do pagamento faturado. Veja como solicitar o seu.',
      link: {
        URL: '/solicitacao-faturamento',
        TITLE: 'Pague faturado na gráfica Printi',
      },
      image: {
        URL: '/assets/final/img/destaque-pagar-faturado.jpg',
        ALT: 'Pague faturado na gráfica Printi',
      },
    },
    {
      TITLE: 'VEJA COMO EDITAR SUA ARTE',
      TEXT: 'Baixe o gabarito e edite seu arquivo nos padrões recomendados para impressão.',
      link: {
        URL: '/download-de-gabaritos',
        TITLE: 'Baixe Gabaritos da grafica online Printi',
      },
      image: {
        URL: '/assets/final/img/destaque-pagina-gabaritos.jpg',
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
        URL: '/assets/final/img/destaque-guia-impressao.jpg',
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
        URL: '/assets/final/img/destaque-montagem-arquivo.jpg',
        ALT: 'Montagem do arquivo da Printi melhor gráfica do Brasil',
      },
    },
    {
      TITLE: 'TUTORIAL DE CARTÃO DE VISITA',
      TEXT: 'Aprenda sobre as especificações, características e formas de uso dos cartões de visita.',
      link: {
        URL: '/tutoriais/cartao-de-visita',
        TITLE: 'Tutorial de cartões de visita da grafica online Printi',
      },
      image: {
        URL: '/assets/final/img/destaque-tutorial-cartao-visita.jpg',
        ALT: 'Tutorial de cartões de visita da grafica online Printi',
      },
    },
  ],
};

export class Home extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { screenSize } = this.props;

    return (
      <div className="container-homePage">
        <Banners images={bannerImages} screenSize={screenSize} />
        <CategoriesCarousel />
        <Highlights highlights={highlightsJson} screenSize={screenSize} />
        <CustomersRelyBlock />
        <BlogBlock />
      </div>
    );
  }

  renderDesktop() {
    const { screenSize } = this.props;

    return (
      <div className="container-homePage">
        <div className="container">
          <Banners images={bannerImages} screenSize={screenSize} />
        </div>
        <CategoriesCarousel />
        <Highlights highlights={highlightsJson} screenSize={screenSize} />
        <CustomersRelyBlock />
        <BlogBlock />
      </div>
    );
  }

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

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
