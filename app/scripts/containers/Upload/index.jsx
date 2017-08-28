// @flow
import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';
import Alert from 'components/Alert';
import AdditionalOption from 'components/AdditionalOption';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  match: {},
  dispatch: () => {},
};

export class Upload extends React.Component {

  static props: Props;

  render() {

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Marca página',
        url: '/configuracao-marca-pagina',
      },
      {
        title: 'Enviar arte',
        url: '',
      },
    ];

    const alerts = [
      {
        type: 'error',
        title: 'Desculpe!',
        content: 'Ocorreu um erro interno impossibilitando seu upload.'
      },
      {
        type: 'warning',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após esse período a previsão de entrega será alterada.'
      },
      {
        type: 'warning',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após dsadsse período a previsão de entrega será alterada.'
      },
      {
        type: 'error',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após esse perfgdgfíodo a previsão de entrega será alterada.'
      }
    ];

    const additionalOptions = [
      {
        title: 'Formato do arquivo',
        video: 'http://www.youtube.com',
        options: [
          {
            label: 'Arquivo PDF (fechado para impressão)',
            value: true,
            price: 0,
          },
          {
            label: 'Arquivo AI, INDD, PSD, JPG (aberto)',
            value: false,
            price: 30,
          },
        ]
      },
      {
        title: 'Checagem do arquivo',
        video: 'http://www.youtube.com',
        options: [
          {
            label: 'Checagem padrão',
            value: true,
            price: 0,
          },
          {
            label: 'Checagem profissional',
            value: false,
            price: 25,
          },
        ]
      },
    ];

    const renderAlerts = () => {
      return alerts.map(
        (alert) => (
          <Alert
            key={`${new Date()}-${alert.content}`}
            type={alert.type}
            title={alert.title}
            content={alert.content}
          />
        )
      );
    };

    const renderAdditionalOptions = () => {
      return additionalOptions.map(
        (additionalOption) => (
          <AdditionalOption
            key={`${new Date()}-${additionalOption.title}`}
            title={additionalOption.title}
            video={additionalOption.video}
            options={additionalOption.options}
          />
        )
      );
    };

    return (
      <div>
        <div className="page-upload">
          <div className="container">
            <Breadcrumbs links={breadcrumb} />
            <PageTitle>envie sua arte final</PageTitle>
            <div className="alert-container">{renderAlerts()}</div>
            <div className="upload-container">
              <div className="upload-container-centralized">
                {renderAdditionalOptions()}
              </div>
            </div>
            <div className="upload-container">
              <div className="upload-container-centralized" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    app: state.app,
    router: state.router,
    locale: state.locale,
  });
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Upload);

