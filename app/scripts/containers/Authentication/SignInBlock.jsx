// @flow
import React from 'react';
import cx from 'classnames';
import { Input } from 'quarks/Inputs';

import { BlockTitle } from 'atoms/Titles';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export default class SignInBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validEmail: false,
      validPassword: false,
      valueEmail: '',
      valuePassword: '',
    };
  }

  static props: Props;
  static state: State;

  handleSignIn = (ev) => {
    ev.preventDefault();
  };

  handleEmailChange = (ev) => {
    const email = ev.target.value;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regex.test(email);

    this.setState({
      validEmail: valid,
      valueEmail: email,
      canSubmit: (valid && this.state.validPassword),
    });
  };

  handlePasswordChange = (ev) => {
    const password = ev.target.value;
    const valid = password.length > 3;

    this.setState({
      validPassword: valid,
      valuePassword: password,
      canSubmit: (this.state.validEmail && valid),
    });
  };

  render() {
    const { canSubmit, validEmail, validPassword, valueEmail, valuePassword } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Entrar</BlockTitle>
        <hr />
        <form
          className="authentication__block__form"
          onSubmit={this.handleSignIn}
        >
          <Input
            className={cx(!validEmail ? 'invalid' : 'valid')}
            type="email"
            placeholder="Email"
            onChange={this.handleEmailChange}
            value={valueEmail}
          />
          <Input
            className={cx(!validPassword ? 'invalid' : 'valid')}
            type="password"
            placeholder="Senha"
            onChange={this.handlePasswordChange}
            value={valuePassword}
          />
          <input
            className=""
            type="submit"
            name="submit"
            disabled={!canSubmit}
            value="ENTRAR"
          />
        </form>
      </div>
    );
  }
}
