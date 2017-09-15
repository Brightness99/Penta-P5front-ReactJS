// @flow

import React from 'react';

export class AboutCloud extends React.Component {
  render() {
    return (
      <div className="org-about-cloud">
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
            <img src={require('assets/media/images/img-cloud-page.png')} alt="Cloud" />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCloud;

