// @flow
import React from 'react';
import NormalUploadType from './NormalUploadType';
import CanvasSchema from './Canvas';
import SkuSceneSchema from './SkuScene';

type Props = {
  uploadType: string,
  selectedStrategy: number,
  handleUploadFile: (file: {title: string, preview: {}}) => void,
  handleRemoveFile: (file: {title: string, preview: {}}) => void,
}

const UploadTypes = ({ uploadType, selectedStrategy, handleUploadFile, handleRemoveFile }: Props) => {
  switch (uploadType) {
    case 'canvas':
      return <CanvasSchema />;
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
