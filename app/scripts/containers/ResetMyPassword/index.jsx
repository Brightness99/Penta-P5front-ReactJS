// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { push } from 'modules/ReduxRouter';
import swal from 'sweetalert2';
import { InputPassword, EyeIconEnhancer } from 'quarks/Inputs/Validatable';
import * as ForgotPasswordAction from 'actions/forgot-password';
import { Button } from 'quarks/Inputs';
import ErrorField from 'components/ErrorField';
import Loading from 'components/Loading';
import { shouldComponentUpdate, isEmpty } from 'utils/helpers';

type Props = {
  setNewPassword: (password: string, hash: string) => void,
  forgotPassword: ForgotPasswordType,
  getExpiredInfo: (hash: string) => void,
  hash: string,
  user: UserType,
};

type State = {
  form: {
    password: { value: string, valid: boolean },
    confirmPassword: { value: string, valid: boolean },
  },
  canSubmit: boolean,
  canShowError: boolean,
};

const errorMap = new Map()
.set('different-passwords', 'As senhas são diferentes')
.set('weak-password', 'As senhas devem conter letras e dígitos (comprimento pelo menos 7)');

const getErrorKey = (password: string, confirmPassword: string) => {
  let key = '';
  if (password && !password.match(/^([a-zA-Z0-9_-]){7,99}$/)) {
    key = 'weak-password';
  } else if (password !== confirmPassword) {
    key = 'different-passwords';
  }
  return key;
};

const getErrorMessage = (password: string, confirmPassword: string, message: string) => {
  const key = getErrorKey(password, confirmPassword);
  const error = errorMap.get(key);
  return error || message;
};

type PasswordInputsProps = {
  passwordValue: string,
  confirmPasswordValue: string,
  handleValidatedInput: (name: string, value: string, valid: boolean) => void,
  showPassword: boolean,
};

const PasswordInputs = ({ passwordValue, confirmPasswordValue, handleValidatedInput, showPassword }: PasswordInputsProps) => (
  <section>
    <InputPassword
      id="password"
      name="password"
      placeholder={'Nova senha'}
      showLabel={true}
      required={true}
      value={passwordValue}
      isOldRulesForPassword={true}
      showPassword={showPassword}
      onValidate={handleValidatedInput}
    />
    <InputPassword
      id="confirmPassword"
      name="confirmPassword"
      placeholder={'Confirme a senha'}
      showLabel={true}
      required={true}
      value={confirmPasswordValue}
      isOldRulesForPassword={true}
      showPassword={showPassword}
      onValidate={handleValidatedInput}
    />
  </section>
);

const EnhancedPasswordInputs = EyeIconEnhancer()(PasswordInputs);

export class ResetMyPassword extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        password: { value: '', valid: false },
        confirmPassword: { value: '', valid: false },
      },
      canSubmit: false,
      canShowError: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;


  componentDidMount() {
    this.props.getExpiredInfo(this.props.hash);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { forgotPassword: { error = {} } } = nextProps;
    const { forgotPassword: { isRunning, data } } = this.props;

    if (!isRunning || isEmpty(data.usable)) {
      return;
    }

    if (error.message) {
      const config = {
        title: 'Ops...',
        text: 'Algo dá errado, tente novamente',
        type: 'warning',
        confirmButtonText: 'Voltar',
        confirmButtonColor: '#2cac57',
        showCancelButton: false,
      };
      swal(config);
      return;
    }

    const config = {
      title: 'Pronto!',
      text: 'Senha redefinida com sucesso!',
      type: 'success',
      confirmButtonText: 'Fazer login',
      confirmButtonColor: '#2cac57',
      cancelButtonText: 'Ir para a home',
      showCancelButton: true,
      reverseButtons: true,
    };
    swal(config)
    .then((done) => {
      if (done) {
        push('/login-cadastro');
        return;
      }
      push('/');
    })
    .catch(() => push('/'));
  }

  static props: Props;
  static state: State;

  handleValidatedInput = (name: string, value: string, valid: boolean) => {
    const form = Object.assign({}, this.state.form);
    form[name] = { value, valid };
    let canSubmit = true;
    Object.keys(form)
    .forEach((index) => {
      if (form[index].valid !== true) {
        canSubmit = false;
      }
    });
    this.setState({ form, canSubmit, canShowError: false });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state.form;
    const message = getErrorMessage(password.value, confirmPassword.value);
    if (!message) {
      this.props.setNewPassword(password.value, this.props.hash);
      return;
    }
    this.setState({ canShowError: true });
  };

  renderExpiredResetLink = () => (
    <section className="container expired__container">
      <h3 className="expired__link-title">{'OOPS...'}</h3>
      <span className="expired__reasons-title">
        {'Esta solicitação para redefinição de senha não é válida! Algumas razões para isso podem ser:'}
      </span>
      <ul className="expired__reasons">
        <li>{'Você está acessando este link através de outro computador'}</li>
        <li>{'A solicitação expirou (cada uma tem prazo de 5h)'}</li>
        <li>{'Este link já foi utilizado para redefinir sua senha'}</li>
      </ul>
      <span className="expired__recommendations">
        {'Independente do motivo, recomendamos que você faça uma '}
        <NavLink
          to={'/esqueci-minha-senha'}
          className="expired__new-try"
        >
          {'nova tentativa'}
        </NavLink>
        {' se atentando aos pontos acima!'}
      </span>
    </section>
  );

  render() {
    const { form, canSubmit, canShowError } = this.state;
    const { forgotPassword: { isRunning, error = {}, data }, user } = this.props;

    if (user.isRunning || isRunning) {
      return <Loading />;
    }

    if (data.usable === false) {
      return this.renderExpiredResetLink();
    }

    const confirmPasswordValue = form.confirmPassword.value;
    const passwordValue = form.password.value;

    return (
      <section className="reset-password-container">
        <section className="container">
          <section className="reset-password-sub-container">
            <h3 className="atm-title">
              {'Redefinição de senha'}
            </h3>
            <form className="form-reset-password" onSubmit={this.handleSubmit}>
              <EnhancedPasswordInputs
                passwordValue={passwordValue}
                confirmPasswordValue={confirmPasswordValue}
                handleValidatedInput={this.handleValidatedInput}
                title={'Visualizar senha'}
              />
              <Button
                type="submit"
                kind="success"
                isLoading={isRunning}
                disabled={!canSubmit}
              >
                {'OK'}
              </Button>
              {
                canShowError &&
                <ErrorField message={getErrorMessage(passwordValue, confirmPasswordValue, error.message)} />
              }
            </form>
          </section>
        </section>
      </section>
    );
  }
}

const mapState = state => ({
  forgotPassword: state.forgotPassword,
  user: state.user,
});

const mapDispatch = dispatch => bindActionCreators(ForgotPasswordAction, dispatch);

export default connect(mapState, mapDispatch)(ResetMyPassword);
