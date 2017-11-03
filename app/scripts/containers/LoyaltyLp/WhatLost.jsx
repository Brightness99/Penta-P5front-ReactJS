// @flow
import React from 'react';
import { Link } from 'react-router-dom';

export class WhatLost extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="mol-what-lost">
          <h3 className="title-loyalty">Quer saber o que você está perdendo?</h3>
          <p className="subtitle-loyalty">Separamos alguns benefícios em destaque:</p>
          <div className="qrk-what-lost">
            <div className="img-what-lost">
              <Link to="#">
                <img src={require('assets/media/images/loyalty-1.png')} alt="Programa de Fidelidade" />
              </Link>
            </div>
            <div className="img-what-lost">
              <Link to="#">
                <img src={require('assets/media/images/loyalty-2.png')} alt="Programa de Fidelidade" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatLost;
