// @flow

import React from 'react';
import config from 'config'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Banners from 'components/Banners';

import Blog from 'containers/Blog/Blog';
import CustomersRelyBlock from 'containers/CustomersRelyBlock/CustomersRelyBlock';

import Carousel from 'components/Carousel';

type Props = {
  app: {},
};

const bannerImages = [
  {
    link: {
      url: '/',
      target: 'self',
    },
    file: {
      desktop: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730548_banner-home-site-1920x420px.jpg',
      mobile: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730557_banner-home-mobile-1578x932px.jpg',
    },
    alt: 'promo carnaval',
  },
  {
    link: {
      url: '/',
      target: 'self',
    },
    file: {
      desktop: 'http://dev-cms.printi.com.br/files/2017-02/lan-amentos-printi.png',
      mobile: 'http://dev-cms.printi.com.br/files/2017-02/1486471907_lan-amentos-printi.png',
    },
    alt: 'promo carnaval',
  },
  {
    link: {
      url: '/',
      target: 'self',
    },
    file: {
      desktop: '',
      mobile: 'http://dev-cms.printi.com.br/files/2016-12/1482158857_matix.png',
    },
    alt: 'mobile only',
  },
  {
    file: {
      desktop: 'http://dev-cms.printi.com.br/files/2016-12/banner-desktop.png',
      mobile: '',
    },
    alt: 'teste somente desktop',
  },
];

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

          <section className="container-highlight">
            <h4 className="title-highlight">Destaques</h4>
            <div className="boxes-highlight">
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-pagar-faturado.jpg" alt="Pague faturado na gráfica Printi" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Saiba como pagar faturado</h4>
                  <p>Precisa de um cartão mas não ter arte? monte o seu modelo agora mesmo.</p>
                </div>
              </div>
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-pagina-gabaritos.jpg" alt="Baixe Gabaritos da grafica online Printi" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Monte seu cartão de visita</h4>
                  <p>Precisa de um cartão mas não ter arte? monte o seu modelo agora mesmo.</p>
                </div>
              </div>
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-guia-impressao.jpg" alt="Guia de impressão da grafica online melhor do Brasil" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Conheça o nosso portfolio</h4>
                  <p>Tem dúvida sobre algum produto? confira a nossa seleção de impressos promocionais.</p>
                </div>
              </div>
            </div>
          </section>

          <CustomersRelyBlock />
          <Blog />
        </div>
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

        <div className="container">
          <section className="container-highlight">
            <h4 className="title-highlight">Destaques</h4>
            <div className="boxes-highlight">
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-pagar-faturado.jpg" alt="Pague faturado na gráfica Printi" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Saiba como pagar faturado</h4>
                  <p>Conte com os benefícios e facilidades do pagamento faturado. Veja como solicitar o seu.</p>
                </div>
              </div>
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-pagina-gabaritos.jpg" alt="Baixe Gabaritos da grafica online Printi" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Veja como editar sua arte</h4>
                  <p>Baixe o gabarito e edite seu arquivo nos padrões recomendados para impressão.</p>
                </div>
              </div>
              <div className="box-highlight">
                <div className="bg-highlight-hover" />
                <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/destaque-guia-impressao.jpg" alt="Guia de impressão da grafica online melhor do Brasil" />
                <div className="desc-highlight">
                  <h4 className="box-highlight-title">Evite erros na impressão</h4>
                  <p>Consulte nosso guia de impressão e solucione todas as dúvidas antes de imprimir.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <CustomersRelyBlock />
        <Blog />
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
