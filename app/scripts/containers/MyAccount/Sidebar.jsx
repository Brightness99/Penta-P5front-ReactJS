// flow
import React from 'react';
import { Orders, Address, MyData, Cards, Models, Out } from 'components/Icons';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="container-sidebarAccount">
        <div className="box-client">
          <img src={require('assets/media/images/imgClient-myaccount.jpg')} alt="Diogo Capelo" />
          <p className="client-name">Diogo Capelo</p>
        </div>
        <hr />
        <ul className="menuAccount">
          <li>
            <i><Orders /></i>Meus pedidos
          </li>
          <li>
            <i><Address /></i>Meus endereços
          </li>
          <li>
            <i><MyData /></i>Meu dados
          </li>
          <li>
            <i><Cards /></i>Cartões salvos
          </li>
          <li>
            <i><Models /></i>Modelos salvos
          </li>
          <li>
            <i><Out /></i>Sair
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
