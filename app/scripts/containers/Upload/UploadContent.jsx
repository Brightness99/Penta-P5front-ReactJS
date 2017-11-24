// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { CheckBox } from 'components/Input';
import { PageTitle } from 'atoms/Titles';
import { FunnelBlock } from 'components/Funnel';
import FlashMessage from 'components/FlashMessage';
import MoreInfo from 'components/MoreInfo';
import Loading from 'components/Loading';
import TooltipEnhancer from 'components/TooltipEnhancer';
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
    const { selectedStrategy, uploadedFiles, isRepurchase } = this.state;
    const { uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const normalFunnelValidation = (selectedStrategy === 1 || (selectedStrategy === 4 && uploadedFiles.length === 2) || uploadedFiles.length > 0);
    const canSubmit = ((upload_type === 'normal' && normalFunnelValidation)
      || (upload_type !== 'normal' && selectedStrategy > 0))
                      && isRepurchase;

    this.setState({ canSubmit });
  };

  getSubmitButtonTooltip() {
    const { locale, uploadInfo: { globalFlags: { upload_type } } } = this.props;
    const { selectedStrategy, uploadedFiles, isRepurchase } = this.state;

    if ((upload_type === 'normal' && uploadedFiles.length === 0) || selectedStrategy === 0) {
      return locale.page.upload.box_upload.UPLOAD_MISSING;
    }
    if (!isRepurchase) {
      return locale.page.upload.box_upload.TERMS_MISSING;
    }
    return '';
  }

  handleRepurchaseChoose = () => {
    const { isRepurchase } = this.state;
    this.setState({
      isRepurchase: !isRepurchase,
    }, this.updateCanSubmit);
  };

  handleUploadFile = (files: { title: string, previews: []}) => {
    const uploadedFiles = this.state.uploadedFiles.filter(x => x.title !== files.title);
    if (files.previews.length > 0) {
      this.setState({
        uploadedFiles: [...uploadedFiles, files],
      }, this.updateCanSubmit);
    }
  };

  handleAdditionalParameters = (parameters) => {
    let fileFormats;
    if (parameters.file_format.id === 'ppdf') {
      fileFormats = ['.pdf'];
    } else {
      fileFormats = ['.pdf', '.ai', '.indd', '.psd', '.cdr', '.jpg', '.jpeg'];
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
    const { uploadedFiles, isRepurchase, selectedStrategy, selectedAdditionalParameters } = this.state;
    const uploads = {};
    uploadedFiles.forEach((x) => {
      x.previews.forEach(y => {
        uploads[y.basename] = y;
      });
    });
    const result = {
      cimpress_sku_scene: null,
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
        cimpress.saveTemplate().then((x) => {
          uploadFinish({ ...result, document_reference_url: x.documentReferenceUrl });
        });
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
    const { selectedStrategy, uploadedFiles, fileFormats } = this.state;
    const { uploadInfo: { globalFlags: { upload_type }, cimpressInfo }, locale } = this.props;
    const showStep = selectedStrategy > 1;
    const isComplete = (selectedStrategy === 4 && uploadedFiles.length === 2)
      || uploadedFiles.length > 0
      || upload_type !== 'normal';
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
          handleFiles={this.handleUploadFile}
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
    const { isRepurchase } = this.state;
    return (
      <label key={'upload-terms'}>
        <CheckBox
          checked={isRepurchase}
          onChange={this.handleRepurchaseChoose}
        />
        {
        upload_type === 'normal' ?
          locale.page.upload.box_upload.UPLOAD_TERMS : locale.page.upload.cimpress_designer.AGREE_WITH_TERMS
      }
      </label>
    );
  }

  renderButtonsBlock() {
    const { isFinishInProgress, locale } = this.props;
    const { canSubmit } = this.state;

    const EnhancedSubmitButton = TooltipEnhancer(!canSubmit)(() =>
      <Button
        onClick={this.handleUploadFinish}
        kind="success"
        isLoading={isFinishInProgress}
        disabled={!canSubmit}
      >{locale.page.upload.box_upload.SEND_FILES}</Button>
    );
    return (<section className="upload-finish-block">
      {
        this.renderTerms()
      }
      <EnhancedSubmitButton
        keyProp={'submit-button-tooltip'}
        text={this.getSubmitButtonTooltip()}
      />
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
        <section className="container">
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
        </section>
      </section>
    );
  }
}
