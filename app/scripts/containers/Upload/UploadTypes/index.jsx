// @flow
import React from 'react';
import CanvasSchema from 'components/CimpressEditor/index';
import NormalUploadType from './NormalUploadType';

type Props = {
  uploadType: string,
  selectedStrategy: number,
  cimpressInfo: {},
  fileFormats: [],
  locale: {},
  handleFiles: (files: { title: string, previews: []}) => void,
  handleOrientationChanged: (isVertical: number) => void,
}

const UploadTypes = ({ uploadType,
                       selectedStrategy,
                       handleFiles,
                       handleOrientationChanged,
                       cimpressInfo,
                       locale,
                       fileFormats,
                     }: Props) => {
  const renderType = () => {
    switch (uploadType) {
      case 'canvas':
        return (
          <CanvasSchema
            isSku={false}
            hideSubmitButton={true}
            locale={locale}
            handleOrientationChanged={handleOrientationChanged}
            cimpressInfo={cimpressInfo}
          />);
      case 'sku_scene':
        return (
          <CanvasSchema
            isSku={true}
            hideSubmitButton={true}
            locale={locale}
            handleOrientationChanged={handleOrientationChanged}
            cimpressInfo={cimpressInfo}
          />);
      default:
        return (
          <NormalUploadType
            fileFormats={fileFormats}
            locale={locale}
            uploadTwoFiles={selectedStrategy === 4}
            multipleFiles={selectedStrategy === 5}
            handleFiles={handleFiles}
          />);
    }
  };

  return (<section className="upload-type-schemes-container">
    {
      renderType()
    }
  </section>);
};

export default UploadTypes;
