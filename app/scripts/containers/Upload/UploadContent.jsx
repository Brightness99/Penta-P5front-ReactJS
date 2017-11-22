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
import cimpress from 'vendor/cimpress';
import AdditionalUploadOptions from './AdditionalUploadOptions';
import AvailableUploadStrategies from './AvailableUploadStrategies';
import UploadTypes from './UploadTypes';
import CartItemDefinitionsPanel from './CartItemDefinitionsPanel';

type Props = {
  isLoading: boolean,
  isAccount: boolean,
  isFinishInProgress: boolean,
  uploadInfo: {},
  locale: {},
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
  isAgree: boolean,
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
      isAgree: false,
      canSubmit: false,
    };
  }

  props: Props;
  state: State;

  updateCanSubmit = () => {
    const { selectedStrategy, uploadedFiles, isAgree } = this.state;
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const normalFunnelValidation = (selectedStrategy === 1 || (selectedStrategy === 4 && uploadedFiles.length === 2) || uploadedFiles.length > 0);
    const canSubmit = (upload_type === 'normal' && normalFunnelValidation) || (upload_type !== 'normal' && selectedStrategy > 0 && isAgree);

    this.setState({ canSubmit });
  };

  handleRepurchaseChoose = () => {
    const { isRepurchase } = this.state;
    this.setState({
      isRepurchase: !isRepurchase,
    });
  };

  handleAgreeChoose = () => {
    const { isAgree } = this.state;
    this.setState({
      isAgree: !isAgree,
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
      if (upload_type === 'normal') {
        uploadFinish(result);
      } else {
        cimpress.saveTemplate().then(() => uploadFinish(result));
      }
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
    const {
      uploadInfo: {
        additionalOptions: {
          availableAdditionalOptionList, selectedAdditionalOptions,
        },
      },
      locale,
    } = this.props;

    const isComplete = !!selectedAdditionalParameters;
    return (
      <FunnelBlock
        order={order}
        key={order}
        isComplete={isComplete}
        header={[
          <span key="source-block-title">{locale.page.upload.box_additional_options.TITLE}</span>,
          <MoreInfo key="source-block-more-info" text={locale.page.upload.box_additional_options.MORE_INFO_TEXT} />,
        ]}
      >
        <AdditionalUploadOptions
          locale={locale}
          options={availableAdditionalOptionList}
          defaultValues={selectedAdditionalOptions}
          handleOptionsChanged={this.handleAdditionalParameters}
        />
      </FunnelBlock>
    );
  };

  renderUploadTypeSchemes = (order: number) => {
    const { selectedStrategy, selectedAdditionalParameters } = this.state;
    const { uploadInfo: { availableStrategies }, locale } = this.props;
    const showStep = !!selectedAdditionalParameters || order === 1;
    return (
      showStep &&
      <FunnelBlock
        order={order}
        key={order}
        isComplete={selectedStrategy !== 0}
        header={[
          <span key="source-block-title">{locale.page.upload.box_strategy.TITLE}</span>,
          <MoreInfo key="source-block-more-info" text={locale.page.upload.box_strategy.MORE_INFO_TEXT} />,
        ]}
      >
        <AvailableUploadStrategies
          availableStrategies={availableStrategies}
          locale={locale}
          handleSelectedStrategy={this.handleSelectedStrategy}
        />
      </FunnelBlock>
    );
  };

  renderFileUploadBlock = (order: number) => {
    const { selectedStrategy, uploadedFiles, fileFormats, documentReferenceId } = this.state;
    const { uploadInfo: { globalFlags: { upload_type }, cimpressInfo }, locale } = this.props;
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
          <span key="source-block-title">{locale.page.upload.box_upload.TITLE}</span>,
          <MoreInfo key="source-block-more-info" text={locale.page.upload.box_upload.MORE_INFO_TEXT} />,
        ]}
      >
        <UploadTypes
          uploadType={upload_type}
          cimpressInfo={cimpressInfo}
          selectedStrategy={selectedStrategy}
          fileFormats={fileFormats}
          locale={locale}
          handleCanvasFinalize={this.handleCanvasFinalize}
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          handleOrientationChanged={this.handleOrientationChanged}
        />
      </FunnelBlock>
    );
  };

  renderCartItemDefinitions() {
    const { selectedAdditionalParameters } = this.state;
    const { uploadInfo: { cartItemDefinitions: { parts, total_price, expected_delivery_date } }, locale } = this.props;

    return (<CartItemDefinitionsPanel
      locale={locale}
      parts={parts}
      subTotal={total_price}
      expectedDeliveryDate={expected_delivery_date}
      additionalOptions={selectedAdditionalParameters}
    />);
  }

  renderTerms() {
    const { locale, uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const { isRepurchase, isAgree } = this.state;
    if (upload_type === 'normal') {
      return (<label key={'upload-terms'}>
        <CheckBox
          checked={isRepurchase}
          onChange={this.handleRepurchaseChoose}
        />
        {locale.page.upload.box_upload.UPLOAD_TERMS}
      </label>);
    }

    return [
      <label key={'upload-terms'}>
        <CheckBox
          checked={isRepurchase}
          onChange={this.handleRepurchaseChoose}
        />
        {locale.page.upload.cimpress_designer.AGREE_WITH_TERMS}
      </label>,
      <label key={'must-agree-terms'}>
        <CheckBox
          checked={isAgree}
          onChange={this.handleAgreeChoose}
        />
        <span>{locale.page.upload.cimpress_designer.MUST_AGREE_WITH_TERMS} </span>
      </label>];
  }

  renderButtonsBlock() {
    const { isFinishInProgress, locale } = this.props;
    const { canSubmit } = this.state;

    return (<section className="upload-finish-block">
      {
        this.renderTerms()
      }
      <Button
        onClick={this.handleUploadFinish}
        kind="success"
        isLoading={isFinishInProgress}
        disabled={!canSubmit}
      >{locale.page.upload.box_upload.SEND_FILES}</Button>
    </section>);
  }

  render() {
    const { isLoading, breadcrumb, isAccount, locale } = this.props;

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
          <PageTitle>{locale.page.upload.TITLE}</PageTitle>
          {this.renderFlashMessages()}
          <section className="main-upload-container">
            {
                funnels.map((x, i) => x(i + 1))
            }
            {
              this.renderButtonsBlock()
            }
          </section>
          { this.renderCartItemDefinitions()}
        </div>
      </section>
    );
  }
}
