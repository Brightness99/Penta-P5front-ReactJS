// @flow
import React from 'react';
import CanvasSchema from 'components/CimpressEditor/index';
import NormalUploadType from './NormalUploadType';
import UploadExtraInformationPanel from '../UploadExtraInformationPanel';

type Props = {
  uploadType: string,
  selectedStrategy: number,
  handleCanvasFinalize: (docRef: string) => void,
  cimpressInfo: {},
  fileFormats: [],
  handleUploadFile: (file: { title: string, preview: {} }) => void,
  handleRemoveFile: (file: { title: string, preview: {} }) => void,
  handleOrientationChanged: (isVertical: number) => void,
  message: string,
  showMessage: boolean,
}

const UploadTypes = ({ uploadType,
                       selectedStrategy,
                       handleUploadFile,
                       handleRemoveFile,
                       handleCanvasFinalize,
                       handleOrientationChanged,
                       cimpressInfo,
                       fileFormats,
                       message,
                       showMessage,
                     }: Props) => {
  const renderType = () => {
    switch (uploadType) {
      case 'canvas':
        return (
          <CanvasSchema
            isSku={false}
            handleCanvasFinalize={handleCanvasFinalize}
            handleOrientationChanged={handleOrientationChanged}
            cimpressInfo={cimpressInfo}
          />);
      case 'sku_scene':
        return (
          <CanvasSchema
            isSku={true}
            handleCanvasFinalize={handleCanvasFinalize}
            handleOrientationChanged={handleOrientationChanged}
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

  return (<section className="upload-type-schemes-container">
    {
      renderType()
    }
    {
      showMessage && uploadType === 'normal'
      && <UploadExtraInformationPanel description={message} />
    }
  </section>);
};

export default UploadTypes;
