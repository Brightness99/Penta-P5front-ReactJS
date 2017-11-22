// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { EyeEmptyIcon } from 'components/Icons';
import { CheckBox } from 'components/Input';
import { Button } from 'quarks/Inputs';
import cimpress from 'vendor/cimpress';

type Props = {
  handleSave: (data) => void,
  handleSaveError: (data) => void,
  handlePreview: (urls: Array<string>) => void,
  handleReturnToEditor: () => void,
  hasCutPreview: boolean,
  isPreview: boolean,
  locale: {}
}

type State = {
  isAgree: boolean,
}

export default class BottomMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAgree: false,
    };
  }
  props: Props;
  state: State;

  saveTemplate = () => {
    const { handleSave, handleSaveError } = this.props;
    cimpress.saveTemplate().then(
      (templateResponse) => handleSave(templateResponse.documentReferenceUrl),
      handleSaveError
    );
  };

  previewTemplate = () => {
    const { handlePreview } = this.props;
    cimpress.getPreview().then(
      (urls) => {
        handlePreview(urls);
      }
    );
  };

  handleChoose = () => {
    this.setState({
      isAgree: !this.state.isAgree,
    });
  };

  renderPreviewButton = (hasCutPreview, locale) => (hasCutPreview ?
    <button className="canvas-schema__preview-button" onClick={this.previewTemplate}>
      <EyeEmptyIcon className="" />
      <span className="description">{locale.page.upload.cimpress_designer.PREVIEW}</span>
    </button>
      : <section className="dcl-widget-preview-document" />
  );

  render() {
    const { hasCutPreview, isPreview, handleReturnToEditor, locale } = this.props;
    const { isAgree } = this.state;
    return (
      <div className="upload__canvas-schema__bottom-menu-bar">
        <label>
          <CheckBox
            checked={isAgree}
            onChange={this.handleChoose}
          />
          <span>Revisei e aprovo minha arte. <Link to="#">Ler mais.</Link></span>
        </label>
        <section className="buttons-block">
          { !isPreview && this.renderPreviewButton(hasCutPreview, locale) }
          { isPreview &&
          <button className="canvas-schema__preview-button" onClick={handleReturnToEditor}>
            <span className="description">Voltar e editar</span>
          </button>
          }
          <Button
            onClick={this.saveTemplate}
            kind="success"
            disabled={!isAgree}
          >Finalizar arte</Button>
        </section>
      </div>
    );
  }
}
