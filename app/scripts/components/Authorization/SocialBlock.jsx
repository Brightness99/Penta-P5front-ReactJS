// @flow
import React from 'react';
import SVG from 'react-inlinesvg';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

type GoogleSuccessResult = {
  googleId: string,
  tokenId: string,
  accessToken: string,
  tokenObj: Object,
  profileObj: Object
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
}

type FBFailureResult = {}

type SocialLoginResult = {
  socialType: string,
  socialData: {
    socialId: string,
    socialToken: string,
  },
  isSuccess: boolean,
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
};

export default class SocialBlock extends React.PureComponent {
  props: Props;

  loginFBSuccess = (data: FBSuccessResult) => {
    const { loginFBSuccess } = this.props;
    if (data.status === '"not_authorized"' || !data.userID) return;

    const result = {
      socialType: 'facebook',
      socialData: {
        socialId: data.userID,
        socialToken: data.accessToken,
      },
      first_name: data.name,
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

    const result = {
      socialType: 'google',
      socialData: {
        socialId: data.googleId,
        socialToken: data.tokenId,
      },
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
    const { facebook } = this.props;
    if (facebook.enabled) {
      return (
        <FacebookLogin
          appId={facebook.credentials.app_id}
          autoLoad={true}
          fields="name,email,picture"
          textButton={''}
          callback={this.loginFBSuccess}
          onFailure={this.loginFBFailure}
          cssClass={'facebook-login-button app__qrk__button'}
          icon={<SVG src={require('assets/media/svg/social_facebook.svg')} />}
        />
      );
    }
    return '';
  };

  renderGoogleLogin = () => {
    const { google } = this.props;

    if (google.enabled) {
      return (
        <GoogleLogin
          clientId={google.credentials.client_id}
          buttonText={''}
          onSuccess={this.loginGoogleSuccess}
          onFailure={this.loginGoogleFailure}
          className={'google-login-button app__qrk__button'}
        >
          <SVG src={require('assets/media/svg/social_googleplus.svg')} />
        </GoogleLogin>
      );
    }
    return '';
  };

  render() {
    return (
      <div className="authentication__social">
        {this.renderFacebookLogin()}
        {this.renderGoogleLogin()}
      </div>
    );
  }
}
