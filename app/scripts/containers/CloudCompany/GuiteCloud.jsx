// @flow 
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
};

class GuiteCloud extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <div className="org-guite-cloud">
        <div className="container">
          <h4 className="qrk-title-guite-cloud">Veja nosso guia completo sobre a Cloud</h4>
          <div className="mol-texts-guite-cloud">
            <div className="atm-text-guite-cloud">
              <p className="qrk-p-guite-cloud">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

              <Link to="" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
            <div className="atm-text-guite-cloud">
              <img src={require('assets/media/images/video-guite.png')} alt="Cloud" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="org-guite-cloud">
        <div className="container">
          <div className="mol-texts-guite-cloud">
            <div className="atm-text-guite-cloud">
              <h4 className="qrk-title-guite-cloud">Veja nosso guia completo sobre a Cloud</h4>
              <p className="qrk-p-guite-cloud">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

              <Link to="" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
            <div className="atm-text-guite-cloud">
              <img src={require('assets/media/images/video-guite.png')} alt="Cloud" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default GuiteCloud;
