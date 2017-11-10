// @flow

import React from 'react';
import { isMobile } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { HourglassIcon, CalendarIcon } from 'components/Icons';

type Props = {
  screenSize: boolean,
}
export class CardsList extends React.Component {
  props: Props;

  renderMobile() {
    return (
      <div>
        <div>
          <h3 className="title-card-tutorial-mobile">Vídeos</h3>
          <hr />
          <div className="atm-content-tutorial">
            <Slider
              className="org-component-banners"
              dots={true}
              dotsClass="atm-carousel-dots"
              autoplay={false}
            >
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

            </Slider>
          </div>
        </div>

        <div>
          <h3 className="title-card-tutorial-mobile">Produtos</h3>
          <hr />
          <div className="atm-content-tutorial">
            <Slider
              className="org-component-banners"
              dots={true}
              dotsClass="atm-carousel-dots"
              autoplay={false}
            >
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

            </Slider>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
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
    );
  }
  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

export default CardsList;
