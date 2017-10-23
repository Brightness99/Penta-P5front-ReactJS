// @flow
import React from 'react';
import TimesIcon from 'components/Icons/Times';

type Props = {
  children: {},
  handleClose: () => void,
}

const PreviewImageModal = ({ children, handleClose }: Props) => (
  <section className="preview-image-modal">
    <a href="#close" onClick={handleClose}>
      <TimesIcon />
    </a>
    <section className="preview-image-content">
      {children}
    </section>
  </section>
);

export default PreviewImageModal;
