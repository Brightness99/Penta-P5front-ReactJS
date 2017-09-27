// @flow
import React from 'react';
import cx from 'classnames';
import Script from 'react-load-script';

import { connect } from 'react-redux';
import { PageTitle } from 'atoms/Titles';
import { userSignIn, userSignUp, socialLoginSettingsFetch } from 'actions';
import { SignInForm, SignUpForm, SocialBlock, SocialSignUpForm } from 'components/Authorization';
import Modal from 'components/Modal';

type Props = {
  submitSignIn: (data) => void,
  submitSignUp: (data: any) => void,
  socialLoginSettingsFetch: () => void,
  socialLoginSettings: {},
};

type States = {
  isModalOpen: boolean,
  isSocialAuthInProgress: boolean,
  facebookSocialInfo: {},
  isFingerprintLoaded: boolean,
}

export class Authentication extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isSocialAuthInProgress: false,
      facebookSocialInfo: null,
      isFingerprintLoaded: false,
    };
  }

  componentDidMount() {
    this.props.socialLoginSettingsFetch();
  }

  static props: Props;
  static state: States;

  signUp = (data) => {
    const { submitSignUp } = this.props;
    if (typeof submitSignUp !== 'function') {
      return;
    }
    const result = Object.assign(data,
      {
        socialType: '',
        hubspot_subscribe: true,
        socialData: {
          socialId: '',
          socialToken: '',
        },
      });

    submitSignUp(result);
  };

  facebookLogin = (data) => {
    this.setState({
      isSocialAuthInProgress: true,
      facebookSocialInfo: data,
      isModalOpen: true,
    });
  };

  facebookSignUp = (data) => {
    const { submitSignUp } = this.props;
    const { facebookSocialInfo } = this.state;

    if (typeof submitSignUp !== 'function') {
      return;
    }

    const result = Object.assign(data, facebookSocialInfo);

    submitSignUp(result);
  };

  socialLogin = (data) => {
    const { submitSignUp } = this.props;

    if (typeof submitSignUp !== 'function') {
      return;
    }

    const result = Object.assign(data,
      {
        hubspot_subscribe: true,
        email: '',
        email_confirmation: '',
        password: '',
      });
    submitSignUp(result);
  };

  renderSignUpForm = () => {
    const { isFingerprintLoaded, isSocialAuthInProgress, facebookSocialInfo } = this.state;

    if (isSocialAuthInProgress) {
      return (
        <SocialSignUpForm
          name={facebookSocialInfo.first_name}
          onSubmit={this.facebookSignUp}
          isFingerprintLoaded={isFingerprintLoaded}
        />);
    }

    return (
      <SignUpForm
        onSubmit={this.signUp}
        isFingerprintLoaded={isFingerprintLoaded}
      />);
  };

  renderModalDialog = () => {
    if (!this.state.isModalOpen) return '';

    return (
      <Modal title="Atenção" handleCloseModal={this.closeModal}>
          Para acessar com o seu Facebook. Informar o Seu e-mail.
        </Modal>);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleScriptLoad = () => {
    this.setState({ isFingerprintLoaded: true });
  };

  render() {
    const { submitSignIn, socialLoginSettings } = this.props;
    const { isFingerprintLoaded } = this.state;
    return (
      <div className="container">
        <Script
          url="https://dpmhrplvfkwad.cloudfront.net/printi/analytics.js"
          onLoad={this.handleScriptLoad}
        />
        {this.renderModalDialog()}
        <PageTitle className="text-center">Entre ou cadastre-se</PageTitle>
        <div className={cx('authentication')}>
          <SocialBlock
            loginFBSuccess={this.facebookLogin}
            loginGoogleSuccess={this.socialLogin}
            facebook={socialLoginSettings.socials.facebook}
            google={socialLoginSettings.socials.google}
          />
          <div className="authentication__wrapper">
            <SignInForm
              onSubmit={(data) => submitSignIn && submitSignIn(data)}
              isFingerprintLoaded={isFingerprintLoaded}
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
});

const mapDispatchToProps = dispatch => ({
  submitSignIn: (data) => dispatch(userSignIn(data)),
  submitSignUp: data => dispatch(userSignUp(data)),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
