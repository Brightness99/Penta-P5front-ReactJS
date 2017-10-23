// @flow

import React from 'react';
import { EyeEmptyIcon } from 'components/Icons';

const BottomMenuBar = () => {
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
          },
          console.error
        );
      },
      console.error
    );
  };

  return (
    <div className="upload__canvasSchema__bottomMenuBar">
      <button className="dcl-widget-preview-document">
        <i className="eye_icon">
          <EyeEmptyIcon />
        </i>
      </button>
      <button className="bottomMenuBar_btn bottomMenuBar_btn-finish" onClick={saveTemplate}>
        Finalizar arte
      </button>
    </div>
  );
};

export default BottomMenuBar;
