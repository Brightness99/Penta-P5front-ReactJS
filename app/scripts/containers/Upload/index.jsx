// @flow
import React from 'react';
import { connect } from 'react-redux';
import mock from 'assets/json/uploadMock.json';
import { uploadFetch, uploadFinishRequest } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';
import { CheckBox } from 'components/Input';
import AvailableUploadStrategies from 'components/AvailableUploadStrategies';
import { PageTitle } from 'atoms/Titles';
import { FunnelBlock } from 'components/Funnel';
import MoreInfo from 'components/MoreInfo';
import Loading from 'components/Loading';
import AdditionalUploadOptions from 'components/AdditionalUploadOptions';
import UploadTypes from 'components/UploadTypes';
import CartItemDefinitionsPanel from 'components/CartItemDefinitionsPanel';
import CanvasSchema from '../../components/UploadTypes/Canvas';
import SkuSceneSchema from '../../components/UploadTypes/SkuScene';

type FinishUpload = {
  document_reference_url: string,
  upload_type: string,
  cimpress_sku_scene: {},
  thumbnail: string,
  upload_strategy: number,
  IsRepurchase: boolean,
  additional_options: {
    file_format: {id: string, name: string},
    proof: {id: string, name: string}
  },
  uploads: {}
}

type Props = {
  match: {
    params: {
      slug: string,
      itemId: string,
    }
  },
  isLoading: boolean,
  uploadInfo: {},
  uploadInfoFetch: (slug: string, itemId: string) => void,
  uploadFinish: (data: FinishUpload, itemId: string) => void,
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
  selectedAdditionalParameters: [],
  uploadedFiles: [],
}

export class Upload extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: 0,
      selectedAdditionalParameters: [],
      uploadedFiles: [],
    };
  }

  componentDidMount() {
    const { slug, itemId } = this.props.match.params;
    const { uploadInfoFetch } = this.props;

    uploadInfoFetch(slug, itemId);
  }

  static props: Props;
  static state: State;

  handleUploadFile = (file: {title: string, preview: {}}) => {
    const { uploadedFiles } = this.state;
    this.setState({
      uploadedFiles: [...uploadedFiles, file],
    });
  };

  handleRemoveFile = (file: {title: string, preview: {}}) => {
    const { uploadedFiles } = this.state;
    this.setState({
      uploadedFiles: [...uploadedFiles.filter(x => x.title !== file.title)],
    });
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
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;

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
        <UploadTypes uploadType={upload_type} selectedStrategy={selectedStrategy} />
      </FunnelBlock>
    );
  }

  render() {
    const { isLoading, uploadInfo: { cartItemDefinitions: { parts, total_price, expected_delivery_date } } } = this.props;
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
              {
                this.renderAdditionalParameters(1)
              }
              {
                this.renderUploadTypeSchemes(2)
              }
              {
                this.renderFileUploadBlock(3)
              }
              <section className="upload-finish-block">
                <label>
                  <CheckBox />
                  Concordo que a arte enviada é de minha responsabilidade. Não haverá revisão ortográfica ou qualquer outro ajuste.
                </label>
                <button>Enviar arte final</button>
              </section>
            </section>
            <CartItemDefinitionsPanel
              parts={parts}
              totalPrice={total_price}
              subTotal={total_price}
              expectedDeliveryDate={expected_delivery_date}
            />
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
  uploadFinish: (data, itemId) => dispatch(uploadFinishRequest(data, itemId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Upload);

