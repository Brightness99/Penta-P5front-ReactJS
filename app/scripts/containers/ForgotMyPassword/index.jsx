// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'modules/ReduxRouter';
import swal from 'sweetalert2';
import * as ForgotPasswordActions from 'actions/forgot-password';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { InputEmail } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import { shouldComponentUpdate, isEmpty } from 'utils/helpers';

type Props = {
  resetPassword: (email: string) => void,
  forgotPassword: ForgotPasswordType,
  user: UserType,
};

type State = {
  form: {
    data: { valid: boolean, value: string },
  },
  canSubmit: boolean,
};

const getEmailAlertConfig = (exists: boolean) => (
  exists ? {
    title: 'Pronto!',
    text: 'Se o email informado estiver correto, você receberá uma mensagem para redefinir sua senha!',
    type: 'success',
    confirmButtonText: 'Fazer login',
    confirmButtonColor: '#2cac57',
    showCancelButton: false,
  } : {
    title: 'Ops...',
    text: 'Este e-mail não está cadastrado em nosso site',
    type: 'warning',
    confirmButtonText: 'Voltar',
    confirmButtonColor: '#2cac57',
    showCancelButton: false,
  }
);

export class ForgotMyPassword extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        data: { valid: false, value: '' },
      },
      canSubmit: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps: Props) {
    const { forgotPassword: { data } } = nextProps;
    const { forgotPassword: { isRunning } } = this.props;
    const { exists } = data;

    if (isEmpty(exists) || !isRunning) {
      return;
    }
    const config = getEmailAlertConfig(exists);
    swal(config)
    .then(() => {
      if (exists) {
        push('/login-cadastro');
      }
    });
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
    this.setState({ form, canSubmit });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const { form } = this.state;
    this.props.resetPassword(form.data.value);
  };

  render() {
    const { form, canSubmit } = this.state;
    const { forgotPassword, user } = this.props;
    const { isRunning, data: { exists } } = forgotPassword;

    if (user.isRunning) {
      return <Loading />;
    }

    return (
      <section className="tpl-forgot-password">
        <section className="container">
          <section className="mol-forgot-password">
            <h3 className="atm-title">
              {'Esqueci minha senha'}
            </h3>
            <hr />
            <p className="atm-subtitle">
              {
                exists ? 'Insira a nova senha:' : 'Digite seu e-mail no campo abaixo para recuperar sua senha:'
              }
            </p>
            <form onSubmit={this.handleSubmit}>
              <InputEmail
                id="data"
                name="data"
                placeholder={'E-mail'}
                value={form.data.value}
                defaultValue={form.data.value}
                showLabel={true}
                onValidate={this.handleValidatedInput}
              />
              <Button
                type="submit"
                kind="success"
                isLoading={isRunning}
                disabled={!canSubmit}
              >
                {'Enviar'}
              </Button>
            </form>
            <p className="atm-back-login">
              {'Voltar e fazer '}<Link to="/login-cadastro">{'login'}</Link>
            </p>
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

const mapDispatch = dispatch => bindActionCreators(ForgotPasswordActions, dispatch);

export default connect(mapState, mapDispatch)(ForgotMyPassword);
