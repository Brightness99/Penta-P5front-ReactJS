// @flow
import React from 'react';

import { BlockTitle } from 'atoms/Titles';
import { InputEmail } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import Fingerprint from 'vendor/fingerprint2';

type FormType = {
  email: { valid: boolean, value: string },
  email_confirmation: { valid: boolean, value: string },
};

type Props = {
  name: string,
  onSubmit: (data: FormType) => void
};

type State = { canSubmit: boolean, form: FormType };

export default class SocialSignUpForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: { valid: false, value: '' },
        email_confirmation: { valid: false, value: '' },
      },
      canSubmit: false,
    };
  }

  props: Props;
  state: State;

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { form, canSubmit } = this.state;
    const { onSubmit, name } = this.props;

    const fingerprint = document.getElementById('fingerprint').value;

    if (canSubmit === true) {
      const value = {
        first_name: name,
        email: form.email.value,
        email_confirmation: form.email_confirmation.value,
        fingerprint,
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

  componentDidMount = () => {
    const fp = new Fingerprint();
    fp.addContextToForm('socialSignUpForm');
  };

  render() {
    const { canSubmit } = this.state;
    const { form } = this.state;

    return (
      <div className="authentication__block">
        <BlockTitle>Sou novo cliente, {this.props.name}</BlockTitle>
        <hr />
        <form className="authentication__block__form" id="socialSignUpForm" onSubmit={this.handleSubmit}>
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
