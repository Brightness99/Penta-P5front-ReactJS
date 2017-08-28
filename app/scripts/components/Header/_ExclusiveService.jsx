// @flow

import React from 'react';
import { NavLink } from "react-router-dom";

const ExclusiveService = () => {
  return (
    <div className="mol-exclusive-service">
      <div className="atm-excusive-service-title">Este atendimento é exclusivo para clientes com:</div>
      <ul className="mol-exclusive-service-list">
        <li className="money">
          <p className="money">+5000</p>
          <div className="atm-sprite-icon atm-sprite-icon--money" />
          <p className="ou">ou</p>
          <p className="excdesc">Pedidos superiores a R$ 5.000,00</p>
          <div className="line" />
        </li>
        <li className="people">
          <p className="people">+50</p>
          <div className="atm-sprite-icon atm-sprite-icon--people" />
          <p className="ou">ou</p>
          <p className="excdesc">Porte superior a 50 funcionários</p>
          <div className="line" />
        </li>
        <li className="house">
          <p className="house">+10</p>
          <div className="atm-sprite-icon atm-sprite-icon--house" />
          <p className="excdesc">Empresa com 10 unidades ou mais</p>
        </li>
      </ul>
      <NavLink to="/venda-corporativa" className="atm-regular-button">
        QUERO SABER MAIS
      </NavLink>
    </div>
  );
};

export default ExclusiveService;
