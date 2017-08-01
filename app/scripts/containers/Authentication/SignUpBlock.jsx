// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';
import { InputFullName, InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export default class SignUpBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        full_name: { valid: false, value: '' },
        email: { valid: false, value: '' },
        email_repeat: { valid: false, value: '' },
        password: { valid: false, value: '' },
      },
    };
  }

  static props: Props;
  static state: State;

  handleSignUp = (ev) => {
    ev.preventDefault();
  };

  handleNameChange = (ev) => {
    ev.preventDefault();
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

  handleEmailChange = (ev, isValid) => {
    const { form } = this.state;

    this.setState({
      form: { ...form, email: { valid: isValid, value: ev.target.value } },
      canSubmit: (isValid && form.password.valid),
    });
  };

  handleEmailRepeatChange = (ev, isValid) => {
    const { form } = this.state;

    this.setState({
      form: { ...form, email_repeat: { valid: isValid, value: ev.target.value } },
      canSubmit: (isValid && form.password.valid),
    });
  };

  handlePasswordChange = (ev, isValid) => {
    const { form } = this.state;

    this.setState({
      form: { ...form, password: { valid: isValid, value: ev.target.value } },
      canSubmit: (form.email.valid && isValid),
    });
  };

  render() {
    const { canSubmit } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Cadastrar</BlockTitle>
        <hr />
        <form className="authentication__block__form" onSubmit={this.handleSignUp}>
          <InputFullName
            name="full_name"
            placeholder="Nome completo"
            onChange={this.handleValidatedInput}
          />
          <InputEmail
            name="email"
            placeholder="E-mail"
            onChange={this.handleValidatedInput}
          />
          <InputEmail
            name="email_repeat"
            placeholder="Repetir e-mail"
            onChange={this.handleValidatedInput}
          />
          <InputPassword
            name="password"
            placeholder="Senha"
            onChange={this.handleValidatedInput}
          />
          <Button
            type="submit"
            name="sign_in"
            kind="success"
            disabled={!canSubmit}
          >
          Cadastrar
          </Button>
        </form>
      </div>
    );
  }
}
