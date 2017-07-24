// @flow

import React from 'react';
import cx from 'classnames';
import Overlay from 'components/Overlay';

import { TimesCircleIcon } from 'components/Icons';

type Props = {
  children?: any,
  closeOnEsc?: boolean,
  dimensions?: {},
  handleCloseModal: () => {},
  title?: string,
};

type State = {
  isReady: boolean,
  isMounted: boolean,
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isMounted: false,
    };
  }

  static defaultProps = {
    closeOnEsc: true,
    dimensions: {
      top: '50%',
      left: 0,
      right: 0,
      height: '2rem',
    },
  };

  componentDidMount() {
    const { closeOnEsc } = this.props;
    this.handleStatus();
    this.handleTransitionTimeout();
    this.modal.addEventListener('transitionend', this.handleTransition);
    document.body.classList.add('has-modal');

    if (closeOnEsc) {
      window.addEventListener('keyup', this.handleKeypress);
    }
  }

  componentWillUnmount() {
    const { closeOnEsc } = this.props;

    this.modal.removeEventListener('transitionend', this.handleTransition);
    document.body.classList.remove('has-modal');
    clearTimeout(this.timeout);

    if (closeOnEsc) {
      window.removeEventListener('keyup', this.handleKeypress);
    }
  }

  static props: Props;

  static state: State;

  closeModal = () => {
    const { handleCloseModal } = this.props;

    /* istanbul ignore else */
    if (typeof handleCloseModal === 'function') {
      handleCloseModal();
    }
  };

  handleOverlayClick = () => {
    this.closeModal();
  };

  handleClickClose = (ev) => {
    ev.preventDefault();

    this.closeModal();
  };

  handleStatus = () => {
    const { isMounted } = this.state;

    this.setState({
      isMounted: !isMounted,
    });
  };

  handleKeypress = (ev) => {
    if (ev.keyCode === 27) {
      this.closeModal();
    }
  };

  handleTransition = (ev) => {
    const { isReady } = this.state;

    if (!isReady && ev.target.classList.contains('app__modal__container')) {
      this.setState({
        isReady: true,
      });

      clearTimeout(this.timeout);
    }
  };

  handleTransitionTimeout = () => {
    this.setState({
      isReady: true,
    });
  };

  render() {
    const { isReady, isMounted } = this.state;
    const {
      children,
      title,
    } = this.props;

    return (
      <div className="app__modal">
        <Overlay onClick={this.handleOverlayClick} />
        <div
          key="Modal"
          ref={c => (this.modal = c)}
          className={cx('app__modal__container', {
            'app__modal__container--is-mounted': isMounted,
            'app__modal__container--is-ready': isReady,
            'has-title': title,
          })}
        >
          <div className="app__modal__container__close">
            <a href="#close" onClick={this.handleClickClose}>
              <TimesCircleIcon />
            </a>
          </div>
          <div className="app__modal__container__content">
            {!isReady || children}
          </div>
        </div>
      </div>
    );
  }
}
