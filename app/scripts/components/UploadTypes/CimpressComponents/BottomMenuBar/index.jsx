// @flow
import React from 'react';
import { EyeEmptyIcon } from 'components/Icons';

type Props = {
  handleSave: (data) => void,
  handleSaveError: (data) => void,
  handlePreview: (urls: Array<string>) => void,
  handleReturnToEditor: () => void,
  hasCutPreview: boolean,
  isPreview: boolean,
}

const BottomMenuBar = ({ handleSave,
                         handleSaveError,
                         hasCutPreview,
                         handlePreview,
                         isPreview,
                         handleReturnToEditor }: Props) => {
  const saveTemplate = () => {
    global.designer.saveDocumentToUds().then(
      (templateResponse) => handleSave(templateResponse.documentReferenceUrl),
      handleSaveError
    );
  };

  const previewTemplate = () => {
    const preview1 = {
      size: {
        width: 210,
      },
      page: 1,
    };
    const preview2 = {
      size: {
        width: 210,
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

  const renderPreviewButton = () => (hasCutPreview ?
    <button className="canvas-schema__preview-button" onClick={previewTemplate}>
      <EyeEmptyIcon className="" />
      <span className="description">Visualizar</span>
    </button>
        : <section className="dcl-widget-preview-document" />
    );

  return (
    <div className="upload__canvas-schema__bottom-menu-bar">
      { !isPreview && renderPreviewButton() }
      { isPreview &&
        <button className="canvas-schema__preview-button" onClick={handleReturnToEditor}>
          <span className="description">Voltar e editar</span>
        </button>
      }
      <button className="bottom-menu-bar_btn bottom-menu-bar_btn-finish" onClick={saveTemplate}>
        Finalizar arte
      </button>
    </div>
  );
};

export default BottomMenuBar;
