// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { NavLink } from 'react-router-dom';


type Props = {
};

export default class HeaderModels extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  render() {
    return (
      <ul className="mol-topbar-modelList">
        <li><NavLink to="/modelos-de-cardapio-de-papel">Modelos de Cardápio de Papel</NavLink></li>
        <li><NavLink to="/modelos-de-cartao-de-visita">Modelos de Cartão de Visita</NavLink></li>
        <li><NavLink to="/modelos-de-identificador-de-porta">Modelos de Identificador de Porta</NavLink></li>
        <li><NavLink to="/modelos-de-papel-timbrado">Modelos de Papel Timbrado</NavLink></li>
        <li><NavLink to="/modelos-de-flyer">Modelos de Flyer</NavLink></li>
        <li><NavLink to="/modelos-de-adesivo">Modelos de Adesivo</NavLink></li>
        <li><NavLink to="/modelos-de-folhetos">Modelos de Folhetos</NavLink></li>
        <li><NavLink to="/modelos-de-panfletos">Modelos de Panfletos</NavLink></li>
        <li><NavLink to="/modelos-de-banner">Modelos de Banner</NavLink></li>
        <li><NavLink to="/modelos-de-banner-l">Modelos de Banner L</NavLink></li>
        <li><NavLink to="/modelos-de-folder">Modelos de Folder</NavLink></li>
        <li><NavLink to="/modelos-de-receituario">Modelos de Receituário</NavLink></li>
        <li><NavLink to="/modelos-de-banner-roll-up">Modelos de Banner Roll Up</NavLink></li>
        <li><NavLink to="/modelos-de-cartaz">Modelos de Cartaz</NavLink></li>
        <li><NavLink to="/modelos-de-cartao-fidelidade">Modelos de Cartão Fidelidade</NavLink></li>
        <li><NavLink to="/modelos-de-cartao-postal">Modelos de Cartão Postal</NavLink></li>
        <li><NavLink to="/modelos-de-marca-pagina">Modelos de Marca Página</NavLink></li>
        <li><NavLink to="/modelos-de-pasta">Modelos de Pasta</NavLink></li>
        <li><NavLink to="/modelos-de-banner-x">Modelos de Banner X</NavLink></li>
        <li><NavLink to="/modelos-de-convite">Modelos de Convite</NavLink></li>
        <li><NavLink to="/modelos-de-filipeta">Modelos de Filipeta</NavLink></li>
        <li><NavLink to="/modelos-de-posters">Modelos de Pôster</NavLink></li>
        <li><NavLink to="/modelos-de-bloco-de-notas">Modelos de Bloco de Notas</NavLink></li>
        <li><NavLink to="/modelos-de-cardapio-de-plastico">Modelos de Cardápio de Plástico</NavLink></li>
      </ul>
    );
  }
}
