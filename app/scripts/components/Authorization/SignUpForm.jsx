// @flow
import React from 'react';

import ErrorField from 'components/ErrorField';
import { BlockTitle } from 'atoms/Titles';
import { InputFullName, InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import { addFingerprint, getFingerprintFromForm } from 'vendor/fingerprint2';

type FormType = {
  first_name: { valid: boolean, value: string },
  email: { valid: boolean, value: string },
  email_confirmation: { valid: boolean, value: string },
  password: { valid: boolean, value: string },
};

type Props = {
  onSubmit: (data: FormType) => void,
  isFingerprintLoaded: boolean,
  errorMessage: string,
};

type State = { canSubmit: boolean, form: FormType };

export default class SignUpForm extends React.PureComponent {
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

  componentWillReceiveProps = (newProps: Props) => {
    if (this.props.isFingerprintLoaded !== newProps.isFingerprintLoaded) {
      addFingerprint('signUpForm');
    }
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { form, canSubmit } = this.state;
    const { onSubmit } = this.props;

    if (canSubmit === true) {
      const fingerprint = getFingerprintFromForm('signInForm');

      const value = {
        first_name: form.first_name.value,
        email: form.email.value,
        email_confirmation: form.email_confirmation.value,
        password: form.password.value,
        fingerprint,
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
    const { canSubmit, form } = this.state;
    const { errorMessage } = this.props;

    return (
      <div className="authentication__block">
        <BlockTitle>Cadastrar</BlockTitle>
        <hr />
        <form className="authentication__block__form" id="signUpForm" onSubmit={this.handleSubmit}>
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
          <ErrorField message={errorMessage} />
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
