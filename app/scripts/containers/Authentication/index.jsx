// @flow
import React from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';
import { PageTitle } from 'atoms/Titles';
import { userSignIn, userSignUp, socialLoginSettingsFetch } from 'actions';
import { SignInForm, SignUpForm, SocialBlock } from 'components/Authorization';

type Props = {
  submitSignIn: (email: string, password: string) => void,
  submitSignUp: (data: any) => void,
  socialLoginSettingsFetch: () => void,
  socialLoginSettings: {},
};

export class Authentication extends React.Component {
  componentDidMount() {
    this.props.socialLoginSettingsFetch();
  }

  static props: Props;

  render() {
    const { submitSignUp, submitSignIn } = this.props;
    return (
      <div className="container">
        <PageTitle className="text-center">Entre ou cadastre-se</PageTitle>
        <div className={cx('authentication')}>
          <SocialBlock />
          <div className="authentication__wrapper">
            <SignInForm onSubmit={(email, password) => submitSignIn && submitSignIn(email, password)} />
            <SignUpForm onSubmit={data => submitSignUp && submitSignUp(data)} />
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
  submitSignIn: (email, password) => dispatch(userSignIn(email, password)),
  submitSignUp: data => dispatch(userSignUp(data)),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
