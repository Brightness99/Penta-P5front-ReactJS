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
import UploadTypeSchemes from 'components/UploadTypeSchemes';
import CanvasSchema from './UploadTypeSchemas/Canvas';
import SkuSceneSchema from './UploadTypeSchemas/SkuScene';

type Props = {
  match: {},
  dispatch: () => {},
};

type State = {
  currentStep: number,
  selectedStrategy: number,
  selectedAdditionalParameters: []
}

export class Upload extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: 0,
      selectedAdditionalParameters: [],
    };
  }

  static props: Props;
  static state: State;

  renderFlashMessages = () => {
    const messages = mock.flashMessages;

    return messages.map(
      (message, index) => <FlashMessage {...message} key={`${String(index)}_${Date()}`} />
    );
  };

  renderUploadTypeSchema = () => {
    const globalFlags = mock.globalFlags;

    switch (globalFlags.upload_type) {
      case 'canvas':
        return <CanvasSchema />;
      case 'sku_scene':
        return <SkuSceneSchema />;
      default:
        return <UploadTypeSchemes />;
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

  handleStepFinished(options: {}, step: number) {
    console.log("I'm here");
    const { currentStep } = this.state;
    switch (step) {
      case 1:
        this.setState({
          selectedAdditionalParameters: options,
        });
        break;
      case 2:
        this.setState({
          selectedStrategy: options,
        });
        break;
      default:
    }
    if (currentStep + 1 === step) {
      this.setState({
        currentStep: step,
      });
    }
  }

  renderAdditionalParameters() {
    const { currentStep } = this.state;
    const additionalOptions = mock.additionalOptions;
    const step = 1;
    return (
      <FunnelBlock
        order={step}
        isComplete={currentStep >= step}
        header={[
          <span key="source-block-title">Configurações adicionais</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AdditionalUploadOptions
          items={additionalOptions}
          handleOptionsChanged={(options) => this.handleStepFinished(options, step)}
        />
      </FunnelBlock>
    );
  }

  renderUploadTypeSchemes() {
    const { currentStep } = this.state;
    const availableStrategies = mock.availableStrategies;
    const step = 2;
    return (
      <FunnelBlock
        order={step}
        isComplete={currentStep >= step}
        header={[
          <span key="source-block-title">Como você quer enviar sua arte?</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AvailableUploadStrategies availableStrategies={availableStrategies}
                                   handleSelectedStrategy={(options) => this.handleStepFinished(options, step)} />
      </FunnelBlock>
    );
  }

  renderFileUploadBlock() {
    const { currentStep } = this.state;
    const step = 3;
    return (
      <FunnelBlock
        order={step}
        isComplete={currentStep >= step}
        header={[
          <span key="source-block-title">Enviar arquivo da arte</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        {this.renderUploadTypeSchema()}
      </FunnelBlock>
    );
  }

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

    return (
      <div className="page-upload">
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <PageTitle>envie sua arte final</PageTitle>
          <div className="alert-container">{this.renderFlashMessages()}</div>
          {
            this.renderAdditionalParameters()
          }
          {
            this.renderUploadTypeSchemes()
          }
          {
            this.renderFileUploadBlock()
          }
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

