// flow
import React from 'react';
import { Link } from 'react-router-dom';
import { OrdersIcon, AddressIcon, MyDataIcon, CardsIcon, ModelsIcon, OutIcon } from 'components/Icons';

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
              <i><OrdersIcon /></i>Meus pedidos
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><AddressIcon /></i>Meus endereços
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><MyDataIcon /></i>Meus dados
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><CardsIcon /></i>Cartões salvos
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><ModelsIcon /></i>Modelos salvos
            </Link>
          </li>
          <li>
            <Link to="#">
              Cloud
            </Link>
          </li>
          <li>
            <Link to="#">
              <i><OutIcon /></i>Sair
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
