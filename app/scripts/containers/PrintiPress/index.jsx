// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class PrintiPress extends React.Component {
  render() {
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
          <div className="container">
            <Breadcrumbs links={breadcrumb} />
            <h2 className="title-printi-press">Printi na imprensa</h2>

            <div className="org-printi-press">
              <div className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                  </div>
                </div>
              </div>
              <div className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                  </div>
                </div>
              </div>
              <div className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                  </div>
                </div>
              </div>
              <div className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                  </div>
                </div>
              </div>
              <div className="mol-printi-press">
                <div className="atm-content-printi-press">
                  <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
                  <div className="qrk-text-printi-press">
                    <p className="title-content">Printi anuncia fusão com americana Vistaprint</p>
                    <p className="text-content">A gráfica online Printi mira mercado publicitário. Startup tem sido procurada por empresas com budgets menores...</p>
                  </div>
                </div>
              </div>
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
