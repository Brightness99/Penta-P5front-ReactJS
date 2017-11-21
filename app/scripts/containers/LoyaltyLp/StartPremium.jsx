// @flow
import React from 'react';

export class StartPremium extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="mol-start-premium">
          <div className="qrk-start-premium">
            <div className="text-start-premium">
              <p className="first-text-start-premium">R$ 500 em compras</p>
              <p className="second-text-start-premium">e você já começa a aproveitar</p>
            </div>
            <div>
              <button className="btn-default btn-primary btn-lg">Comprar agora</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartPremium;
