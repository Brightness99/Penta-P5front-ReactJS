import React from 'react';
import { isMobile } from 'utils/helpers';
import { NavLink, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { HourglassIcon, CalendarIcon, SearchIcon } from 'components/Icons';
import { PrevArrow, NextArrow } from 'components/Carousel';

export class Tutorial extends React.Component {
  render() {
    return (
      <section className="tpl-tutorial">
        <div className="container org-tutorial">
          <div className="mol">
            <Slider
              className="org-component-banners"
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              dots={true}
              dotsClass="atm-carousel-dots atm-carousel-dots--inline"
              autoplay={false}
            >
              <Link to="#">
                <img src={require('assets/media/images/tutorial-slide.png')} alt="Banner" />
              </Link>
            </Slider>
          </div>

          <div>
            <h2 className="title-tutorial">Tutoriais</h2>
            <div className="mol-content-tutorial">

              <div className="atm-sidebar-tutorial">
                <form className="qrk-search-tutorial">
                  <input
                    type="text"
                    placeholder="Buscar tutorial..."
                  />
                  <button>
                    <SearchIcon />
                  </button>
                </form>
                <ul className="qrk-list-sidebar">
                  <li className="active-li"><Link to="#">Todos</Link></li>
                  <li><Link to="#">Vídeos</Link></li>
                  <li><Link to="#">Produtos</Link></li>
                  <li><Link to="#">Ferramentas</Link></li>
                </ul>
              </div>

              <div className="atm-content-tutorial">

                <div>
                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-tools">Ferramentas</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-product">Produto</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-videos">Vídeos</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-tools">Ferramentas</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-product">Produto</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="qrk-content-tutorial">
                    <NavLink to="#" target="_blank">
                      <div className="details-content-tutorial">
                        <img src={require('assets/media/images/tutorial-list-li.png')} alt="Turorial" />
                        <div className="desc-content-tutorial">
                          <span className="cat-content-tutorial bg-videos">Vídeos</span>
                          <h3 className="title-desc-content-tutorial">Como fazer download dos gabaritos disponíveis</h3>
                          <div className="footer-content-tutorial">
                            <div className="date-time-content-tutorial">
                              <CalendarIcon />
                              <span>7 Out</span>
                            </div>
                            <div className="date-time-content-tutorial">
                              <HourglassIcon />
                              <span>6min para ler</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div className="see-more-tutorial">
                  <button className="btn-default btn-third btn-xs">Carregar mais artigos (3)</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Tutorial;
