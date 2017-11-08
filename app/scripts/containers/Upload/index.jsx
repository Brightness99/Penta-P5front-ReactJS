// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  uploadFetch,
  uploadFinishRequest,
  uploadSetOrientationRequest
} from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';
import { CheckBox } from 'components/Input';
import AvailableUploadStrategies from 'components/AvailableUploadStrategies';
import { PageTitle } from 'atoms/Titles';
import { FunnelBlock } from 'components/Funnel';
import FlashMessage from 'components/FlashMessage';
import MoreInfo from 'components/MoreInfo';
import Loading from 'components/Loading';
import AdditionalUploadOptions from 'components/AdditionalUploadOptions';
import UploadTypes from 'components/UploadTypes';
import CartItemDefinitionsPanel from 'components/CartItemDefinitionsPanel';
import { Button } from 'quarks/Inputs';
import { isMobile } from 'utils/helpers';

type FinishUpload = {
  document_reference_url: string,
  upload_type: string,
  cimpress_sku_scene: {},
  thumbnail: string,
  upload_strategy: number,
  isRepurchase: boolean,
  additional_options: {
    file_format: { id: string, name: string },
    proof: { id: string, name: string }
  },
  uploads: {}
}

type Props = {
  screenSize: string,
  match: {
    params: {
      slug: string,
      itemId: string,
    }
  },
  isLoading: boolean,
  uploadInfo: {},
  uploadSetOrientation: (itemId: string, isVertical: number) => void,
  uploadInfoFetch: (slug: string, itemId: string) => void,
  uploadFinish: (data: FinishUpload, itemId: string) => void,
  uploadFileProgress: {
    isRunning: boolean,
    error: boolean,
    message: string,
  },
  dispatch: () => void,
};

type State = {
  selectedStrategy: number,
  isRepurchase: boolean,
  selectedAdditionalParameters: {proof: {}, file_format: {}},
  fileFormats: [],
  uploadedFiles: [],
  canSubmit: boolean,
  documentReferenceId: string,
}

