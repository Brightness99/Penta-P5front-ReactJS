// @flow
import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import Warning from 'containers/Config/Warning';
import { PageTitle } from 'atoms/Titles';
import Alert from 'components/Alert';
import AdditionalOption from './AdditionalOption';
import AvailableStrategy from './AvailableStrategy';
import NormalSchema from './UploadTypeSchemas/Normal';
import CanvasSchema from './UploadTypeSchemas/Canvas';
import SkuSceneSchema from './UploadTypeSchemas/SkuScene';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  match: {},
  dispatch: () => {},
};

export class Upload extends React.Component {
  static props: Props;

  renderAlerts = () => {
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

  renderAdditionalOptions = () => {
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

  renderAvailableStrategies = () => {
    const availableStrategies = [1, 4];

    return availableStrategies.map(
      (strategy) => (
        <AvailableStrategy
          key={`${new Date()}-${strategy}`}
          totalStrategies={availableStrategies.length}
          strategy={strategy}
        />
      )
    );
  };

  renderUploadTypeSchema = () => {
    const globalFlags = {
      upload_type: 'canvas',
      from_my_account: false,
    };

    switch (globalFlags.upload_type) {
      case 'normal':
        return <NormalSchema />;
      case 'canvas':
        return <CanvasSchema />;
      case 'sku_scene':
        return <SkuSceneSchema />;
      default:
        return <NormalSchema />;
    }
  };

  render() {
    const { dispatch } = this.props;

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

    const templates = {
      options: {
        vertical: ['illustrator', 'photoshop', 'photoshop'],
        horizontal: ['illustrator', 'photoshop', 'photoshop'],
      },
      downloadUrls: {
        vertical: {},
        horizontal: {},
      },
      parts: {
        pbcard: {
          guideCombinationId: 25,
          fileCombinationId: 27,
        },
      },
      selectedOrientation: 'vertical',
    };

    const product = {
      title: 'Cartão de Visita',
    };

    return (
      <div className="page-upload">
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <PageTitle>envie sua arte final</PageTitle>
          <div className="alert-container">{this.renderAlerts()}</div>
          <div className="upload-container">
            <div className="upload-container-centralized">
              {this.renderAdditionalOptions()}
            </div>
          </div>
          <div className="upload-container">
            <div className="upload-container-centralized">
              {this.renderAvailableStrategies()}
            </div>
          </div>
          <div className="upload-container">
            {this.renderUploadTypeSchema()}
            {/*<div className="upload-container-centralized">
              <Warning templates={templates} dispatch={dispatch} product={product} />
            </div>*/}
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

