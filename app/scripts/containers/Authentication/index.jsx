// @flow
import React from 'react';
import cx from 'classnames';
import Script from 'react-load-script';

import { connect } from 'react-redux';
import { PageTitle } from 'atoms/Titles';
import {
  userSignIn,
  userSignUp,
  socialLoginSettingsFetch,
  userSocialSignIn,
  userSocialSignUp } from 'actions';
import { SignInForm, SignUpForm, SocialBlock, SocialSignUpForm } from 'components/Authorization';
import Modal from 'components/Modal';

type Props = {
  submitSignIn: (data) => void,
  submitSignUp: (data: any) => void,
  socialSignIn: (data) => void,
  socialSignUp: (data) => void,
  socialLoginSettingsFetch: () => void,
  socialLoginSettings: {},
  isSignUpActivated: boolean,
  signInErrorMessage: string,
  signUpErrorMessage: string,
};

type States = {
  isModalOpen: boolean,
  forFacebookNeedEmail: boolean,
  facebookSocialInfo: {},
  googleSocialInfo: {},
  isFingerprintLoaded: boolean,
}

export class Authentication extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      forFacebookNeedEmail: false,
      facebookSocialInfo: null,
      isFingerprintLoaded: false,
    };
  }

  componentDidMount() {
    this.props.socialLoginSettingsFetch();
  }

  componentWillReceiveProps= (nextProps: Props) => {
    const { isSignUpActivated }  = this.props;
    const nextSignUpState  = nextProps.isSignUpActivated;

    if (nextSignUpState && nextSignUpState !== isSignUpActivated) {
      this.socialSignUpActivated();
    }
  };

  static props: Props;
  static state: States;

  signUp = (data) => {
    const { submitSignUp } = this.props;

    if (typeof submitSignUp !== 'function') {
      return;
    }

    submitSignUp(data);
  };

  signIn = (data) => {
    const { submitSignIn } = this.props;

    if (typeof submitSignIn !== 'function') {
      return;
    }

    submitSignIn(data);
  };

  socialSignUpActivated = () => {
    const { facebookSocialInfo, googleSocialInfo } = this.state;

    if (facebookSocialInfo) {
      this.facebookSignUpConfiguration(facebookSocialInfo);
    }
    if (googleSocialInfo) {
      this.signUp(googleSocialInfo);
    }
  };

  facebookSignUpConfiguration = (facebookSocialInfo) => {
    if (facebookSocialInfo.email) {
      this.facebookSignUp({});
    } else {
      this.setState({
        isModalOpen: true,
        forFacebookNeedEmail: true,
      });
    }
  };

  facebookSignIn = (data) => {
    const { socialSignIn } = this.props;
    this.setState({
      facebookSocialInfo: data,
    });

    socialSignIn(data);
  };

  facebookSignUp = (data) => {
    const { facebookSocialInfo } = this.state;
    const result = Object.assign(data, facebookSocialInfo);

    this.signUp(result);
  };

  googleSignIn = (data) => {
    const { socialSignIn } = this.props;
    this.setState({
      googleSocialInfo: data,
    });

    socialSignIn(data);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleScriptLoad = () => {
    this.setState({ isFingerprintLoaded: true });
  };

  renderSignUpForm = () => {
    const {
      isFingerprintLoaded,
      forFacebookNeedEmail,
      facebookSocialInfo } = this.state;
    const { signUpErrorMessage } = this.props;

    if (forFacebookNeedEmail) {
      return (
        <SocialSignUpForm
          name={facebookSocialInfo.first_name}
          onSubmit={this.facebookSignUp}
        />);
    }

    return (
      <SignUpForm
        onSubmit={this.signUp}
        isFingerprintLoaded={isFingerprintLoaded}
        errorMessage={signUpErrorMessage}
      />);
  };

  renderModalDialog = () => {
    if (!this.state.isModalOpen) return '';

    return (
      <Modal title="Atenção" handleCloseModal={this.closeModal}>
        Para acessar com o seu Facebook. Informar o Seu e-mail.
      </Modal>);
  };

  render() {
    const { socialLoginSettings, signInErrorMessage } = this.props;
    const { isFingerprintLoaded } = this.state;
    return (
      <div className="container">
        <Script
          url="https://dpmhrplvfkwad.cloudfront.net/printi/analytics.js"
          onLoad={this.handleScriptLoad}
        />
        {this.renderModalDialog()}
        <div className="authentication">
          <SocialBlock
            loginFBSuccess={this.facebookSignIn}
            loginGoogleSuccess={this.googleSignIn}
            facebook={socialLoginSettings.socials.facebook}
            google={socialLoginSettings.socials.google}
            isFingerprintLoaded={isFingerprintLoaded}
          />
          <span className="title_between_blocks">OU</span>
          <div className="authentication__wrapper">
            <SignInForm
              onSubmit={this.signIn}
              isFingerprintLoaded={isFingerprintLoaded}
              errorMessage={signInErrorMessage}
            />
            {this.renderSignUpForm()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socialLoginSettings: state.socialLoginSettings,
  isSignUpActivated: state.user.socialAuthentication.userNotFound,
  signInErrorMessage: state.user.authentication.message,
  signUpErrorMessage: state.user.registration.message,
});

const mapDispatchToProps = dispatch => ({
  submitSignIn: (data) => dispatch(userSignIn(data)),
  submitSignUp: data => dispatch(userSignUp(data)),
  socialSignIn: (data) => dispatch(userSocialSignIn(data)),
  socialSignUp: (data) => dispatch(userSocialSignUp(data)),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
