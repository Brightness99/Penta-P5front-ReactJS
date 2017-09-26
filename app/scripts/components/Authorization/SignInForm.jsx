// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import Fingerprint from 'vendor/fingerprint2';

type FormType = {
  email: { valid: boolean, value: string },
  password: { valid: boolean, value: string },
};

type Props = {
  onSubmit: (email: string, password: string) => void
};

type State = { canSubmit: boolean, form: FormType };

export default class SignInForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: { valid: false, value: '' },
        password: { valid: false, value: '' },
      },
      canSubmit: false,
    };
  }

  props: Props;
  state: State;

  handleSignIn = (ev) => {
    ev.preventDefault();

    const { form, canSubmit } = this.state;
    const { onSubmit } = this.props;
    const fingerprint = document.getElementById('fingerprint').value;

    if (canSubmit === true) {
      onSubmit({
        email: form.email.value,
        password: form.password.value,
        fingerprint,
      });
    }
  };

  handleValidatedInput = (name, value, valid) => {
    const { form } = this.state;
    const newState = { form };

    let canSubmit = true;

    newState.form[name].value = value;
    newState.form[name].valid = valid;

    if (canSubmit === true) {
      Object.keys(newState.form).forEach((index) => {
        if (newState.form[index].valid !== true) {
          canSubmit = false;
        }
      });
    }

    this.setState({ form: newState.form, canSubmit });
  };

  componentDidMount = () => {
    const fp = new Fingerprint();
    fp.addContextToForm('signInForm');
  };

  render() {
    const { canSubmit } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Entrar</BlockTitle>
        <hr />
        <form className="authentication__block__form" id="signInForm" onSubmit={this.handleSignIn}>
          <InputEmail
            name="email"
            placeholder="E-mail"
            showLabel={true}
            onValidate={this.handleValidatedInput}
          />
          <InputPassword
            name="password"
            placeholder="Senha"
            onValidate={this.handleValidatedInput}
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
