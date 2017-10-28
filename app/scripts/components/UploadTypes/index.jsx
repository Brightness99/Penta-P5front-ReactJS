// @flow
import React from 'react';
import NormalUploadType from './NormalUploadType';
import CanvasSchema from './Canvas';
import SkuSceneSchema from './SkuScene';

type Props = {
  uploadType: string,
  selectedStrategy: number,
  handleCanvasFinalize: (docRef: string) => void,
  handleUploadFile: (file: {title: string, preview: {}}) => void,
  handleRemoveFile: (file: {title: string, preview: {}}) => void,
}

const UploadTypes = ({ uploadType, selectedStrategy, handleUploadFile, handleRemoveFile, handleCanvasFinalize }: Props) => {
  switch (uploadType) {
    case 'canvas':
      return <CanvasSchema handleCanvasFinalize={handleCanvasFinalize} />;
    case 'sku_scene':
      return <SkuSceneSchema />;
    default:
      return (
        <NormalUploadType
          uploadTwoFiles={selectedStrategy === 4}
          multipleFiles={selectedStrategy === 5}
          handleUploadFile={handleUploadFile}
          handleRemoveFile={handleRemoveFile}
        />);
  }
};

export default UploadTypes;
