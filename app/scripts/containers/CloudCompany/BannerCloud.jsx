// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';

type Props = {
  screenSize: string,
};

export class BannerCloud extends React.Component {
  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className={cx('org-banner-cloud', isMobile(screenSize) && ('bg-mobile'))}>
        <div className="container">
          <div className="mol-banner-cloud">
            <div className="atm-banner-cloud">
              <h2 className="qrk-title-banner-cloud">Conheça a cloud</h2>
              <h3 className="qrk-subtitle-banner-cloud">A ferramenta que agiliza seus materiais gráficos</h3>
              <p className="qrk-text-banner-cloud">Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus, tellus ac cursus commodo.</p>
              <Link to="#" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
            {!isMobile(screenSize) &&
              <img src={require('assets/media/images/cloud-banner.png')} alt="Cloud" />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default BannerCloud;
