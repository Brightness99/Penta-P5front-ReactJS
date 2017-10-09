// @flow
import React from 'react';
import { connect } from 'react-redux';
import mock from 'assets/json/uploadMock.json';
import { cartAddFetch } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';
import Warning from 'containers/Config/Warning';
import AvailableUploadStrategies from 'components/AvailableUploadStrategies';
import { PageTitle } from 'atoms/Titles';
import FlashMessage from 'components/FlashMessage';
import AdditionalUploadOptions from 'components/AdditionalUploadOptions';
import AvailableStrategy from './AvailableStrategy';
import NormalSchema from './UploadTypeSchemas/Normal';
import CanvasSchema from './UploadTypeSchemas/Canvas';
import SkuSceneSchema from './UploadTypeSchemas/SkuScene';

type Props = {
  match: {},
  dispatch: () => {},
};

export class Upload extends React.Component {
  static props: Props;

  renderFlashMessages = () => {
    const messages = mock.flashMessages;

    return messages.map(
      (message, index) => <FlashMessage {...message} key={`${String(index)}_${Date()}`} />
    );
  };

  renderUploadTypeSchema = () => {
    const globalFlags = mock.globalFlags;

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

  renderWarningExtraInfo = () => {
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

    const { dispatch } = this.props;

    const product = {
      title: 'Cartão de Visita',
    };

    return <Warning templates={templates} dispatch={dispatch} product={product} />;
  };

  render() {
    const additionalOptions = mock.additionalOptions;
    const availableStrategies = mock.availableStrategies;

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

    return (
      <div className="page-upload">
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <PageTitle>envie sua arte final</PageTitle>
          <div className="alert-container">{this.renderFlashMessages()}</div>
          <div className="upload-container">
            <AdditionalUploadOptions items={additionalOptions} />
          </div>
          <div className="upload-container">
            <AvailableUploadStrategies availableStrategies={availableStrategies} />
          </div>
          {this.renderUploadTypeSchema()}
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

