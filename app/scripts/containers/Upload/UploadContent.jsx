// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { CheckBox } from 'components/Input';
import { PageTitle } from 'atoms/Titles';
import { FunnelBlock } from 'components/Funnel';
import FlashMessage from 'components/FlashMessage';
import MoreInfo from 'components/MoreInfo';
import Loading from 'components/Loading';
import { Button } from 'quarks/Inputs';
import { isMobile } from 'utils/helpers';
import AdditionalUploadOptions from './AdditionalUploadOptions';
import AvailableUploadStrategies from './AvailableUploadStrategies';
import UploadTypes from './UploadTypes';
import CartItemDefinitionsPanel from './CartItemDefinitionsPanel';

type Props = {
  screenSize: string,
  isLoading: boolean,
  isAccount: boolean,
  isFinishInProgress: boolean,
  uploadInfo: {},
  handleOrientationChanged: (isVertical: number) => void,
  handleUploadFinish: (data: FinishUploadType) => void,
  breadcrumb: Array<{title: string, url: string}>,
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

export default class UploadContent extends React.Component {
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

  props: Props;
  state: State;

  updateCanSubmit = () => {
    const { selectedStrategy, uploadedFiles, documentReferenceId } = this.state;
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;
    let canSubmit;
    switch (upload_type) {
      case 'canvas':
        canSubmit = selectedStrategy === 1 || !!documentReferenceId;
        break;
      case 'sku_scene':
        canSubmit = selectedStrategy === 1 || !!documentReferenceId;
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
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const uploadFinish = this.props.handleUploadFinish;
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
      uploadFinish(result);
    }
  };

  handleOrientationChanged = (isVertical: number) => {
    const uploadSetOrientation = this.props.handleOrientationChanged;
    if (uploadSetOrientation && typeof uploadSetOrientation === 'function') {
      uploadSetOrientation(isVertical);
    }
  };

  renderFlashMessages = () => {
    const { uploadInfo: { flashMessages } } = this.props;

    return flashMessages.map(
      (message, index) => <FlashMessage {...message} key={`${String(index)}_${Date()}`} />
    );
  };

  renderAdditionalParameters = (order: number) => {
    const { selectedAdditionalParameters } = this.state;
    const { uploadInfo: { additionalOptions: { availableAdditionalOptionList, selectedAdditionalOptions } } } = this.props;
    const isComplete = !!selectedAdditionalParameters;
    return (
      <FunnelBlock
        order={order}
        key={order}
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
  };

  renderUploadTypeSchemes = (order: number) => {
    const { selectedStrategy, selectedAdditionalParameters } = this.state;
    const { uploadInfo: { availableStrategies, flashMessages }, screenSize } = this.props;
    const showStep = !!selectedAdditionalParameters || order === 1;
    return (
      showStep &&
      <FunnelBlock
        order={order}
        key={order}
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
  };

  renderFileUploadBlock = (order: number) => {
    const { selectedStrategy, uploadedFiles, fileFormats, documentReferenceId } = this.state;
    const { uploadInfo: { globalFlags: { upload_type }, cimpressInfo, flashMessages }, screenSize } = this.props;
    const showStep = selectedStrategy > 1;
    const isComplete = (selectedStrategy === 4 && uploadedFiles.length === 2)
      || uploadedFiles.length > 0
      || !!documentReferenceId;
    return (
      showStep &&
      <FunnelBlock
        order={order}
        key={order}
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
  };

  renderCartItemDefinitions() {
    const { selectedAdditionalParameters } = this.state;
    const { uploadInfo: { cartItemDefinitions: { parts, total_price, expected_delivery_date } } } = this.props;

    return (<CartItemDefinitionsPanel
      parts={parts}
      subTotal={total_price}
      expectedDeliveryDate={expected_delivery_date}
      additionalOptions={selectedAdditionalParameters}
    />);
  }

  render() {
    const { isLoading, screenSize, isFinishInProgress, breadcrumb, isAccount } = this.props;
    const { isRepurchase, canSubmit } = this.state;

    if (!isLoading) return <Loading />;

    let funnels;
    if (isAccount) {
      funnels = [this.renderUploadTypeSchemes, this.renderFileUploadBlock];
    } else {
      funnels = [this.renderAdditionalParameters, this.renderUploadTypeSchemes, this.renderFileUploadBlock];
    }
    return (
      <section className="page-upload">
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <PageTitle>envie sua arte final</PageTitle>
          { isMobile(screenSize) &&
          <p className="description">Vestibulum id ligula porta felis euismod semper. Donec sed odio dui.</p>
          }
          {this.renderFlashMessages()}
          <section className="main-upload-container">
            {
                funnels.map((x, i) => x(i + 1))
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
                  kind="cancel"
                >ENVIAR MAIS TARDE</Button>
                <Button
                  onClick={this.handleUploadFinish}
                  kind="success"
                  isLoading={isFinishInProgress}
                  disabled={!canSubmit}
                >Enviar arte final</Button>
              </section>
            </section>
          </section>
          { this.renderCartItemDefinitions()}
        </div>
      </section>
    );
  }
}
