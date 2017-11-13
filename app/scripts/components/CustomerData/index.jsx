// @flow

import React from 'react';
import { connect } from 'react-redux';
import ie from 'inscricaoestadual';
import { shouldComponentUpdate, validateCpf, validateCnpj, validateEmail } from 'utils/helpers';
import { Ninput } from 'components/Input';
import { Select } from 'atoms/Inputs';

type Props = {
  account: AccountType,
  locale: LocaleType,
  idStateRegistration: string,
  activeType: string,
  onChange: (input: string, valid: boolean, value: string) => void,
  onSubmit: (ev) => void,
};

type State = {
  selectedStateId: string,
};

export class CustomerDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStateId: props.account.id_state_registration,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps: Props): void {
    const { activeType } = this.props;

    if (nextProps.activeType !== activeType) {
      this.setState({
        selectedStateId: nextProps.account.id_state_registration,
      });
    }
  }

  static props: Props;
  static state: State;

  handleChange = (input: string, valid: boolean, value: string): void => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(input, valid, value);
    }
  };

  handleSubmit = (ev) => {
    const { onSubmit } = this.props;

    if (typeof onSubmit === 'function') {
      onSubmit(ev);
    }
  };

  handleStateChange = (input: string, valid: boolean, value: string): void => {
    this.setState({
      selectedStateId: value,
    });

    this.handleChange(input, valid, value);
  };

  renderWorkingFields(): Array<> {
    const working_fields = {
      1001: 'Academia e Fitness',
      1002: 'Advocacia',
      1003: 'Arquitetura',
      1004: 'Comunicação e Marketing',
      1005: 'Consultoria',
      1006: 'Design / Fotografia',
      1007: 'Engenharia',
      1008: 'Estética e bem estar',
      1009: 'Fisioterapia',
      1010: 'Imobiliárias e construtoras',
      1011: 'Informática',
      1012: 'Medicina',
      1013: 'Odontologia',
      1014: 'Veterinária / Pet',
      1015: 'Outros',
    };

    return Object.keys(working_fields).map((key) => <option key={key} value={key}>{working_fields[key]}</option>);
  }

  renderStates(): Array<> {
    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    return states.map((state) => (<option key={state} value={state}>{state}</option>));
  }

  renderPersonal(): Array<> {
    const { account } = this.props;

    return [
      <Ninput
        name="full_name"
        key="personal-form-full_name"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Nome Completo"
        value={account.last_name ? `${account.first_name} ${account.last_name}` : account.first_name}
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('full_name', isValid, value)}
      />,
      <Ninput
        name="email"
        key="personal-form-email"
        className="atm-checkout-input atm-checkout-input-one"
        value={account.email}
        placeholder="E-mail"
        required
        onEnterKeyPress={this.handleSubmit}
        checkValidation={validateEmail}
        onChange={(isValid, value) => this.handleChange('email', isValid, value)}
      />,
      <Ninput
        name="cpf"
        key="personal-form-cpf"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="CPF"
        value={account.cpf}
        pattern="999.999.999-99"
        required
        onEnterKeyPress={this.handleSubmit}
        checkValidation={validateCpf}
        onChange={(isValid, value) => this.handleChange('cpf', isValid, value)}
      />,
      <Ninput
        name="phone"
        key="personal-form-phone"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Telefone"
        value={account.phone}
        pattern="(99) 9999[9]-9999"
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('phone', isValid, value)}
      />,
      <Select
        name="gender"
        id="data-pane-gender"
        key="personal-form-gender"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Sexo"
        value={account.gender}
        showLabel
        required
        onChange={(e) => this.handleChange('gender', true, e.target.value)}
      >
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
        <option value="O">Outros</option>
      </Select>,
      <Select
        name="work_field"
        id="data-pane-area"
        key="personal-form-work_field"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Área de Atuação"
        value={account.work_field}
        showLabel
        required
        onChange={(e) => this.handleChange('work_field', true, e.target.value)}
      >
        {this.renderWorkingFields()}
      </Select>,
    ];
  }

  renderEnterprise() {
    const { account } = this.props;
    const { selectedStateId } = this.state;

    return [
      <Ninput
        name="full_name"
        key="enterprise-form-full_name"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Nome Completo"
        value={account.last_name ? `${account.first_name} ${account.last_name}` : account.first_name}
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('full_name', isValid, value)}
      />,
      <Ninput
        name="trading_name"
        key="enterprise-form-trading_name"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Razão Social"
        value={account.trading_name}
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('trading_name', isValid, value)}
      />,
      <Ninput
        name="cnpj"
        key="enterprise-form-cnpj"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="CNPJ"
        value={account.cnpj}
        pattern="99.999.999/9999-99"
        required
        onEnterKeyPress={this.handleSubmit}
        checkValidation={validateCnpj}
        onChange={(isValid, value) => this.handleChange('cnpj', isValid, value)}
      />,
      <Ninput
        name="email"
        key="enterprise-form-email"
        className="atm-checkout-input atm-checkout-input-one"
        value={account.email}
        placeholder="E-Mail"
        required
        onEnterKeyPress={this.handleSubmit}
        checkValidation={validateEmail}
        onChange={(isValid, value) => this.handleChange('email', isValid, value)}
      />,
      <Ninput
        name="phone"
        key="enterprise-form-phone"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Telefone"
        value={account.phone}
        pattern="(99) 9999[9]-9999"
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('phone', isValid, value)}
      />,
      <Select
        name="work_field"
        id="data-pane-area"
        key="enterprise-form-work_field"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Área de Atuação"
        value={account.work_field}
        showLabel
        required
        onChange={(e) => this.handleChange('work_field', true, e.target.value)}
      >
        {this.renderWorkingFields()}
      </Select>,
      <Select
        name="employee_number"
        id="data-pane-collaborators"
        key="enterprise-form-employee_number"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Número de funcionários"
        value={account.employee_number}
        required={true}
        showLabel
        onChange={(e) => this.handleChange('employee_number', true, e.target.value)}
      >
        <option value="1">Individual</option>
        <option value="19">de 02 a 19 funcionários</option>
        <option value="99">de 20 a 99 funcionários</option>
        <option value="499">de 100 a 499 funcionários</option>
        <option value="500">500 ou mais funcionários</option>
      </Select>,
      <Select
        name="id_state_registration"
        id="data-pane-state"
        key="enterprise-form-id_state_registration"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Inscrição Estadual"
        value={account.id_state_registration}
        required
        showLabel
        onChange={(e) => this.handleStateChange('id_state_registration', true, e.target.value)}
      >
        <option value="0">Isento</option>
        {this.renderStates()}
      </Select>,
      selectedStateId && selectedStateId !== '0' &&
        <Ninput
          name="state_registration"
          key="enterprise-form-state_registration"
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Número Inscrição"
          value={account.state_registration}
          required
          onEnterKeyPress={this.handleSubmit}
          checkValidation={(value) => ie(value, account.id_state_registration)}
          onChange={(isValid, value) => this.handleChange('state_registration', isValid, value)}
        />,
    ];
  }

  renderUS() {
    const { account } = this.props;

    return [
      <Ninput
        name="full_name"
        key="us-form-full_name"
        className="atm-checkout-input atm-checkout-input-two"
        placeholder="Full Name"
        value={account.last_name ? `${account.first_name} ${account.last_name}` : account.first_name}
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('full_name', isValid, value)}
      />,
      <Ninput
        name="phone"
        key="us-form-phone"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Phone"
        value={account.phone}
        pattern="(999) 999-9999"
        required
        onEnterKeyPress={this.handleSubmit}
        onChange={(isValid, value) => this.handleChange('phone', isValid, value)}
      />,
      <Ninput
        name="email"
        key="us-form-email"
        className="atm-checkout-input atm-checkout-input-two"
        value={account.email}
        placeholder="E-Mail"
        required
        onEnterKeyPress={this.handleSubmit}
        checkValidation={validateEmail}
        onChange={(isValid, value) => this.handleChange('email', isValid, value)}
      />,
      <Select
        name="gender"
        id="data-pane-gender"
        key="us-form-gender"
        className="atm-checkout-input atm-checkout-input-one"
        placeholder="Gender"
        value={account.gender}
        showLabel
        required
        onChange={(e) => this.handleChange('gender', true, e.target.value)}
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Others</option>
      </Select>,
    ];
  }

  renderForm() {
    const { locale: { COUNTRY_CODE }, activeType } = this.props;

    if (COUNTRY_CODE === 'US') {
      return this.renderUS();
    }

    if (activeType === 'PJ') {
      return this.renderEnterprise();
    }

    return this.renderPersonal();
  }

  render() {
    return (
      <form className="org-customer-data-form">
        {this.renderForm()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    locale: {
      COUNTRY_CODE: state.locale.COUNTRY_CODE,
    },
  };
}

export default connect(mapStateToProps)(CustomerDataForm);
