// @flow

import React from 'react';
import config from 'config'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CustomersRelyBlock from 'containers/CustomersRelyBlock/CustomersRelyBlock';

import { Banners, Highlights, Blog } from 'components/LandingPage';

type Props = {
  app: {},
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
  props: Props;

  renderMobile() {
    const { app: { screenSize } } = this.props;

    const styles = {
      backgroundImage: `url('${require('../../../assets/media/images/home-card.png')}')`,
      backgroundSize: 'cover',
    };

    return (
      <div className="container-homePage">
        <Banners images={bannerImages} screenSize={screenSize} />
        <div className="container">
          <section className="home-slider">
            <nav className="tabNavigation">
              <ul className="list-item awol-pdd awol-list-style">
                <li>Lançamentos</li>
                <li>Mais vendidos</li>
                <li>Super ofertas</li>
              </ul>
            </nav>
            <div className="slider-images">
              <div>
                <img src={require('assets/media/images/image-product-pasta.png')} alt="Grafica Online para cartões de visita" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Pasta</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-folder.png')} alt="Gráfica para imprimir flyer" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Folder</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-tag.png')} alt="Gráfica Online para imprimir adesivos" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Tag</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-revista.png')} alt="Canetas Personalizadas com entrega rápida" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Revista</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-envelope.png')} alt="Gráfica Online para Chaveiro" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Envelope</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-cartaz.png')} alt="Gráfica para impressão de panfleto" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Cartaz</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-revista.png')} alt="Gráfica para impressão de banner" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Revista</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-envelope.png')} alt="Gráfica online para folder" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Envelope</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div style={styles}>
                <div className="desc-slider">
                  <h4 className="title-product-slider">Cartão de visita</h4>
                  <p className="price-product-slider">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                  <p className="price-product-slider">A partir de <span><sup>R$</sup><em>19,</em><sup>90</sup></span></p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Highlights highlights={highlightsJson} screenSize={screenSize} />
        <CustomersRelyBlock screenSize={screenSize}  />
        <Blog screenSize={screenSize} />
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;

    const styles = {
      backgroundImage: `url('${require('../../../assets/media/images/home-card.png')}')`,
      backgroundSize: 'cover',
    };

    return (
      <div className="container-homePage">
        <div className="container">
          <Banners images={bannerImages} screenSize={screenSize} />
        </div>
        <div className="container">
          <section className="home-slider">
            <nav className="tabNavigation">
              <ul className="list-item awol-pdd awol-list-style">
                <li>Lançamentos</li>
                <li>Mais vendidos</li>
                <li>Super ofertas</li>
              </ul>
            </nav>
            <div className="slider-images">
              <div>
                <img src={require('assets/media/images/image-product-pasta.png')} alt="Grafica Online para cartões de visita" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Pasta</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-folder.png')} alt="Gráfica para imprimir flyer" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Folder</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-tag.png')} alt="Gráfica Online para imprimir adesivos" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Tag</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-revista.png')} alt="Canetas Personalizadas com entrega rápida" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Revista</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-envelope.png')} alt="Gráfica Online para Chaveiro" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Envelope</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-cartaz.png')} alt="Gráfica para impressão de panfleto" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Cartaz</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-revista.png')} alt="Gráfica para impressão de banner" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Revista</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div>
                <img src={require('assets/media/images/image-product-envelope.png')} alt="Gráfica online para folder" />
                <div className="desc-slider">
                  <h4 className="title-product-slider">Envelope</h4>
                  <p className="price-product-slider">A partir de <span>R$ 29,00</span></p>
                </div>
                <div className="btn-slider">
                  <NavLink to="#" className="btn-default btn-primary btn-lg">Veja mais </NavLink>
                </div>
              </div>
              <div style={styles}>
                <div className="desc-slider">
                  <h4 className="title-product-slider">Cartão de visita</h4>
                  <p className="price-product-slider">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                  <p className="price-product-slider">A partir de <span><sup>R$</sup><em>19,</em><sup>90</sup></span></p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Highlights highlights={highlightsJson} screenSize={screenSize} />
        <CustomersRelyBlock screenSize={screenSize} />
        <Blog screenSize={screenSize} />
      </div>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
