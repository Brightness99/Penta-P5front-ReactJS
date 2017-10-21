// @flow

import React from 'react';
import config from 'config';
import TrashIcon from 'components/Icons/Trash';

type Props = {
  preview: {
    originalName: string,
    pages: {}
  },
  handleRemoveFile: () => void
}

const PreviewUploadedFile = ({ preview: { originalName, pages }, handleRemoveFile }: Props) => {
  const { apiUrl } = config;
  const mappedPages = Object.keys(pages).map(x => pages[x]);

  return (
    <section className="upload-file-preview-container">
      <section className="preview-header">
        <h4>{originalName}</h4>
      </section>
      <section className="preview-content">
        <section className="preview-images-container">
          <section className="preview-item" key={mappedPages[0].preview_small}><img
            src={`${apiUrl + mappedPages[0].preview_small}`} alt="preview"
          /></section>
          <section className="preview-item" key={mappedPages[1].preview_small}><img
            src={`${apiUrl + mappedPages[1].preview_small}`} alt="preview"
          /></section>
        </section>
        <section className="preview-footer">
          <button className="remove-button" onClick={handleRemoveFile}><TrashIcon />Excluir arquivo</button>
        </section>
      </section>
    </section>
  );
};

export default PreviewUploadedFile;
