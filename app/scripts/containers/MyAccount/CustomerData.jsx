// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert2';
import { shouldComponentUpdate } from 'utils/helpers';
import { Ninput } from 'components/Input';
import Loading from 'components/Loading';
import { accountUpdate, accountFetch, accountFormReset } from 'actions';
import CustomerDataForm from 'components/CustomerData';

type FormType = {
  phone: { valid: boolean, value: string },
  cnpj: { valid: boolean, value: string },
  cpf: { valid: boolean, value: string },
  current_password: { valid: boolean, value: string },
  new_password: { valid: boolean, value: string },
  new_password_repeat: { valid: boolean, value: string },
};

type Props = {
  account: AccountLocaleType,
  locale: {},
  setBreadcrumbs: () => void,
  dispatch: () => {},
};

type State = {
  activeForm: string,
  canSubmit: boolean,
  form: FormType,
};

export class CustomerData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.account.type || 'PF',
      full_name: {
        valid: false,
        value: props.account.last_name ? `${props.account.first_name} ${props.account.last_name}` : props.account.first_name,
      },
      email: {
        valid: false,
        value: props.account.email,
      },
      phone: {
        valid: false,
        value: props.account.phone,
      },
      cpf: {
        valid: false,
        value: props.account.cpf,
      },
      gender: {
        valid: false,
        value: props.account.gender,
      },
      work_field: {
        valid: !!props.account.work_field,
        value: props.account.work_field,
      },
      cnpj: {
        valid: false,
        value: props.account.cnpj,
      },
      trading_name: {
        valid: false,
        value: props.account.trading_name,
      },
      employee_number: {
        valid: !!props.account.employee_number,
        value: props.account.employee_number,
      },
      id_state_registration: {
        valid: !!props.account.id_state_registration,
        value: props.account.id_state_registration,
      },
      current_password: { valid: false, value: '' },
      new_password: { valid: false, value: '' },
      new_password_repeat: { valid: false, value: '' },
      canSubmit: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountFetch());
    this.handleBreadcrumbs();
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    const { dispatch } = this.props;

    if (account !== this.props.account) {
      if (!account.isUpdating && account.isUpdated) {
        dispatch(accountFormReset());
        if (account.error) {
          swal({
            title: account.error.message === 'page.customer.error.password_change.CURRENT_PASSWORD_MISMATCH' ? 'Current password is not correct!' : account.error.message,
            type: 'error',
            confirmButtonColor: '#2cac57',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        } else {
          swal({
            title: 'Salvo com sucesso!',
            type: 'success',
            confirmButtonColor: '#2cac57',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        }
      }
    }
  }

  static props: Props;
  static state: State;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs, locale } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: locale.TITLE,
        },
      ]);
    }
  };

  handleValidatedInput = (name, value, valid) => {
    const { form } = this.state;
    const newState = { form };
    const target = name.target;
    const key = target ? target.id : name;

    let canSubmit = true;
    newState.form[key].valid = target ? !!target.value : valid;
    newState.form[key].value = target ? target.value : value;

    const updateState = {};
    updateState[key] = newState.form[key].value;
    this.setState(updateState);
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

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.canSubmit) {
      const { dispatch } = this.props;
      const { form } = this.state;

      const dataToUpdate = this.state;

      delete dataToUpdate.change_password;

      if (form.current_password.value !== '' && form.new_password.value !== '' && form.new_password_repeat.value !== '') {
        dataToUpdate.change_password = {
          current_password: form.current_password.value,
          new_password: form.new_password.value,
          new_password_repeat: form.new_password_repeat.value,
        };
      }

      dispatch(accountUpdate(dataToUpdate));
    }
  };

  handleSelection = (): void => {
    this.setState({
      type: this.state.type === 'PF' ? 'PJ' : 'PF',
    });
  };

  handleChange = (input: string, valid: boolean, value: string): void => {
    this.setState({
      [input]: {
        value,
        valid,
      },
    });
  };

  handlePasswordValidation = (password_repeat: string): boolean => {
    const { new_password } = this.state;

    return new_password.value === password_repeat;
  };

  renderForm() {
    const { locale } = this.props;
    const { type } = this.state;

    return (
      <div>
        <CustomerDataForm
          activeType={type}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <h3 className="atm-myorder-title mar-top-20">{locale.CHANGE_PASSWORD}</h3>
        <form className="org-checkout-content-data">
          <Ninput
            type="password"
            name="current_password"
            id="current_password"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder={locale.CURRENT_PASSWORD}
            required
            onChange={(isValid, value) => this.handleChange('current_password', isValid, value)}
            onEnterKeyPress={this.handleSubmit}
          />
          <Ninput
            type="password"
            name="new_password"
            id="new_password"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder={locale.NEW_PASSWORD}
            required
            onChange={(isValid, value) => this.handleChange('new_password', isValid, value)}
            onEnterKeyPress={this.handleSubmit}
          />
          <Ninput
            type="password"
            name="new_password_repeat"
            id="new_password_repeat"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder={locale.REPEAT_NEW_PASSWORD}
            required
            onChange={(isValid, value) => this.handleChange('new_password_repeat', isValid, value)}
            checkValidation={this.handlePasswordValidation}
            onEnterKeyPress={this.handleSubmit}
          />
        </form>
        {locale.COUNTRY_CODE === 'BR' &&
          <div className="mol-account-data-pane-choser">
            Se quiser trocar para uma conta com dados de {type === 'PF' ? 'pessoa jurídica' : 'pessoa física'},
            <button className="atm-link-button" onClick={this.handleSelection}>clique aqui.</button>
          </div>
        }
        <div className="mol-checkout-pane-footer mol-account-pane-footer">
          <button onClick={this.handleSubmit} className="atm-send-button">{locale.SAVE}</button>
        </div>
      </div>
    );
  }

  renderItems() {
    const { account } = this.props;

    if (!account.isLoaded || account.isRunning) {
      return <Loading />;
    }

    return this.renderForm();
  }

  render() {
    const { locale } = this.props;

    return (
      <div>
        <h3 className="atm-myorder-title">{locale.TITLE}</h3>
        {this.renderItems()}
        <Helmet>
          <title>{locale.seo.PAGE_TITLE}</title>
          <meta name="description" content={locale.seo.META_DESCRIPTION} />
        </Helmet>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    locale: {
      ...state.locale.translate.account.my_register_data,
      COUNTRY_CODE: state.locale.COUNTRY_CODE,
      SAVE: state.locale.translate.form.common.SAVE,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);

