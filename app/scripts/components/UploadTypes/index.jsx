// @flow
import React from 'react';
import UploadExtraInformationPanel from 'components/UploadExtraInformationPanel';
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
  message: string,
  showMessage: boolean,
}

const UploadTypes = ({ uploadType,
                       selectedStrategy,
                       handleUploadFile,
                       handleRemoveFile,
                       handleCanvasFinalize,
                       cimpressInfo,
                       fileFormats,
                       message,
                       showMessage,
                     }: Props) => {
  const renderType = () => {
    switch (uploadType) {
      case 'canvas':
        return (<CanvasSchema
          isSku={false}
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
