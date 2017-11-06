// @flow
import React from 'react';

type Props = {
  handleSave: (data) => void,
  handleSaveError: (data) => void,
}

const BottomMenuBar = ({ handleSave, handleSaveError }: Props) => {
  const saveTemplate = () => {
    global.designer.saveDocumentToUds().then(
      (templateResponse) => handleSave(templateResponse.documentReferenceUrl),
      handleSaveError
    );
  };

  return (
    <div className="upload__canvas-schema__bottom-menu-bar">
      <section className="dcl-widget-preview-document" />
      <button className="bottom-menu-bar_btn bottom-menu-bar_btn-finish" onClick={saveTemplate}>
        Finalizar arte
      </button>
    </div>
  );
};

export default BottomMenuBar;
