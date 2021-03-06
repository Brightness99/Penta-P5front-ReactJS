// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorField from 'components/ErrorField';
import { CheckBox } from 'components/Input';
import { BlockTitle } from 'atoms/Titles';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import { addFingerprint, getFingerprintFromForm } from 'vendor/fingerprint2';

type FormType = {
  email: { valid: boolean, value: string },
  password: { valid: boolean, value: string},
};

type Props = {
  onSubmit: (email: string, password: string) => void,
  isFingerprintLoaded: boolean,
  errorMessage: string,
  isLoading: boolean,
  locale: {
    TITLE: string,
    EMAIL_PLACEHOLDER: string,
    PASSWORD_PLACEHOLDER: string,
    BUTTON_TITLE: string
  }
};

type State = { canSubmit: boolean, form: FormType, stayConnected: boolean };

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: { valid: false, value: '' },
        password: { valid: false, value: '' },
      },
      stayConnected: false,
      canSubmit: false,
    };
  }

  componentWillReceiveProps = (newProps: Props) => {
    if (this.props.isFingerprintLoaded !== newProps.isFingerprintLoaded) {
      addFingerprint('signInForm');
    }
  };

  static props: Props;
  static state: State;

  handleSignIn = (ev) => {
    ev.preventDefault();

    const { form, canSubmit, stayConnected } = this.state;
    const { onSubmit } = this.props;

    if (canSubmit === true) {
      const fingerprint = getFingerprintFromForm('signInForm');

      onSubmit({
        email: form.email.value,
        password: form.password.value,
        stay_connected: stayConnected,
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

  handleCheckedStateChanged = (event) => {
    this.setState({
      stayConnected: event.target.checked,
    });
  };

  render() {
    const { canSubmit, stayConnected } = this.state;
    const { errorMessage, isLoading, locale: { TITLE, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, BUTTON_TITLE } } = this.props;
    return (
      <div className="authentication__block">
        <BlockTitle>{TITLE}</BlockTitle>
        <hr />
        <form className="authentication__block__form" id="signInForm" onSubmit={this.handleSignIn}>
          <InputEmail
            name="email"
            placeholder={EMAIL_PLACEHOLDER}
            showLabel={true}
            onValidate={this.handleValidatedInput}
          />
          <InputPassword
            name="password"
            placeholder={PASSWORD_PLACEHOLDER}
            showLabel={true}
            isOldRulesForPassword={true}
            onValidate={this.handleValidatedInput}
          />
          <ErrorField message={errorMessage} />
          <Button
            type="submit"
            kind="success"
            isLoading={isLoading}
            disabled={!canSubmit}
          >
            {BUTTON_TITLE}
          </Button>
          <section className="authentication__block__form__footer">
            <label>
              <CheckBox
                checked={stayConnected}
                onChange={this.handleCheckedStateChanged}
              />
              <span>Permanecer conectado</span>
            </label>
            <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
          </section>
        </form>
      </div>
    );
  }
}
