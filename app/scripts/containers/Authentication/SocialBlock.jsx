// @flow
import React from 'react';
import SVG from 'react-inlinesvg';
import { Button } from 'quarks/Inputs';

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
        <Button className="authentication__social__button facebook">
          <SVG src={require('assets/media/svg/social_facebook.svg')} />
        </Button>
        <Button className="authentication__social__button google">
          <SVG src={require('assets/media/svg/social_googleplus.svg')} />
        </Button>
      </div>
    );
  }
}
