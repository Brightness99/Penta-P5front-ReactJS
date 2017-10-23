// @flow
import React from 'react';
import NormalUploadType from './NormalUploadType';
import CanvasSchema from './Canvas';
import SkuSceneSchema from './SkuScene';

type Props = {
  uploadType: string,
  selectedStrategy: number,
}

const UploadTypes = ({ uploadType, selectedStrategy }: Props) => {
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
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
        />);
  }
};

export default UploadTypes;
