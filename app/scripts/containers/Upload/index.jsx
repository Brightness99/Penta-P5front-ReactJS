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
import CartItemDefinitionsPanel from 'components/CartItemDefinitionsPanel';
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
  uploadFile: (file: {}) => void,
  uploadFileProgress: {
    progress: number,
    preview: {},
    isRunning: boolean,
    error: boolean,
    message: string,
  },
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
    const { uploadFile } = this.props;

    if (uploadFile && typeof uploadFile === 'function') {
      uploadFile(file);
    }
  };

  renderUploadTypeSchema = () => {
    const { uploadInfo, uploadFileProgress } = this.props;
    const { selectedStrategy } = this.state;
    const globalFlags = uploadInfo.globalFlags;

    switch (globalFlags.upload_type) {
      case 'canvas':
        return <CanvasSchema />;
      case 'sku_scene':
        return <SkuSceneSchema />;
      default:
        return (
          <NormalUploadType
            uploadFileProgress={uploadFileProgress}
            uploadTwoFiles={selectedStrategy === 4}
            multipleFiles={selectedStrategy === 5}
            handleUploadFile={this.handleUploadFile}
          />);
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

  renderAdditionalParameters(stepNumber: number) {
    const { currentStep } = this.state;
    const additionalOptions = mock.additionalOptions;
    const isComplete = currentStep >= stepNumber;
    return (
      <FunnelBlock
        order={stepNumber}
        isComplete={isComplete}
        header={[
          <span key="source-block-title">Configurações adicionais</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AdditionalUploadOptions
          items={additionalOptions}
          handleOptionsChanged={(options) => this.handleStepFinished(options, stepNumber)}
        />
      </FunnelBlock>
    );
  }

  renderUploadTypeSchemes(stepNumber: number) {
    const { currentStep } = this.state;
    const { uploadInfo: { availableStrategies } } = this.props;
    const isComplete = currentStep >= stepNumber;
    const showStep = currentStep >= (stepNumber - 1);
    return (
      showStep &&
      <FunnelBlock
        order={stepNumber}
        isComplete={isComplete}
        header={[
          <span key="source-block-title">Como você quer enviar sua arte?</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AvailableUploadStrategies
          availableStrategies={availableStrategies}
          handleSelectedStrategy={(options) => this.handleStepFinished(options, stepNumber)}
        />
      </FunnelBlock>
    );
  }

  renderFileUploadBlock(stepNumber: number) {
    const { currentStep, selectedStrategy } = this.state;
    const isComplete = currentStep >= stepNumber;
    const showStep = currentStep >= (stepNumber - 1) && selectedStrategy > 1;
    return (
      showStep &&
      <FunnelBlock
        order={stepNumber}
        isComplete={isComplete}
        header={[
          <span key="source-block-title">Enviar arquivo da arte</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        {
          this.renderUploadTypeSchema()
        }
      </FunnelBlock>
    );
  }

  renderCartDefinitions() {
    const { uploadInfo: { cartItemDefinitions: { parts, total_price, expected_delivery_date } } } = this.props;

    return (
      <CartItemDefinitionsPanel
        parts={parts}
        totalPrice={total_price}
        subTotal={total_price}
        expectedDeliveryDate={expected_delivery_date}
      />);
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

    if (!isLoading) return <Loading />;

    return (
      <section className="page-upload">
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <PageTitle>envie sua arte final</PageTitle>
          <section className="content">
            <section className="main-upload-container">
              <div className="alert-container">{this.renderFlashMessages()}</div>
              {
                this.renderAdditionalParameters(1)
              }
              {
                this.renderUploadTypeSchemes(2)
              }
              {
                this.renderFileUploadBlock(3)
              }
            </section>
            {this.renderCartDefinitions()}
          </section>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.upload.isLoaded,
  uploadInfo: state.upload.object,
  uploadFileProgress: state.upload.uploadFile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  uploadInfoFetch: (slug, itemId) => dispatch(uploadFetch(slug, itemId)),
  uploadFile: (file) => dispatch(uploadFileRequest(file)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Upload);

