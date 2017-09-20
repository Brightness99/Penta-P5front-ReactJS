// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';
import { InputFullName, InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';

type Props = {
  app: AppStoreType,
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

  handleSubmit = (ev) => {
    ev.preventDefault();
  };

  handleValidatedInput = (name, value, valid) => {
    const { form } = this.state;
    const newState = { form };

    let canSubmit = true;

    newState.form[name].valid = valid;
    newState.form[name].value = value;

    if (canSubmit === true) {
      Object.keys(newState.form).forEach((index) => {
        if (newState.form[index].valid !== true) {
          canSubmit = false;
        }
      });
    }

    this.setState({ form: newState.form, canSubmit });
  };

  render() {
    const { canSubmit } = this.state;
    const { form } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Cadastrar</BlockTitle>
        <hr />
        <form className="authentication__block__form" onSubmit={this.handleSubmit}>
          <InputFullName
            name="full_name"
            placeholder="Nome completo"
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email"
            placeholder="E-mail"
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email_repeat"
            placeholder="Repetir e-mail"
            equalsTo={form.email.value}
            onValidate={this.handleValidatedInput}
          />
          <InputPassword
            name="password"
            placeholder="Senha"
            onValidate={this.handleValidatedInput}
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
