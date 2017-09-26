// @flow
import React from 'react';
import cx from 'classnames';

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
  facebookSocialInfo: {}
}

export class Authentication extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isSocialAuthInProgress: false,
      facebookSocialInfo: null,
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

    if (typeof submitSignUp !== 'function') {
      return;
    }

    const result = Object.assign(data, this.state.facebookSocialInfo);

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
    if (this.state.isSocialAuthInProgress) {
      return <SocialSignUpForm name={this.state.facebookSocialInfo.first_name} onSubmit={this.facebookSignUp} />;
    }

    return <SignUpForm onSubmit={this.signUp} />;
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

  render() {
    const { submitSignIn, socialLoginSettings } = this.props;
    return (
      <div className="container">
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
            <SignInForm onSubmit={(data) => submitSignIn && submitSignIn(data)} />
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
