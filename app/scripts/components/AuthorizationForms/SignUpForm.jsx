// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';
import { InputFullName, InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';

type FormType = {
  first_name: { valid: boolean, value: string },
  email: { valid: boolean, value: string },
  email_confirmation: { valid: boolean, value: string },
  password: { valid: boolean, value: string },
};

type Props = {
  onSubmit: (data: FormType) => void
};

type State = { canSubmit: boolean, form: FormType };

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        first_name: { valid: false, value: '' },
        email: { valid: false, value: '' },
        email_confirmation: { valid: false, value: '' },
        password: { valid: false, value: '' },
      },
      canSubmit: false,
    };
  }

  props: Props;
  state: State;

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { form, canSubmit } = this.state;
    const { onSubmit } = this.props;
    if (canSubmit === true) {
      const value = {
        first_name: form.first_name.value,
        email: form.email.value,
        email_confirmation: form.email_confirmation.value,
        password: form.password.value,
        fingerprint: '',
        socialType: '',
        hubspot_subscribe: true,
        socialData: {
          socialId: '',
          socialToken: '',
        },
      };
      onSubmit(value);
    }
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
            name="first_name"
            placeholder="Nome completo"
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email"
            placeholder="E-mail"
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email_confirmation"
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
