// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { BoxRadio, Select } from 'atoms/Inputs';
import { ErrorText } from 'atoms/Texts';
import { CheckBox } from 'components/Input';
import Loading from 'components/Loading';
import { NavLink, Link } from 'react-router-dom';
import { accountUpdate } from 'actions';

type Props = {
  screenSize: string,
  account: {},
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

  static defaultProps = {
    screenSize: 'xs',
  };
  
  static props: Props;

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    if (account) {
      this.setState({
        ...nextProps.account,
      });
    }
  }

  handleChangeName = (e) => {
    let names = e.target.value.split(' ');
    this.setState({
      first_name: names[0],
      last_name: names[1],
    });
  }

  handleClick = () => {
    const { dispatch } = this.props;

    const { id, first_name, last_name, cpf, phone, gender, cloud_manager, cnpj, company_name, employee_number, state_registration, current_password, new_password, new_password_repeat } = this.state;
    
    this.setState({
      error: null,
    });

    let dataToUpdate = {
      id, 
      first_name,
      last_name,
      cpf,
      phone, 
      gender, 
      cloud_manager, 
      cnpj, 
      company_name, 
      employee_number, 
      state_registration,
    };

    if (current_password !== '' && new_password !== '' && new_password_repeat !== '') {
      dataToUpdate.change_password = {
        current_password: current_password,
        new_password: new_password,
        new_password_repeat: new_password_repeat
      };

      if (new_password !== new_password_repeat) {
        this.setState({
          error: 'Password does not match!'
        });
        return;
      }
    }

    dispatch(accountUpdate(dataToUpdate));
  }

  handleSelection = (ev) => {
    this.setState({
      activeForm: ev.currentTarget.value,
    });
  }

  renderPersonalData() {
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={this.state.first_name + ' ' + this.state.last_name}
          onChange={this.handleChangeName}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CPF"
          value={this.state.cpf}
          onChange={(e) => { this.setState({ cpf: e.target.value }); }}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone"
          value={this.state.phone}
          onChange={(e) => { this.setState({ phone: e.target.value }); }}
        />
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-gender"
          showLabel={true}
          id="data-pane-gender"
          placeholder="Sexo"
          value={this.state.gender}
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
          value={this.state.cloud_manager}
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
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
          value={this.state.first_name + ' ' + this.state.last_name}
          onChange={this.handleChangeName}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CNPJ"
          value={this.state.cnpj}
          onChange={(e) => { this.setState({ cnpj: e.target.value }); }}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Razão Social"
          value={this.state.company_name}
          onChange={(e) => { this.setState({ company_name: e.target.value }); }}
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone/Celular"
          value={this.state.phone}
          onChange={(e) => { this.setState({ phone: e.target.value }); }}
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
          value={this.state.employee_number}
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
          value={this.state.state_registration}
          onChange={(e) => { this.setState({ state_registration: e.target.value }); }}
          required={true}
        >
          <option value={'sp'}>SP</option>
          <option value={'rj'}>RJ</option>
        </Select>
      </form>
    );
  }

  renderForm() {
    const { activeForm, error } = this.state;
    const { account } = this.props;

    let errorMessage;
    if (account.error || error) {
      errorMessage = (
        <div className="mol-checkout-pane-footer">
          <ErrorText>{account.error ? account.error.message : error}</ErrorText>
        </div>
      );
    }

    return (
      <div>
        <h3 className="title-myData">Meus dados</h3>


        <div className="mol-data-pane-choser">
          <BoxRadio
            value="person"
            onChange={this.handleSelection}
            name="pane-type"
            checked={activeForm === 'person'}
          >
            Pessoa Física
          </BoxRadio>
          <BoxRadio
            value="enterprise"
            onChange={this.handleSelection}
            name="pane-type"
            checked={activeForm === 'enterprise'}
          >
            Pessoa Jurídica
          </BoxRadio>
        </div>
        {activeForm === 'person' ? this.renderPersonalData() : this.renderEnterpriseData()}

        <h4 className="title-changePass">Mudar senha</h4>
        <form className="org-checkout-content-data">
          <InputPassword
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Senha atual"
            onValidate={this.handleValidatedInput}
            value={this.state.current_password}
            onChange={(e) => { this.setState({ current_password: e.target.value }); }}
          />
          <InputPassword
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Nova senha"
            onValidate={this.handleValidatedInput}
            value={this.state.new_password}
            onChange={(e) => { this.setState({ new_password: e.target.value }); }}
          />
          <InputPassword
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-one"
            name="password"
            placeholder="Confirme sua nova senha"
            onValidate={this.handleValidatedInput}
            value={this.state.new_password_repeat}
            onChange={(e) => { this.setState({ new_password_repeat: e.target.value }); }}
          />
        </form>

        {errorMessage}

        <div className="mol-checkout-pane-footer">
          <NavLink className="atm-go-back-link" to="#">Cancelar</NavLink>
          <button value={2} onClick={this.handleClick} className="atm-send-button">Continuar</button>
        </div>


        <div className="container-changeDatas">
          <p className="text-changeDatas">Se quiser trocar para uma conta com dados de pessoa física, <Link to="#">clique aqui.</Link></p>
        </div>
      </div>
    );
  }

  renderMobile() {

    const { account } = this.props;

    return (
      <div className="container-myData">
        <div className="container">
          <h2>Minha conta</h2>
          <h3 className="title-myData">Meus dados</h3>
          {!account.isLoaded || account.isRunning ? <Loading /> : this.renderForm()}
        </div>
      </div>
    );
  }

  renderDesktop() {

    const { account } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus dados',
      },
    ];

    return (
      <div className="container-myData">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        {!account.isLoaded || account.isRunning ? <Loading /> : this.renderForm()}
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);

