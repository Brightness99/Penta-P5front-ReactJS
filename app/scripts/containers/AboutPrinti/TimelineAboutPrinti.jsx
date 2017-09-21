// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

export class TimelineAboutPrinti extends React.Component {
  render() {
    return (
      <div className="org-timeline-printi">
        <div className="container">
          <h4 className="title-timeline">A Printi não para de crescer</h4>
          <p className="subtitle-timeline">Confira um pouco da história da nossa evolução</p>

          <div className="mol-timeline">
            <span className="atm-line-timeline" />
            <div className="atm-card-timeline">
              <span className="qrk-number-card">1</span>
              <div className="qrk-text-card">
                <div className="bsn-title-card">
                  <p className="title-data">10 de junho 2012</p>
                  <p className="title-card">Como tudo começou</p>
                </div>
                <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" />
                <div className="bsn-text-card">
                  <p className="title-text-card">CRAS JUSTO DAPIBUS</p>
                  <p className="text-card">Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </div>
              </div>
            </div>

            <div className="atm-card-timeline">
              <span className="qrk-number-card">2</span>
              <div className="qrk-text-card">
                <div className="bsn-title-card">
                  <p className="title-data">10 de junho 2012</p>
                  <p className="title-card">Como tudo começou</p>
                </div>
                <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" />
                <div className="bsn-text-card">
                  <p className="title-text-card">CRAS JUSTO DAPIBUS</p>
                  <p className="text-card">Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </div>
                <div className="bsn-text-card">
                  <p className="title-text-card">CRAS JUSTO DAPIBUS</p>
                  <p className="text-card">Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <Link to="#" className="link-ler-mais">Ler mais</Link>
                </div>
                <div className="bsn-img-card">
                  <img src={require('assets/media/images/valor-economico.png')} alt="Valor Econômico" />
                </div>
              </div>
            </div>

            <div className="atm-card-timeline">
              <span className="qrk-number-card">3</span>
              <div className="qrk-text-card">
                <div className="bsn-title-card">
                  <p className="title-data">10 de junho 2012</p>
                  <p className="title-card">Como tudo começou</p>
                </div>
                <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" />
                <div className="bsn-text-card">
                  <p className="title-text-card">CRAS JUSTO DAPIBUS</p>
                  <p className="text-card">Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </div>
              </div>
            </div>

            <div className="atm-card-timeline">
              <span className="qrk-number-card">4</span>
              <div className="qrk-text-card">
                <div className="bsn-title-card">
                  <p className="title-data">10 de junho 2012</p>
                  <p className="title-card">Como tudo começou</p>
                </div>
                <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" />
                <div className="bsn-text-card">
                  <p className="title-text-card">CRAS JUSTO DAPIBUS</p>
                  <p className="text-card">Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="org-btn-more">
            <Link to="#" className="btn-default btn-third btn-xs">Carregar mais histórias (4)</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineAboutPrinti;

