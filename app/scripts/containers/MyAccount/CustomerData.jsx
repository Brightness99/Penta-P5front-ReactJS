// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { shouldComponentUpdate } from 'utils/helpers';
import { Input } from 'quarks/Inputs';
import { InputPassword } from 'quarks/Inputs/Validatable';
import { Select } from 'atoms/Inputs';
import { ErrorText, SuccessText } from 'atoms/Texts';
import Loading from 'components/Loading';
import { accountUpdate, accountFetch } from 'actions';

type Props = {
  account: {},
  locale: {},
  setBreadcrumbs: () => void,
  dispatch: () => {},
};

type State = {
  activeForm: string,
};

export class CustomerData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.account,
      current_password: '',
      new_password: '',
      new_password_repeat: '',
      activeForm: 'person',
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
    if (account !== this.props.account) {
      this.setState({
        ...nextProps.account,
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

  handleClick = () => {
    const { dispatch } = this.props;
    const { current_password, new_password, new_password_repeat } = this.state;
    this.setState({
      error: null,
    });

    const dataToUpdate = this.state;

    delete dataToUpdate.change_password;

    if (current_password !== '' && new_password !== '' && new_password_repeat !== '') {
      dataToUpdate.change_password = {
        current_password,
        new_password,
        new_password_repeat,
      };

      if (new_password !== new_password_repeat) {
        this.setState({
          error: 'Password does not match!',
        });
        return;
      }
    }

    dispatch(accountUpdate(dataToUpdate));
  }

  handleSelection = () => {
    this.setState({
      activeForm: (this.state.activeForm === 'person' ? 'enterprise' : 'person'),
    });
  }

  renderPersonalData() {
    const { first_name, last_name, cpf, phone, gender, cloud_manager } = this.state;
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={`${first_name} ${last_name}`}
          onChange={this.handleChangeName}
          onEnterKeyPress={this.handleClick}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => { this.setState({ cpf: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => { this.setState({ phone: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
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
    const { first_name, last_name, cnpj, company_name, phone, employee_number, state_registration, id_state_registration } = this.state;
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={`${first_name} ${last_name}`}
          onChange={this.handleChangeName}
          onEnterKeyPress={this.handleClick}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => { this.setState({ cnpj: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Razão Social"
          value={company_name}
          onChange={(e) => { this.setState({ company_name: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone/Celular"
          value={phone}
          onChange={(e) => { this.setState({ phone: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
        />
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-area"
          showLabel={true}
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
          showLabel={true}
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
          showLabel={true}
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
        {state_registration !== 'Isento' && <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Número Inscrição"
          value={id_state_registration}
          onChange={(e) => { this.setState({ id_state_registration: e.target.value }); }}
          onEnterKeyPress={this.handleClick}
        />}
      </form>
    );
  }

  renderForm() {
    const { activeForm, error } = this.state;
    const { account } = this.props;
    let errorMessage;
    if (account.error) {
      errorMessage = (account.error.message === 'page.customer.error.password_change.CURRENT_PASSWORD_MISMATCH' ? 'Current password is not correct!' : account.error.message);
    } else {
      errorMessage = error;
    }

    let errorMessageElement;
    if (account.error || error) {
      errorMessageElement = (
        <div className="mol-checkout-pane-footer">
          <ErrorText>{errorMessage}</ErrorText>
        </div>
      );
    }

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
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Senha atual"
            onValidate={this.handleValidatedInput}
            value={this.state.current_password}
            onChange={(e) => { this.setState({ current_password: e.target.value }); }}
            onEnterKeyPress={this.handleClick}
          />
          <InputPassword
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Nova senha"
            onValidate={this.handleValidatedInput}
            value={this.state.new_password}
            onChange={(e) => { this.setState({ new_password: e.target.value }); }}
            onEnterKeyPress={this.handleClick}
          />
          <InputPassword
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Confirme sua nova senha"
            onValidate={this.handleValidatedInput}
            value={this.state.new_password_repeat}
            onChange={(e) => { this.setState({ new_password_repeat: e.target.value }); }}
            onEnterKeyPress={this.handleClick}
          />
        </form>
        {errorMessageElement}
        {!account.isUpdating && account.isUpdated && !account.error && !error && <div className="mol-checkout-pane-footer">
          <SuccessText>Successfully saved.</SuccessText>
        </div>}
        <div className="mol-checkout-pane-footer mol-account-pane-footer">
          <button value={2} onClick={this.handleClick} className="atm-send-button">SALVAR ALTERAÇÕES</button>
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

