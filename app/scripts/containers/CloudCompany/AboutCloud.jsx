// @flow

import React from 'react';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';

type Props = {
  screenSize: string,
};

export class AboutCloud extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className="org-about-cloud">
        <div className={cx(isMobile(screenSize) && ('org-about-cloud-mobile'))}>
          <div className={cx(isMobile(screenSize) && ('container'))}>
            <div className="mol-texts-about-cloud">
              <div className="atm-text-cloud">
                <h4 className="qrk-title-about-cloud">O que é a Cloud?</h4>
                <p className="qrk-p-about-cloud">Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit parturient</p>

                <p className="qrk-subtitle-about-cloud">Vantagens para o franqueador</p>
                <p className="qrk-p-about-cloud">Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit parturient</p>

                <p className="qrk-subtitle-about-cloud">Vantagens para o franqueado</p>
                <p className="qrk-p-about-cloud">Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit parturient</p>
              </div>
              <div className="atm-text-cloud img-note-cloud">
                {isMobile(screenSize) ?
                  (<img src={require('assets/media/images/img-cloud-page-mobile.png')} alt="Cloud" />) :
                  (<img src={require('assets/media/images/img-cloud-page.png')} alt="Cloud" />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCloud;

