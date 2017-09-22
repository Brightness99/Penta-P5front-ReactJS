// @flow
import React from 'react';
import cx from 'classnames';

import { PageTitle } from 'atoms/Titles';

import SignInBlock from './SignInBlock';
import SignUpBlock from './SignUpBlock';
import SocialBlock from './SocialBlock';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export default class Authentication extends React.Component {
  static props: Props;

  render() {
    return (
      <div className="container">
        <PageTitle className="text-center">Entre ou cadastre-se</PageTitle>
        <div className={cx('authentication')}>
          <SocialBlock />
          <div className="authentication__wrapper">
            <SignInBlock />
            <SignUpBlock />
          </div>
        </div>
      </div>
    );
  }
}
