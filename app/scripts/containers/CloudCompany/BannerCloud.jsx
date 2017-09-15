// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
};

export class BannerCloud extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <div className="org-banner-cloud">
        <div className="mol-banner-cloud">
          <div className="atm-banner-cloud">
            <div className="container">
              <h2 className="qrk-title-banner-cloud">Conheça a cloud</h2>
              <h3 className="qrk-subtitle-banner-cloud">A ferramenta que agiliza seus materiais gráficos</h3>
              <p className="qrk-text-banner-cloud">Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus, tellus ac cursus commodo.</p>
              <Link to="#" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
          </div>
          <img src={require('assets/media/images/cloud-banner.png')} alt="Cloud" />
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="org-banner-cloud">
        <div className="container">
          <div className="mol-banner-cloud">
            <div className="atm-banner-cloud">
              <h2 className="qrk-title-banner-cloud">Conheça a cloud</h2>
              <h3 className="qrk-subtitle-banner-cloud">A ferramenta que agiliza seus materiais gráficos</h3>
              <p className="qrk-text-banner-cloud">Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus, tellus ac cursus commodo.</p>
              <Link to="#" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
            <img src={require('assets/media/images/cloud-banner.png')} alt="Cloud" />
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

export default BannerCloud;
