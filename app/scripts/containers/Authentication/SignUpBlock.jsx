// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export default class SignUpBlock extends React.Component {
  static props: Props;

  render() {
    return (
      <div className="authentication__block">
        <BlockTitle>Cadastrar</BlockTitle>
        <hr />
      </div>
    );
  }
}
