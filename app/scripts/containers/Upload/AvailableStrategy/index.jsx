// @flow

import React from 'react';
import { UploadSendLaterIcon, UploadUniqueFileIcon, UploadMultipleFilesIcon } from 'components/Icons';

type Props = {
  strategy: number,
  totalStrategies: number,
};

const AvailableStrategy = (props: Props) => {
  const classGrid = (
    () => {
      switch (props.totalStrategies) {
        case 2:
          return 'two';
        case 3:
          return 'three';
        case 4:
          return 'four';
        case 5:
          return 'five';
        default:
          return 'five';
      }
    }
  )();

  const properties = (
    () => {
      switch (props.strategy) {
        case 1:
          return {
            icon: [
              <UploadSendLaterIcon key="upload-send-later-icon" />,
            ],
            title: 'Enviar arte mais tarde',
            description: 'Você pode concluir seu pedido e enviar a arte mais tarde',
          };
        case 2:
          return {
            icon: [
              <UploadUniqueFileIcon key="upload-unique-file-icon" />,
              <span key="upload-pdf">PDF</span>,
            ],
            title: 'Enviar arte agora',
            description: 'Enviar as artes da frente e do verso em um único arquivo',
          };
        case 3:
          return {
            icon: [
              <UploadUniqueFileIcon key="upload-unique-file-icon" />,
              <span key="upload-pdf">PDF</span>,
            ],
            title: 'Enviar arte agora',
            description: 'Enviar as artes da frente e do verso em um único arquivo',
          };
        case 4:
          return {
            icon: [
              <div className="splitIcon splitIcon-left" key="splitIcon-left">
                <UploadUniqueFileIcon />
                <span key="upload-frente">Frente</span>
              </div>,
              <div className="splitIcon splitIcon-right" key="splitIcon-right">
                <UploadUniqueFileIcon />
                <span key="upload-verso">Verso</span>
              </div>,
            ],
            title: 'Dois arquivos',
            description: 'Enviar um arquivo com a arte da frente e outro com o verso',
          };
        case 5:
          return {
            icon: [
              <UploadMultipleFilesIcon key="upload-multiple-file-icon" />,
              <span key="upload-pdf">PDF</span>,
            ],
            title: 'Multiplos arquivos',
            description: 'Enviar arte em multiplos arquivos',
          };
        default:
          return {
            icon: [
              <UploadMultipleFilesIcon key="upload-multiple-file-icon" />,
              <span key="upload-pdf">PDF</span>,
            ],
            title: 'Multiplos arquivos',
            description: 'Enviar arte em multiplos arquivos',
          };
      }
    }
  )();

  return (
    <div className={`upload__availableStrategies_container upload__availableStrategies_container-${classGrid}`}>
      <label className="upload__availableStrategy-label">
        <div className="upload__availableStrategy-image">
          {properties.icon}
        </div>
        <p>{properties.title}</p>
      </label>
      <p className="upload__availableStrategy-description">{properties.description}</p>
    </div>
  );
};

export default AvailableStrategy;
