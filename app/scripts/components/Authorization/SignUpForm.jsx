// @flow
import React from 'react';

import ErrorField from 'components/ErrorField';
import { CheckBox } from 'components/Input';
import { BlockTitle } from 'atoms/Titles';
import { InputFullName, InputEmail, InputPassword, EyeIconEnhancer } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import { addFingerprint, getFingerprintFromForm } from 'vendor/fingerprint2';
import TermsAndPolicyBlock from './TermsAndPolicyBlock';

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
  isLoading: boolean,
  isMobile: boolean,
  locale: {
    TITLE: string,
    FULL_NAME_PLACEHOLDER: string,
    EMAIL_PLACEHOLDER: string,
    CONFIRM_EMAIL_PLACEHOLDER: string,
    PASSWORD_PLACEHOLDER: string,
    BUTTON_TITLE: string
  }
};

type State = {
  canSubmit: boolean,
  form: FormType,
  hubspotSubscribe: boolean,
};

type EnhancedInputPasswordProps = {
  showPassword: boolean,
  handleValidatedInput: (name: string, value: string, valid: boolean) => void,
  passwordPlaceholder: string,
};

const WrappedInputPassword = ({ showPassword, handleValidatedInput, passwordPlaceholder }: EnhancedInputPasswordProps) => (
  <InputPassword
    name="password"
    showPassword={showPassword}
    placeholder={passwordPlaceholder}
    showLabel={true}
    onValidate={handleValidatedInput}
  />
);

const EnhancedInputPassword = EyeIconEnhancer()(WrappedInputPassword);

export default class SignUpForm extends React.Component {
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
      hubspotSubscribe: false,
    };
  }

  componentWillReceiveProps = (newProps: Props) => {
    if (this.props.isFingerprintLoaded !== newProps.isFingerprintLoaded) {
      addFingerprint('signUpForm');
    }
  };

  static props: Props;

  static state: State;

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { form, canSubmit, hubspotSubscribe } = this.state;
    const { onSubmit } = this.props;

    if (canSubmit === true) {
      const fingerprint = getFingerprintFromForm('signInForm');

      const value = {
        first_name: form.first_name.value,
        email: form.email.value,
        email_confirmation: form.email_confirmation.value,
        password: form.password.value,
        hubspot_subscribe: hubspotSubscribe,
        fingerprint,
        socialType: '',
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
      Object.keys(newState.form)
      .forEach((index) => {
        if (newState.form[index].valid !== true) {
          canSubmit = false;
        }
      });
    }

    this.setState({ form: newState.form, canSubmit });
  };

  handleCheckedStateChanged = (event) => {
    this.setState({
      hubspotSubscribe: event.target.checked,
    });
  };

  render() {
    const { canSubmit, form, hubspotSubscribe } = this.state;
    const {
      errorMessage, isLoading, locale: {
        TITLE,
        FULL_NAME_PLACEHOLDER,
        EMAIL_PLACEHOLDER,
        CONFIRM_EMAIL_PLACEHOLDER,
        PASSWORD_PLACEHOLDER,
        BUTTON_TITLE,
      },
      isMobile,
    } = this.props;

    return (
      <div className="authentication__block">
        <BlockTitle>{TITLE}</BlockTitle>
        <hr />
        <form className="authentication__block__form" id="signUpForm" onSubmit={this.handleSubmit}>
          <InputFullName
            name="first_name"
            placeholder={FULL_NAME_PLACEHOLDER}
            showLabel={true}
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email"
            placeholder={EMAIL_PLACEHOLDER}
            showLabel={true}
            onValidate={this.handleValidatedInput}
          />
          <InputEmail
            name="email_confirmation"
            placeholder={CONFIRM_EMAIL_PLACEHOLDER}
            equalsTo={form.email.value}
            showLabel={true}
            onValidate={this.handleValidatedInput}
          />
          <EnhancedInputPassword
            passwordPlaceholder={PASSWORD_PLACEHOLDER}
            handleValidatedInput={this.handleValidatedInput}
          />
          <ErrorField message={errorMessage} />
          <Button
            type="submit"
            name="sign_in"
            kind="success"
            isLoading={isLoading}
            disabled={!canSubmit}
          >
            {BUTTON_TITLE}
          </Button>
          <section className="authentication__block__form__footer">
            <label>
              <CheckBox
                checked={hubspotSubscribe}
                onChange={this.handleCheckedStateChanged}
              />
              <span>Quero receber ofertas exclusivas e novidades por e-mail</span>
            </label>
          </section>
        </form>
        {!isMobile && <TermsAndPolicyBlock />}
      </div>
    );
  }
}
