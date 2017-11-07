// @flow
import React from 'react';
import { EyeEmptyIcon } from 'components/Icons';

type Props = {
  handleSave: (data) => void,
  handleSaveError: (data) => void,
  handlePreview: () => void,
  hasCutPreview: boolean,
}

const BottomMenuBar = ({ handleSave, handleSaveError, hasCutPreview, handlePreview }: Props) => {
  const saveTemplate = () => {
    global.designer.saveDocumentToUds().then(
      (templateResponse) => handleSave(templateResponse.documentReferenceUrl),
      handleSaveError
    );
  };

  return (
    <div className="upload__canvas-schema__bottom-menu-bar">
      {
        hasCutPreview ?
          <button className="canvas-schema__preview-button" onClick={handlePreview}>
            <EyeEmptyIcon className="" />
            <span className="description">Visualizar</span>
          </button>
          : <section className="dcl-widget-preview-document" />
      }
      <button className="bottom-menu-bar_btn bottom-menu-bar_btn-finish" onClick={saveTemplate}>
        Finalizar arte
      </button>
    </div>
  );
};

export default BottomMenuBar;
