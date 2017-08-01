// @flow
import React from 'react';
import { connect } from 'react-redux';

import { BlockTitle } from 'atoms/Titles';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class SignInBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: { valid: false, value: '' },
        password: { valid: false, value: '' },
      },
    };
  }

  static props: Props;
  static state: State;

  handleSignIn = (ev) => {
    ev.preventDefault();
    const { form, canSubmit } = this.state;
  };

  handleValidatedInput = (ev, inputName, isValid) => {
    const { form } = this.state;
    const newState = { form };

    let canSubmit = true;

    newState.form[inputName].valid = isValid;
    newState.form[inputName].value = ev.target.value;

    Object.keys(newState.form).forEach((index) => {
      if (newState.form[index].valid !== true) {
        canSubmit = false;
      }
    });

    this.setState({ form: newState.form, canSubmit });
  };

  render() {
    // const { locale } = this.props;
    const { canSubmit } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Entrar</BlockTitle>
        <hr />
        <form className="authentication__block__form" onSubmit={this.handleSignIn}>
          <InputEmail
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={this.handleValidatedInput}
          />
          <InputPassword
            name="password"
            placeholder="Senha"
            onChange={this.handleValidatedInput}
          />
          <Button
            type="submit"
            kind="success"
            disabled={!canSubmit}
          >
          Entrar
          </Button>
        </form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(SignInBlock);
