// @flow
import React from 'react';
import Script from 'react-load-script';
import { connect } from 'react-redux';
import { Tabs, TabHeader, TabNav, TabBody } from 'components/Tabs';
import {
  userSignIn,
  userSignUp,
  socialLoginSettingsFetch,
  userSocialSignIn,
  userSocialSignUp
} from 'actions';
import { SignInForm, SignUpForm, SocialBlock, SocialSignUpForm } from 'components/Authorization';
import { isMobile } from 'utils';
import Modal from 'components/Modal';

type Props = {
  submitSignIn: (data) => void,
  submitSignUp: (data: any) => void,
  socialSignIn: (data) => void,
  socialSignUp: (data) => void,
  socialLoginSettingsFetch: () => void,
  socialLoginSettings: {},
  isSocialUserNotFound: boolean,
  signInErrorMessage: string,
  signUpErrorMessage: string,
  locale: {},
  screenSize: string,
};

type States = {
  isModalOpen: boolean,
  facebookEmailNotFound: boolean,
  facebookSocialInfo: {},
  googleSocialInfo: {},
  isFingerprintLoaded: boolean,
}

export class Authentication extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      facebookEmailNotFound: false,
      facebookSocialInfo: null,
      isFingerprintLoaded: false,
    };
  }

  componentDidMount() {
    this.props.socialLoginSettingsFetch();
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { isSocialUserNotFound } = this.props;
    const nextIsSocialUserNotFound = nextProps.isSocialUserNotFound;

    if (nextIsSocialUserNotFound && nextIsSocialUserNotFound !== isSocialUserNotFound) {
      this.socialUserNotFound();
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

  socialUserNotFound = () => {
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
        facebookEmailNotFound: true,
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

  handleScriptLoaded = () => {
    this.setState({ isFingerprintLoaded: true });
  };

  renderSignUpForm = () => {
    const {
      isFingerprintLoaded,
      facebookEmailNotFound,
      facebookSocialInfo,
    } = this.state;
    const { signUpErrorMessage, locale: { signup_block, signup_social_block } } = this.props;

    if (facebookEmailNotFound) {
      return (
        <SocialSignUpForm
          locale={signup_social_block}
          name={facebookSocialInfo.first_name}
          onSubmit={this.facebookSignUp}
        />);
    }

    return (
      <SignUpForm
        locale={signup_block}
        onSubmit={this.signUp}
        isFingerprintLoaded={isFingerprintLoaded}
        errorMessage={signUpErrorMessage}
      />);
  };

  renderModalDialog = () => {
    const { locale: { attention_modal: { TITLE, CONTENT } } } = this.props;
    const { isModalOpen } = this.state;
    if (!isModalOpen) return '';

    return (
      <Modal title={TITLE} handleCloseModal={this.closeModal}>
        {CONTENT}
      </Modal>);
  };

  renderSignIn = () => {
    const { signInErrorMessage, locale: { signin_block } } = this.props;
    const { isFingerprintLoaded } = this.state;

    return (<SignInForm
      locale={signin_block}
      onSubmit={this.signIn}
      isFingerprintLoaded={isFingerprintLoaded}
      errorMessage={signInErrorMessage}
    />);
  };

  renderSocialBlock = () => {
    const { socialLoginSettings, locale: { social_block }, screenSize } = this.props;
    const { isFingerprintLoaded } = this.state;
    const isMobileLayout = isMobile(screenSize);

    return (
      <SocialBlock
        locale={social_block}
        loginFBSuccess={this.facebookSignIn}
        loginGoogleSuccess={this.googleSignIn}
        facebook={socialLoginSettings.socials.facebook}
        google={socialLoginSettings.socials.google}
        isFingerprintLoaded={isFingerprintLoaded}
        isMobile={isMobileLayout}
      />);
  };

  renderTitleBetweenBlocks = () => {
    const { locale: { TITLE_BETWEEN_BLOCKS } } = this.props;
    return (
      <section className="title_between_blocks">
        <span>{TITLE_BETWEEN_BLOCKS}</span>
      </section>
    );
  };

  renderDesktop = () => (
    <section>
      {this.renderSocialBlock()}
      {this.renderTitleBetweenBlocks()}
      <div className="authentication__wrapper">
        {this.renderSignIn()}
        {this.renderSignUpForm()}
      </div>
    </section>
  );

  renderMobile = (signIn, signUp) => (
    <Tabs>
      <TabHeader>
        <TabNav key="sign-in">{signIn}</TabNav>
        <TabNav key="sign-up">{signUp}</TabNav>
      </TabHeader>
      <TabBody>
        <section>
          {this.renderSocialBlock()}
          {this.renderTitleBetweenBlocks()}
          {this.renderSignIn()}
        </section>
        <section>
          {this.renderSignUpForm()}
        </section>
      </TabBody>
    </Tabs>);

  renderContent = () => {
    const {
      screenSize, locale: {
        TITLE_MOBILE_SIGN_UP,
        TITLE_MOBILE_SIGN_IN,
      },
    } = this.props;
    const isMobileLayout = isMobile(screenSize);

    if (isMobileLayout) return this.renderMobile(TITLE_MOBILE_SIGN_IN, TITLE_MOBILE_SIGN_UP);
    return this.renderDesktop();
  };

  render() {
    return (
      <div className="container">
        <Script
          url="https://dpmhrplvfkwad.cloudfront.net/printi/analytics.js"
          onLoad={this.handleScriptLoaded}
        />
        {this.renderModalDialog()}
        <div className="authentication">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socialLoginSettings: state.socialLoginSettings,
  isSocialUserNotFound: state.user.socialAuthentication.userNotFound,
  signInErrorMessage: state.user.authentication.message,
  signUpErrorMessage: state.user.registration.message,
  locale: state.locale.translate.page.authentication,
  screenSize: state.app.screenSize,
});

const mapDispatchToProps = dispatch => ({
  submitSignIn: (data) => dispatch(userSignIn(data)),
  submitSignUp: data => dispatch(userSignUp(data)),
  socialSignIn: (data) => dispatch(userSocialSignIn(data)),
  socialSignUp: (data) => dispatch(userSocialSignUp(data)),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
