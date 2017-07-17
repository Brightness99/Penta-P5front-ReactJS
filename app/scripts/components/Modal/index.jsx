// @flow

import React from 'react';
import cx from 'classnames';
import Overlay from 'components/Overlay';

type Props = {
  className: string,
  children: any,
  onClose: () => {},
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
      <div className="app__modal__container">
        <button onClick={handleClose}>X</button>
        <div className="app__modal__body">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