export class Upload extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedStrategy: 0,
      selectedAdditionalParameters: null,
      uploadedFiles: [],
      fileFormats: [],
      isRepurchase: false,
      canSubmit: false,
    };
  }

  componentDidMount() {
    const { slug, itemId } = this.props.match.params;
    const { uploadInfoFetch } = this.props;

    uploadInfoFetch(slug, itemId);
  }

  static props: Props;
  static state: State;

  updateCanSubmit = () => {
    const { selectedStrategy, uploadedFiles, documentReferenceId } = this.state;
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;
    let canSubmit;
    switch (upload_type) {
      case 'canvas':
        canSubmit = !!documentReferenceId;
        break;
      case 'sku_scene':
        canSubmit = !!documentReferenceId;
        break;
      default:
        canSubmit = (selectedStrategy === 1 ||
        (selectedStrategy === 4 && uploadedFiles.length === 2)
        || uploadedFiles.length > 0);
    }
    this.setState({ canSubmit });
  };

  handleChoose = () => {
    const { isRepurchase } = this.state;
    this.setState({
      isRepurchase: !isRepurchase,
    });
  };

  handleCanvasFinalize = (documentRef: string) => {
    this.setState({
      documentReferenceId: documentRef,
    }, this.updateCanSubmit);
  };

  handleUploadFile = (file: { title: string, preview: {} }) => {
    const { uploadedFiles } = this.state;
    this.setState({
      uploadedFiles: [...uploadedFiles, file],
    }, this.updateCanSubmit);
  };

  handleRemoveFile = (file: { title: string, preview: {} }) => {
    const { uploadedFiles } = this.state;
    this.setState({
      uploadedFiles: [...uploadedFiles.filter(x => x.title !== file.title)],
    }, this.updateCanSubmit);
  };

  handleAdditionalParameters = (parameters) => {
    let fileFormats;
    if (parameters.file_format.id === 'ppdf') {
      fileFormats = ['.pdf'];
    } else {
      fileFormats = ['.ai', '.indd', '.psd', '.cdr', '.jpg', '.jpeg'];
    }
    this.setState({
      selectedAdditionalParameters: parameters,
      fileFormats,
    }, this.updateCanSubmit);
  };

  handleSelectedStrategy = (strategy) => {
    this.setState({
      selectedStrategy: strategy,
      uploadedFiles: [],
    }, this.updateCanSubmit);
  };

  handleUploadFinish = () => {
    const { match: { params: { itemId } }, uploadFinish, uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const { uploadedFiles, isRepurchase, selectedStrategy, documentReferenceId, selectedAdditionalParameters } = this.state;
    const uploads = {};
    uploadedFiles.forEach((x) => {
      uploads[x.preview.basename] = x.preview;
    });
    const thumbnail = uploadedFiles.length > 0 ? uploadedFiles[0].preview.thumbnail : null;
    const result = {
      document_reference_url: documentReferenceId,
      cimpress_sku_scene: null,
      thumbnail,
      isRepurchase,
      upload_type,
      upload_strategy: selectedStrategy,
      additional_options: selectedAdditionalParameters,
      uploads,
    };

    if (uploadFinish && typeof uploadFinish === 'function') {
      uploadFinish(result, itemId);
    }
  };

  handleOrientationChanged = (isVertical: number) => {
    const { uploadSetOrientation, match: { params: { itemId } } } = this.props;
    if (uploadSetOrientation && typeof uploadSetOrientation === 'function') {
      uploadSetOrientation(itemId, isVertical);
    }
  };

  renderFlashMessages = () => {
    const { uploadInfo: { flashMessages } } = this.props;

    return flashMessages.map(
      (message, index) => <FlashMessage {...message} key={`${String(index)}_${Date()}`} />
    );
  };

  renderAdditionalParameters() {
    const { selectedAdditionalParameters } = this.state;
    const { uploadInfo: { additionalOptions: { availableAdditionalOptionList, selectedAdditionalOptions } } } = this.props;
    const isComplete = !!selectedAdditionalParameters;
    return (
      <FunnelBlock
        order="1"
        isComplete={isComplete}
        header={[
          <span key="source-block-title">Configurações adicionais</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AdditionalUploadOptions
          options={availableAdditionalOptionList}
          defaultValues={selectedAdditionalOptions}
          handleOptionsChanged={this.handleAdditionalParameters}
        />
      </FunnelBlock>
    );
  }

  renderUploadTypeSchemes() {
    const { selectedStrategy, selectedAdditionalParameters } = this.state;
    const { uploadInfo: { availableStrategies, flashMessages }, screenSize } = this.props;
    const showStep = !!selectedAdditionalParameters;
    return (
      showStep &&
      <FunnelBlock
        order="2"
        isComplete={selectedStrategy !== 0}
        header={[
          <span key="source-block-title">Como você quer enviar sua arte?</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <AvailableUploadStrategies
          availableStrategies={availableStrategies}
          handleSelectedStrategy={this.handleSelectedStrategy}
          showMessage={!(isMobile(screenSize) || selectedStrategy > 1) && flashMessages[0]}
          message={flashMessages[0] && flashMessages[0].content}
        />
      </FunnelBlock>
    );
  }

  renderFileUploadBlock() {
    const { selectedStrategy, uploadedFiles, fileFormats, documentReferenceId } = this.state;
    const { uploadInfo: { globalFlags: { upload_type }, cimpressInfo, flashMessages }, screenSize } = this.props;
    const showStep = selectedStrategy > 1;
    const isComplete = (selectedStrategy === 4 && uploadedFiles.length === 2)
      || uploadedFiles.length > 0
      || !!documentReferenceId;
    return (
      showStep &&
      <FunnelBlock
        order="3"
        isComplete={isComplete}
        header={[
          <span key="source-block-title">Enviar arquivo da arte</span>,
          <MoreInfo key="source-block-more-info" text="Mais informações" />,
        ]}
      >
        <UploadTypes
          uploadType={upload_type}
          cimpressInfo={cimpressInfo}
          selectedStrategy={selectedStrategy}
          fileFormats={fileFormats}
          handleCanvasFinalize={this.handleCanvasFinalize}
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          handleOrientationChanged={this.handleOrientationChanged}
          showMessage={!(isMobile(screenSize) || isComplete) && flashMessages[0]}
          message={flashMessages[0] && flashMessages[0].content}
        />
      </FunnelBlock>
    );
  }

  renderCartItemDefinitions() {
    const { selectedAdditionalParameters } = this.state;
    const { uploadInfo: { cartItemDefinitions: { parts, total_price, expected_delivery_date } }, screenSize } = this.props;
    return (<CartItemDefinitionsPanel
      parts={parts}
      subTotal={total_price}
      commission={0.18}
      expectedDeliveryDate={expected_delivery_date}
      isMobile={isMobile(screenSize)}
      additionalOptions={selectedAdditionalParameters}
    />);
  }

  render() {
    const { isLoading, screenSize } = this.props;
    const { isRepurchase, canSubmit } = this.state;
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
          { isMobile(screenSize) &&
            <p className="description">Vestibulum id ligula porta felis euismod semper. Donec sed odio dui.</p>
          }
          {this.renderFlashMessages()}
          <section className="content">
            <section className="main-upload-container">
              {
                this.renderAdditionalParameters()
              }
              {
                this.renderUploadTypeSchemes()
              }
              {
                this.renderFileUploadBlock()
              }
              <section className="upload-finish-block">
                <label>
                  <CheckBox
                    checked={isRepurchase}
                    onChange={this.handleChoose}
                  />
                  Concordo que a arte enviada é de minha responsabilidade. Não haverá revisão ortográfica ou qualquer
                  outro ajuste.
                </label>
                <section className={`buttons-block ${isMobile(screenSize) ? 'mobile' : ''}`} >
                  <Button
                    onClick={this.handleUploadFinish}
                    kind="cancel"
                  >ENVIAR MAIS TARDE</Button>
                  <Button
                    onClick={this.handleUploadFinish}
                    kind="success"
                    disabled={!canSubmit}
                  >Enviar arte final</Button>
                </section>
              </section>
            </section>
            { this.renderCartItemDefinitions()}
          </section>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.app.screenSize,
  isLoading: state.upload.isLoaded,
  uploadInfo: state.upload.object,
  uploadFileProgress: state.upload.uploadFile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  uploadInfoFetch: (slug, itemId) => dispatch(uploadFetch(slug, itemId)),
  uploadSetOrientation: (itemId, isVertical) => dispatch(uploadSetOrientationRequest(itemId, isVertical)),
  uploadFinish: (data, itemId) => dispatch(uploadFinishRequest(data, itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

