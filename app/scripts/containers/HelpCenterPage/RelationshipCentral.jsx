// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { ChatIcon, PhoneIcon, PaperAirplaneFlying } from 'components/Icons';

export class RelationshipCentral extends React.Component {
  render() {
    return (
      <div className="org-relationship-central">
        <h3>Central de Relacionamento e-commerce</h3>
        <div className="mol-relationship-central">

          <div className="atm-link-central">
            
            <div className="qrk-link-central">
              <div className="bsn-icon-title">
                <ChatIcon />
                <p>Chat</p>
              </div>
              <Link to="#" className="btn-default btn-third btn-xs">Iniciar Atendimento</Link>
            </div>

            <div className="qrk-link-central">
              <div className="bsn-icon-title">
                <PaperAirplaneFlying />
                <p>E-mail</p>
              </div>
              <Link to="#" className="btn-default btn-third btn-xs">Enviar um e-mail</Link>
            </div>

            <div className="qrk-link-central">
              <div className="bsn-icon-title">
                <PhoneIcon />
                <p>Telefone</p>
              </div>
              <div className="bsn-links-tel">
                <Link to="#" className="btn-default btn-third btn-xs">A printi liga pra você</Link>
                <Link to="#" className="btn-default btn-third btn-xs">Você liga para a printi</Link>
              </div>
            </div>

          </div>

          <h4>Venda corporativa</h4>
          <div className="atm-link-central">
            <div className="qrk-link-central">
              <div className="bsn-icon-title">
                <ChatIcon />
                <p>Atendimento Corporativo</p>
              </div>
              <div>
                <Link to="#" className="btn-default btn-third btn-xs">Quero saber mais</Link>
                <Link to="#" className="btn-default btn-third btn-xs">Solicitar atendimento</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RelationshipCentral;
