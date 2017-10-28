// @flow
import React from 'react';
import SVG from 'react-inlinesvg';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { addFingerprint, getFingerprintFromForm } from 'vendor/fingerprint2';

type GoogleSuccessResult = {
  googleId: string,
  tokenId: string,
  accessToken: string,
  tokenObj: Object,
  profileObj: {
    name: string,
    email: string,
  }
}

type GoogleFailureResult = {
  error: string,
  details: string
}

type FBSuccessResult = {
  status: string,
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string,
  name: string,
  email: string,
}

type FBFailureResult = {}

type SocialLoginResult = {
  socialType: string,
  socialData: {
    socialId: string,
    socialToken: string,
  },
  fingerprint: string,
  email: string,
  hubspot_subscribe: boolean,
  stay_connected: boolean,
  first_name: string,
  error: {}
}

type Props = {
  facebook: {
    enabled: boolean,
    credentials: {
      app_id: string,
      secret_key: string,
    }
  },
  google: {
    enabled: boolean,
    credentials: {
      client_id: string,
      secret_key: string,
    }
  },
  loginFBSuccess: (result: SocialLoginResult) => void,
  loginFBFailure: (result: SocialLoginResult) => void,
  loginGoogleSuccess: (result: SocialLoginResult) => void,
  loginGoogleFailure: (result: SocialLoginResult) => void,
  isFingerprintLoaded: boolean,
  isMobile: boolean,
  locale: {
    TITLE: string,
    FACEBOOK_TITLE: string,
    GOOGLE_TITLE: string,
  }
};

export default class SocialBlock extends React.PureComponent {
  componentWillReceiveProps = (newProps: Props) => {
    if (this.props.isFingerprintLoaded !== newProps.isFingerprintLoaded) {
      addFingerprint('fakeFormForSocial');
    }
  };

  props: Props;

  loginFBSuccess = (data: FBSuccessResult) => {
    const { loginFBSuccess } = this.props;
    if (data.status === '"not_authorized"' || !data.userID) return;

    const fingerprint = getFingerprintFromForm('fakeFormForSocial');

    const result = {
      socialType: 'facebook',
      socialData: {
        socialId: data.userID,
        socialToken: data.accessToken,
      },
      email: data.email,
      hubspot_subscribe: true,
      stay_connected: true,
      first_name: data.name,
      fingerprint,
    };
    loginFBSuccess(result);
  };

  loginFBFailure = (data: FBFailureResult) => {
    const { loginFBFailure } = this.props;
    if (typeof loginFBFailure !== 'function') {
      return;
    }

    const result = {
      socialType: 'facebook',
      error: data,
    };

    loginFBFailure(result);
  };

  loginGoogleSuccess = (data: GoogleSuccessResult) => {
    const { loginGoogleSuccess } = this.props;

    const fingerprint = getFingerprintFromForm('fakeFormForSocial');

    const result = {
      socialType: 'google',
      socialData: {
        socialId: data.googleId,
        socialToken: data.tokenId,
      },
      fingerprint,
      hubspot_subscribe: true,
      stay_connected: true,
      first_name: data.profileObj.name,
      email: data.profileObj.email,
    };

    loginGoogleSuccess(result);
  };

  loginGoogleFailure = (data: GoogleFailureResult) => {
    const { loginGoogleFailure } = this.props;
    if (typeof loginGoogleFailure !== 'function') {
      return;
    }
    const result = {
      socialType: 'google',
      error: data,
    };

    loginGoogleFailure(result);
  };

  renderFacebookLogin = () => {
    const { facebook, isMobile, locale: { FACEBOOK_TITLE } } = this.props;
    const title = isMobile ? FACEBOOK_TITLE : '';

    if (facebook && facebook.enabled) {
      return (
        <FacebookLogin
          appId={facebook.credentials.app_id}
          fields="name,email,picture"
          textButton={title}
          callback={this.loginFBSuccess}
          onFailure={this.loginFBFailure}
          cssClass={'facebook-login-button app__qrk__button'}
          icon={!isMobile && <SVG src={require('assets/media/svg/social_facebook.svg')} />}
        />
      );
    }
    return '';
  };

  renderGoogleLogin = () => {
    const { google, isMobile, locale: { GOOGLE_TITLE } } = this.props;
    const title = isMobile ? GOOGLE_TITLE : '';

    if (google && google.enabled) {
      return (
        <GoogleLogin
          clientId={google.credentials.client_id}
          buttonText={title}
          onSuccess={this.loginGoogleSuccess}
          onFailure={this.loginGoogleFailure}
          className={'google-login-button app__qrk__button'}
        >
          { !isMobile && <SVG src={require('assets/media/svg/social_googleplus.svg')} /> }
        </GoogleLogin>
      );
    }
    return '';
  };

  render() {
    const { locale: { TITLE }, isMobile } = this.props;
    return (
      <div className="authentication__social">
        { !isMobile && <h3>{TITLE}:</h3>}
        {this.renderFacebookLogin()}
        {this.renderGoogleLogin()}
        <form id="fakeFormForSocial" />
      </div>
    );
  }
}
