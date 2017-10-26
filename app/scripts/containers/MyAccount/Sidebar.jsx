// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { OrdersIcon, AddressIcon, MyDataIcon, CardsIcon, ModelsIcon, OutIcon, CloudIcon, PrintiClub, ReferralIcon, Bell } from 'components/Icons';

type Props = {
  user: Object,
};

export class Sidebar extends React.Component {
  static props: Props;

  render() {
    const { user } = this.props;

    return (
      <div className="container-sidebarAccount">
        <div className="box-client">
          <img src={require('assets/media/images/imgClient-myaccount.jpg')} alt="Diogo Capelo" />
          <p className="client-name">Diogo Capelo</p>
        </div>
        <hr />
        <ul className="menuAccount">
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/meus-pedidos">
              <i><OrdersIcon /></i>
              <span>Meus pedidos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/enderecos">
              <i><AddressIcon /></i>
              <span>Meus endereços</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/meus-dados">
              <i><MyDataIcon /></i>
              <span>Meus dados</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/cartoes-salvos">
              <i><CardsIcon /></i>
              <span>Cartões salvos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/modelos-salvos">
              <i><ModelsIcon /></i>
              <span>Modelos salvos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/notificacoes">
              <i className="bellIcon"><Bell /></i>
              <span>Notificação</span>
            </NavLink>
          </li>
          {user.customerInfo && user.customerInfo.cloud_manager === 1 && <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/cloud">
              <i className="cloudIcon"><CloudIcon /></i>
              <span>Cloud</span>
            </NavLink>
          </li>}
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/indicacoes">
              <i className="referralIcon"><ReferralIcon /></i>
              <span>Indicações</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/programa-de-fidelidade">
              <i className="printClubIcon"><PrintiClub /></i>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <i><OutIcon /></i>
              <span>Sair</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Sidebar);

