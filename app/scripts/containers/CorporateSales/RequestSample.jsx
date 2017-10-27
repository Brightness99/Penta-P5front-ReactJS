// @flow

import React from 'react';

type Props = {
  handleModalShowing: () => void,
};

export class RequestSample extends React.Component<Props> {
  static props: Props;

  render() {
    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/images/request-sample.png')}')`,
      backgroundSize: 'cover',
    };
    return (
      <div className="container">
        <section style={styles}>
          <div className="container-request-sample">
            <h4 className="title-request-sample">Quer conferir a qualidade de nossos materiais?</h4>
            <p className="subtitle-request-sample">Solicite já uma amostra dos materiais e se impressione com a nossa
              qualidade.</p>
            <button className="btn-default btn-secondary btn-lg" onClick={this.props.handleModalShowing}>
              Solicitar amostra
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default RequestSample;
