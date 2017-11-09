// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { EyeEmptyIcon } from 'components/Icons';
import { CheckBox } from 'components/Input';
import { Button } from 'quarks/Inputs';

type Props = {
  handleSave: (data) => void,
  handleSaveError: (data) => void,
  handlePreview: (urls: Array<string>) => void,
  handleReturnToEditor: () => void,
  hasCutPreview: boolean,
  isPreview: boolean,
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
    global.designer.saveDocumentToUds().then(
      (templateResponse) => handleSave(templateResponse.documentReferenceUrl),
      handleSaveError
    );
  };

  previewTemplate = () => {
    const { handlePreview } = this.props;
    const preview1 = {
      size: {
        width: 500,
      },
      page: 1,
    };
    const preview2 = {
      size: {
        width: 500,
      },
      page: 2,
    };

    Promise.all([
      global.designer.preview.getPreview(preview1),
      global.designer.preview.getPreview(preview2),
    ]).then(
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

  renderPreviewButton = (hasCutPreview) => (hasCutPreview ?
    <button className="canvas-schema__preview-button" onClick={this.previewTemplate}>
      <EyeEmptyIcon className="" />
      <span className="description">Visualizar</span>
    </button>
      : <section className="dcl-widget-preview-document" />
  );

  render() {
    const { hasCutPreview, isPreview, handleReturnToEditor } = this.props;
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
          { !isPreview && this.renderPreviewButton(hasCutPreview) }
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
