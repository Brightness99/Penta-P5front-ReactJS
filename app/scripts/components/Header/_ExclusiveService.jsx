// @flow

import React from 'react';
import { NavLink } from "react-router-dom";

const ExclusiveService = () => {
  return (
    <div className="mol-header-button-hidden mol-exclusive-service">
      <div className="atm-excusive-service-title">Este atendimento é exclusivo para clientes com:</div>
      <ul className="mol-exclusive-service-list">
        <li className="mol-exlusive-service-item">
          <div className="atm-exlusive-service-item-title">
            +5000 <div className="atm-sprite-icon atm-sprite-icon--money" />
          </div>
          <p>Pedidos superiores a R$ 5.000,00</p>
        </li>
        <li className="mol-exclusive-service-separator">
          <span>ou</span>
          <div className="mol-exlusive-service-item-line" />
        </li>
        <li className="mol-exlusive-service-item">
          <div className="atm-exlusive-service-item-title">
            +50 <div className="atm-sprite-icon atm-sprite-icon--people" />
          </div>
          <p>Porte superior a 50 funcionários</p>
        </li>
        <li className="mol-exclusive-service-separator">
          <span>ou</span>
          <div className="mol-exlusive-service-item-line" />
        </li>
        <li className="mol-exlusive-service-item">
          <div className="atm-exlusive-service-item-title">
            +10 <div className="atm-sprite-icon atm-sprite-icon--house" />
          </div>
          <p>Empresa com 10 unidades ou mais</p>
        </li>
      </ul>
      <NavLink to="/venda-corporativa" className="atm-regular-button">
        QUERO SABER MAIS
      </NavLink>
    </div>
  );
};

export default ExclusiveService;
