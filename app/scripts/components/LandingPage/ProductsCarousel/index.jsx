// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  screenSize: string,
};

export class ProductsCarousel extends React.Component {

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderMobile() {
    const { screenSize } = this.props;

    const styles = {
      backgroundImage: `url('${require('assets/media/images/home-card.png')}')`,
      backgroundSize: 'cover',
    };

    return (
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
    );
  }

  renderDesktop() {
    const styles = {
      backgroundImage: `url('${require('assets/media/images/home-card.png')}')`,
      backgroundSize: 'cover',
    };

    return (
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
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

export default connect(mapStateToProps)(ProductsCarousel);
