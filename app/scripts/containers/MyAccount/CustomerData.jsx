// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert2';
import { shouldComponentUpdate } from 'utils/helpers';
import { Input } from 'quarks/Inputs';
import { InputPassword, InputRegex, InputCpf, InputCnpj, InputStateRegistration } from 'quarks/Inputs/Validatable';
import { Select } from 'atoms/Inputs';
import Loading from 'components/Loading';
import { accountUpdate, accountFetch, accountFormReset } from 'actions';

type FormType = {
  phone: { valid: boolean, value: string },
  cnpj: { valid: boolean, value: string },
  cpf: { valid: boolean, value: string },
  current_password: { valid: boolean, value: string },
  new_password: { valid: boolean, value: string },
  new_password_repeat: { valid: boolean, value: string },
};

type Props = {
  account: {},
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
      ...props.account,
      activeForm: 'person',
      form: {
        phone: { valid: false, value: '' },
        cnpj: { valid: false, value: '' },
        cpf: { valid: false, value: '' },
        current_password: { valid: false, value: '' },
        new_password: { valid: false, value: '' },
        new_password_repeat: { valid: false, value: '' },
      },
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
            title: 'Successfully saved.',
            type: 'success',
            confirmButtonColor: '#2cac57',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        }
      }

      this.setState({
        ...nextProps.account,
        form: {
          phone: { valid: true, value: account.phone },
          cnpj: { valid: true, value: account.cnpj },
          cpf: { valid: true, value: account.cpf },
          current_password: { valid: true, value: '' },
          new_password: { valid: true, value: '' },
          new_password_repeat: { valid: true, value: '' },
        },
        canSubmit: true,
      });
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

  handleChangeName = (e) => {
    const names = e.target.value.split(' ');
    this.setState({
      first_name: names[0],
      last_name: names[1],
    });
  }

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
  }

  handleSubmit = () => {
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
  }

  handleSelection = () => {
    this.setState({
      activeForm: (this.state.activeForm === 'person' ? 'enterprise' : 'person'),
    });
  }

  renderPersonalData() {
    const { first_name, last_name, gender, cloud_manager, form } = this.state;
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={`${first_name} ${last_name}`}
          onChange={this.handleChangeName}
          onEnterKeyPress={this.handleSubmit}
        />
        <InputCpf
          id="cpf"
          name="cpf"
          placeholder={'CPF'}
          className="atm-checkout-input atm-checkout-input-one"
          showLabel
          value={form.cpf.value}
          onValidate={this.handleValidatedInput}
          onEnterKeyPress={this.handleSubmit}
          required
        />
        <InputRegex
          id="phone"
          name="phone"
          type="text"
          placeholder={'Telefone'}
          pattern={/^[(]([0-9]){2}[)][ ]([0-9]){5}[-]([0-9]){4}$/}
          className="atm-checkout-input atm-checkout-input-one"
          showLabel
          value={form.phone.value}
          onValidate={this.handleValidatedInput}
          onEnterKeyPress={this.handleSubmit}
          required
        />
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-gender"
          showLabel={true}
          id="data-pane-gender"
          placeholder="Sexo"
          value={gender}
          onChange={(e) => { this.setState({ gender: e.target.value }); }}
          required={true}
        >
          <option value={'M'}>Masculino</option>
          <option value={'F'}>Feminino</option>
        </Select>
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-area"
          showLabel={true}
          id="data-pane-area"
          placeholder="Área de Atuação"
          value={cloud_manager}
          onChange={(e) => { this.setState({ cloud_manager: e.target.value }); }}
          required={true}
        >
          <option value={1}>Gráfica</option>
          <option value={2}>Agência</option>
        </Select>
      </form>
    );
  }

  renderEnterpriseData() {
    const { first_name, last_name, company_name, employee_number, state_registration, id_state_registration, form } = this.state;
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={`${first_name} ${last_name}`}
          onChange={this.handleChangeName}
          onEnterKeyPress={this.handleSubmit}
        />
        <InputCnpj
          id="cnpj"
          name="cnpj"
          placeholder={'CNPJ'}
          className="atm-checkout-input atm-checkout-input-one"
          showLabel
          value={form.cnpj.value}
          onValidate={this.handleValidatedInput}
          onEnterKeyPress={this.handleSubmit}
          required
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Razão Social"
          value={company_name}
          onChange={(e) => { this.setState({ company_name: e.target.value }); }}
          onEnterKeyPress={this.handleSubmit}
        />
        <InputRegex
          id="phone"
          name="phone"
          type="text"
          placeholder={'Telefone'}
          pattern={/^[(]([0-9]){2}[)][ ]([0-9]){5}[-]([0-9]){4}$/}
          className="atm-checkout-input atm-checkout-input-one"
          showLabel
          value={form.phone.value}
          onValidate={this.handleValidatedInput}
          onEnterKeyPress={this.handleSubmit}
          required
        />
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-area"
          showLabel
          id="data-pane-area"
          placeholder="Área de Atuação"
          required={true}
        >
          <option value={1}>Gráfica</option>
          <option value={2}>Agência</option>
        </Select>
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-collaborators"
          showLabel
          id="data-pane-collaborators"
          placeholder="Número de funcionários"
          value={employee_number}
          onChange={(e) => { this.setState({ employee_number: e.target.value }); }}
          required={true}
        >
          <option value={'1'}>1</option>
          <option value={'2'}>2</option>
        </Select>
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-state"
          showLabel
          id="data-pane-state"
          placeholder="Inscrição Estadual"
          value={state_registration}
          onChange={(e) => { this.setState({ state_registration: e.target.value }); }}
          required={true}
        >
          <option value={'Isento'}>Isento</option>
          <option value={'sp'}>SP</option>
          <option value={'rj'}>RJ</option>
        </Select>
        {state_registration !== 'Isento' && <InputStateRegistration
          showLabel
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Número Inscrição"
          value={id_state_registration}
          state_registration={state_registration}
          onEnterKeyPress={this.handleSubmit}
        />}
      </form>
    );
  }

  renderForm() {
    const { activeForm } = this.state;

    return (
      <div>
        <div className="mol-account-data-pane-choser">
          Se quiser trocar para uma conta com dados de {activeForm === 'person' ? 'pessoa jurídica' : 'pessoa física'},
          <a onClick={this.handleSelection}>clique aqui.</a>
        </div>
        {activeForm === 'person' ? this.renderPersonalData() : this.renderEnterpriseData()}
        <h3 className="atm-myorder-title mar-top-20">Alterar senha</h3>
        <form className="org-checkout-content-data">
          <InputPassword
            id="current_password"
            name="current_password"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Senha atual"
            onValidate={this.handleValidatedInput}
            value={this.state.current_password}
            onChange={(e) => { this.setState({ current_password: e.target.value }); }}
            onEnterKeyPress={this.handleSubmit}
          />
          <InputPassword
            id="new_password"
            name="new_password"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Nova senha"
            onValidate={this.handleValidatedInput}
            value={this.state.new_password}
            onChange={(e) => { this.setState({ new_password: e.target.value }); }}
            onEnterKeyPress={this.handleSubmit}
          />
          <InputPassword
            id="new_password_repeat"
            name="new_password_repeat"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Confirme sua nova senha"
            equalsTo={this.state.new_password}
            onValidate={this.handleValidatedInput}
            value={this.state.new_password_repeat}
            onChange={(e) => { this.setState({ new_password_repeat: e.target.value }); }}
            onEnterKeyPress={this.handleSubmit}
          />
        </form>
        <div className="mol-checkout-pane-footer mol-account-pane-footer">
          <button onClick={this.handleSubmit} className="atm-send-button">SALVAR ALTERAÇÕES</button>
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
    locale: state.locale.translate.account.my_register_data,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);

