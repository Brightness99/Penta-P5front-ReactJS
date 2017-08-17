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
        <Input className="atm-checkout-input-two" placeholder="Nome Completo" />
        <Input className="atm-checkout-input-one" placeholder="CPF" />
        <Input className="atm-checkout-input-one" placeholder="Telefone" />
        <Select
          className="atm-checkout-input-one"
          name="data-pane-gender"
          showLabel={true}
          id="data-pane-gender"
          placeholder="Sexo"
        >
          <option value={'male'}>Masculino</option>
          <option value={'female'}>Feminino</option>
        </Select>
        <Select
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
        {this.renderPersonalData()}
      </div>
    );
  }
}
