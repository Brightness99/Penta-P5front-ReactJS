// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class PrintiPress extends React.Component {

  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Printi na imprensa',
      },
    ];

    return (
      <section>
        <div className="tpl-printi-press">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="container">
            <h2 className="title-printi-press">Printi na imprensa</h2>

            <div className="org-printi-press">
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#"  className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
              <Link to="#" className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    {!isMobile(screenSize) &&
                      <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                    }
                  </div>
                </div>
              </Link>
            </div>
            <div className="org-container-btn">
              <Link to="#" className="btn-default btn-third btn-xs">Carregar mais notícias (4)</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintiPress);
