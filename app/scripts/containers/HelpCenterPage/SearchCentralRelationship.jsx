// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'quarks/Inputs';
import { MoneySignIcon, EyeIcon, TruckIcon } from 'components/Icons';

export class SearchCentralRelationship extends React.Component {
  render() {
    return (
      <div className="org-search-central">
        <h2 className="title-search-central">Central de Relacionamento</h2>
        <p className="subtitle-search-central">Digite sua pergunta de forma natural no campo abaixo e clique no botão "buscar"</p>
        <form className="mol-search-central">
          <Input
            showLabel={true}
            className="atm-checkout-input atm-checkout-input-full"
            placeholder="Qual a sua dúvida?"
          />
          <Button
            type="submit"
            kind="success"
          >
            {'Buscar'}
          </Button>
        </form>
        <div className="mol-links-central">
          <Link to="#" className="btn-default btn-third btn-xs"><TruckIcon />Acompanhar pedido</Link>
          <Link to="#" className="btn-default btn-third btn-xs"><EyeIcon />Análise de produto</Link>
          <Link to="#" className="btn-default btn-third btn-xs"><MoneySignIcon />Orçamento</Link>
        </div>
      </div>
    );
  }
}

export default SearchCentralRelationship;
