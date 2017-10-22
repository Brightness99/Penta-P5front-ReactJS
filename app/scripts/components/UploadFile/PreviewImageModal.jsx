// @flow
import React from 'react';
import TimesIcon from 'components/Icons/Times';

type Props = {
  children: {},
  handleClose: () => void,
}

const PreviewImageModal = ({ children, handleClose }: Props) => (
  <section className="preview-image-modal" onClick={handleClose}>
    <TimesIcon />
    <section className="preview-image-content">
      {children}
    </section>
  </section>
    );

export default PreviewImageModal;
