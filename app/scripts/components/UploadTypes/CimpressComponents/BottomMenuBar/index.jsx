// @flow

import React from 'react';
import { EyeEmptyIcon } from 'components/Icons';

type Props = {
  handleSave: (data) => void
}

const BottomMenuBar = ({ handleSave }: Props) => {
  const saveTemplate = () => {
    global.designer.preview.getPreview({
      size: {
        width: 300,
        height: 300,
      },
    }).then(
      (thumbResponse) => {
        console.log('### thumbnail: ###');
        console.log(thumbResponse);
        global.designer.saveDocumentToUds().then(
          (templateResponse) => {
            console.log('### document_reference_url: ###');
            console.log(templateResponse.documentReferenceUrl);
            handleSave(templateResponse.documentReferenceUrl);
          },
          console.error
        );
      },
      console.error
    );
  };

  return (
    <div className="upload__canvas-schema__bottom-menu-bar">
      <button className="dcl-widget-preview-document">
        <i className="eye_icon">
          <EyeEmptyIcon />
        </i>
      </button>
      <button className="bottom-menu-bar_btn bottom-menu-bar_btn-finish" onClick={saveTemplate}>
        Finalizar arte
      </button>
    </div>
  );
};

export default BottomMenuBar;
