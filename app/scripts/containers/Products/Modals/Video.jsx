// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import Modal from 'components/Modal';

type Props = {
  video: {},
  onClose: () => {},
};

type State = {
  height: number,
  width: number,
};

export default class VideoModal extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleClose = (ev) => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose(ev);
    }
  };

  render() {
    const { video } = this.props;

    return (
      <Modal
        handleCloseModal={this.handleClose}
      >
        <div className="responsive-video widescreen" dangerouslySetInnerHTML={{ __html: video.html }} />
      </Modal>
    );
  }
}
