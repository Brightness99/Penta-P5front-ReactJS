// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export class RequestSample extends React.Component {
  render() {
    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/images/request-sample.png')}')`,
      backgroundSize: 'cover',
    };
    return (
      <div className="container">
        <section style={styles}>
          <div className="container-requestSample">
            <h4 className="title-requestSample">Quer conferir a qualidade de nossos materiais?</h4>
            <p className="subtitle-requestSample">Solicite já uma amostra dos materiais e se impressione com a nossa qualidade.</p>
            <Link className="btn-default btn-secondary btn-lg" to="#">
              Solicitar amostra
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default RequestSample;
