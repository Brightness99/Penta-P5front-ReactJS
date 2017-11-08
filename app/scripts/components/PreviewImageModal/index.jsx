// @flow
import React from 'react';
import Overlay from 'components/Overlay';
import TimesIcon from 'components/Icons/Times';

type Props = {
  children: {},
  handleClose: () => void,
}

const PreviewImageModal = ({ children, handleClose }: Props) => (
  <section className="preview-image-modal-container">
    <Overlay onClick={handleClose} />
    <a href="#close" className="close-button" onClick={handleClose}>
      <TimesIcon />
    </a>
    <section className="preview-image-modal">
      <section className="preview-image-content">
        {children}
      </section>
    </section>
  </section>
);

export default PreviewImageModal;
