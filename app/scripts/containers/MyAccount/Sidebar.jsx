// flow
import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="#">
              <i><Orders /></i>Meus pedidos
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><Address /></i>Meus endereços
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><MyData /></i>Meus dados
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><Cards /></i>Cartões salvos
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><Models /></i>Modelos salvos
            </Link>
          </li>
          <li>
            <Link to="#">
              Cloud
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><Out /></i>Sair
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
