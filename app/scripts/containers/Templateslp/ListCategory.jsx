// @flow

import React from 'react';
import { CheckBox } from 'components/Input';

export class ListCategory extends React.Component {
  render() {
    return (
      <div className="org-list-category">
        <label>
          <CheckBox onChange={this.handleChoose} />Todos os modelos
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Advocacia
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Agricultura
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Automotivo
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Bebidas e Alimentos
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />BelezaCasa e Lar
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Condicionamento Físico
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Construção e Serviços
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Comerciais
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Criativo
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Educação
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Esportes
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Horticultura
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Meio Ambiente
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Meios de Comunicação
        </label>
        <label>
          <CheckBox onChange={this.handleChoose} />Mercado Imobiliário
        </label>
      </div>
    );
  }
}

export default ListCategory;
