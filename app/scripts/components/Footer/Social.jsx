// @flow

import React from 'react';
import SVG from 'react-inlinesvg';

const Social = (props: { minified: boolean }) => (
  <div className="app__footer__social">
    {!props.minified && 'Encontre-nos em nossas redes sociais'}
    <div>
      <a
        className="app__footer__social-item app__footer__social-item--facebook"
        href="https://www.facebook.com/PrintiBR/"
        target="_blank"
      >
        <SVG src={require('assets/media/svg/social_facebook.svg')} />
      </a>
      <a
        href="https://twitter.com/Printi"
        target="_blank"
        className="app__footer__social-item app__footer__social-item--twitter"
      >
        <SVG src={require('assets/media/svg/social_twitter.svg')} />
      </a>
      <a
        className="app__footer__social-item app__footer__social-item--linkedin"
        href="https://www.linkedin.com/company/printi"
        target="_blank"
      >
        <SVG src={require('assets/media/svg/social_linkedin.svg')} />
      </a>
      <a
        className="app__footer__social-item app__footer__social-item--google-plus"
        href="https://plus.google.com/+PrintiBr"
        target="_blank"
      >
        <SVG src={require('assets/media/svg/social_googleplus.svg')} />
      </a>
      <a
        className="app__footer__social-item app__footer__social-item--instagram"
        href="https://www.instagram.com/printibr/"
        target="_blank"
      >
        <SVG src={require('assets/media/svg/social_instagram.svg')} />
      </a>
    </div>
  </div>
);

export default Social;
