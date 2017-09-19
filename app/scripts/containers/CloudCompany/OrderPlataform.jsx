// @flow
import React from 'react';
import { Link } from 'react-router-dom';

class OrderPlataform extends React.Component {
  render() {
    return (
      <div className="org-order-plataform">
        <div className="container">
          <p className="qrk-title-order">Use o passo a passo abaixo e veja como é fácil fazer um pedido na plataforma:</p>
            <Link to="#">
              <img src={require('assets/media/images/editor-area.png')} alt="Faça um pedido na plataforma" />
            </Link>
        </div>
      </div>
    );
  }
}

export default OrderPlataform;
