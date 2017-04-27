// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

const handleClick = () => {
  document.body.scrollTop = 0;
};

const BackToTop = (props: { text: boolean }) => (
  <button
    className={cx('app__back-to-top', props.text && 'app__back-to-top--text')}
    onClick={handleClick}
  >
    {props.text && 'Voltar ao topo'}<SVG src={require('assets/media/svg/icon_arrowup.svg')} />
  </button>
);

export default BackToTop;
