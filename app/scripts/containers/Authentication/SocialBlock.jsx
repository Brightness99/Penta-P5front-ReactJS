// @flow
import React from 'react';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export default class SocialBlock extends React.Component {
  static props: Props;

  render() {
    return (
      <div className="authentication__social">
        <button className="google btn btn-md">
          <i className="fa fa-google" />
          Google
        </button>
        <button className="facebook btn btn-md">
          <i className="fa fa-facebook" />
          Facebook
        </button>
      </div>
    );
  }
}
