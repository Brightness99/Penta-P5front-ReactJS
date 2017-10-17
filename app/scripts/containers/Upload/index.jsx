// @flow
import React from 'react';
import { connect } from 'react-redux';
import mock from 'assets/json/uploadMock.json';
import { uploadFetch, uploadFileRequest } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';
import Warning from 'containers/Config/Warning';
import AvailableUploadStrategies from 'components/AvailableUploadStrategies';
import { PageTitle } from 'atoms/Titles';
import FlashMessage from 'components/FlashMessage';
import { FunnelBlock } from 'components/Funnel';
import MoreInfo from 'components/MoreInfo';
import Loading from 'components/Loading';
import AdditionalUploadOptions from 'components/AdditionalUploadOptions';
import { NormalUploadType } from 'components/UploadTypes';
import CanvasSchema from './UploadTypeSchemas/Canvas';
import SkuSceneSchema from './UploadTypeSchemas/SkuScene';

type Props = {
  match: {
    params: {
      slug: string,
      itemId: string,
    }
  },
  isLoading: boolean,
  uploadInfo: {},
  uploadInfoFetch: (slug, itemId) => void,
  uploadFile: (file) => void,
  dispatch: () => void,
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

  componentDidMount() {
    const { slug, itemId } = this.props.match.params;
    const { uploadInfoFetch } = this.props;

    uploadInfoFetch(slug, itemId);
  }

  static props: Props;
  static state: State;

  renderFlashMessages = () => {
    const { uploadInfo } = this.props;
    const messages = uploadInfo.flashMessages;

    if (!messages) return '';

    return messages.map(
      (message, index) => <FlashMessage {...message} key={`${String(index)}`} />
    );
  };

  handleUploadFile = (file: {}) => {
    this.props.uploadFile(file);
  };

  renderUploadTypeSchema = () => {
    const { uploadInfo } = this.props;
    const globalFlags = uploadInfo.globalFlags;

    switch (globalFlags.upload_type) {
      case 'canvas':
        return <CanvasSchema />;
      case 'sku_scene':
        return <SkuSceneSchema />;
      default:
        return <NormalUploadType handleUploadFile={this.handleUploadFile} />;
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
    const { uploadInfo } = this.props;
    const availableStrategies = uploadInfo.availableStrategies;
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
        {
          currentStep >= 1 &&
          <AvailableUploadStrategies
            availableStrategies={availableStrategies}
            handleSelectedStrategy={(options) => this.handleStepFinished(options, step)}
          />
        }
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
        {
          currentStep >= 2 &&
          this.renderUploadTypeSchema()
        }
      </FunnelBlock>
    );
  }

  render() {
    const { isLoading } = this.props;
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

    if (isLoading) return <Loading />;

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

const mapStateToProps = (state) => ({
  isLoading: state.upload.isRunning,
  uploadInfo: state.upload.object,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  uploadInfoFetch: (slug, itemId) => dispatch(uploadFetch(slug, itemId)),
  uploadFile: (file) => dispatch(uploadFileRequest(file)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Upload);

