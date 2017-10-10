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
import { FunnelBlock } from 'components/Funnel';
import MoreInfo from 'components/MoreInfo';
import AdditionalUploadOptions from 'components/AdditionalUploadOptions';
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
          <FunnelBlock
            order="1"
            header={[
              <span key="source-block-title">Configurações adicionais</span>,
              <MoreInfo key="source-block-more-info" text="Mais informações" />,
            ]}
          >
            <AdditionalUploadOptions items={additionalOptions} />
          </FunnelBlock>
          <FunnelBlock
            order="2"
            header={[
              <span key="source-block-title">Como você quer enviar sua arte?</span>,
              <MoreInfo key="source-block-more-info" text="Mais informações" />,
            ]}
          >
            <AvailableUploadStrategies availableStrategies={availableStrategies} />
          </FunnelBlock>
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

