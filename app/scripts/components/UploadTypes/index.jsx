// @flow
import React from 'react';
import NormalUploadType from './NormalUploadType';
import CanvasSchema from './Canvas';

type Props = {
  uploadType: string,
  selectedStrategy: number,
  handleCanvasFinalize: (docRef: string) => void,
  cimpressInfo: {},
  fileFormats: [],
  handleUploadFile: (file: { title: string, preview: {} }) => void,
  handleRemoveFile: (file: { title: string, preview: {} }) => void,
}

const UploadTypes = ({ uploadType,
                       selectedStrategy,
                       handleUploadFile,
                       handleRemoveFile,
                       handleCanvasFinalize,
                       cimpressInfo,
                       fileFormats }: Props) => {
  switch (uploadType) {
    case 'canvas':
      return (<CanvasSchema
        handleCanvasFinalize={handleCanvasFinalize}
        cimpressInfo={cimpressInfo}
      />);
    case 'sku_scene':
      return (<CanvasSchema
        isSku={true}
        handleCanvasFinalize={handleCanvasFinalize}
        cimpressInfo={cimpressInfo}
      />);
    default:
      return (
        <NormalUploadType
          fileFormats={fileFormats}
          uploadTwoFiles={selectedStrategy === 4}
          multipleFiles={selectedStrategy === 5}
          handleUploadFile={handleUploadFile}
          handleRemoveFile={handleRemoveFile}
        />);
  }
};

export default UploadTypes;
