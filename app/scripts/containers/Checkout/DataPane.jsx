// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { Input } from 'quarks/Inputs';
import { BoxRadio, Select } from 'atoms/Inputs';

type Props = {
};

type State = {
  activeForm: string,
};

export default class DataPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 'person',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderPersonalData() {
    return (
      <form className="org-checkout-content-data">
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Nome Completo"
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CPF"
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone"
        />
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="data-pane-gender"
          showLabel={true}
          id="data-pane-gender"
          placeholder="Sexo"
          required={true}
        >
          <option value={'male'}>Masculino</option>
          <option value={'female'}>Feminino</option>
        </Select>
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
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="CNPJ"
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-two"
          placeholder="Razão Social"
        />
        <Input
          showLabel={true}
          className="atm-checkout-input atm-checkout-input-one"
          placeholder="Telefone/Celular"
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
          required={true}
        >
          <option value={'sp'}>SP</option>
          <option value={'rj'}>RJ</option>
        </Select>
      </form>
    );
  }

  handleSelection = (ev) => {
    this.setState({
      activeForm: ev.currentTarget.value,
    });
  };

  render() {
    const { activeForm } = this.state;

    return (
      <div key="dataPane" className="org-checkout-content-container">
        <div className="atm-checkout-content-title">
          1. Dados
        </div>
        <p className="atm-checkout-content-text">
          Complete seus dados para seguir em frente. Esses dados serão solicitados apenas uma vez. Suas próximas compras serão muito mais rápidas e fáceis.
        </p>
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
      </div>
    );
  }
}
