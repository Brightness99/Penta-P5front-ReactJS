// @flow

import React from 'react';
import { CheckBox } from 'components/Input';
import { NavLink } from 'react-router-dom';
import { TimesIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  handleClose: () => {},
}

type State = {
  isChecked: boolean,
}

export class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  static props: Props;
  static props: State;

  handleCloseMenu = (ev) => {
    const { handleClose } = this.props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  }

  renderMobile() {
    return (
      <ul className="mol-list-category">
        <button className="atm-header-menu-close" onClick={this.handleCloseMenu}>
          <TimesIcon />
        </button>
        <li className="qrk-title-mobile">Escolha a categoria</li>
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

  renderDesktop() {
    return (
      <div>
        <p className="qrk-title-category">Categorias</p>
        <ul className="mol-list-category">
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
                Todos os modelos
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Advocacia
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Agricultura
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Automotivo
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Bebidas e Alimentos
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              BelezaCasa e Lar
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Condicionamento Físico
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Construção e Serviços
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Comerciais
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Criativo
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Educação
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Esportes
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Horticultura
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Meio Ambiente
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Meios de Comunicação
            </label>
          </li>
          <li>
            <label>
              <CheckBox
                checked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              Mercado Imobiliário
            </label>
          </li>
        </ul>
      </div>
    );
  }
  render() {
    const { screenSize } = this.props;
    return (
      <div className="org-list-category">
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default ListCategory;
