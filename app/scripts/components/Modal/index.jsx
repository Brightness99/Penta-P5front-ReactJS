// @flow

import React from 'react';
import cx from 'classnames';
import Overlay from 'components/Overlay';

type Props = {
  onClose: () => {},
  className: string,

};

const Modal = (props: Props) => {
  const handleClose = () => {
    const { onClose } = props;

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div
      className={cx('app__modal', props.className)}
    >
      <Overlay onClick={handleClose} />
    </div>
  );
};

export default Modal;
