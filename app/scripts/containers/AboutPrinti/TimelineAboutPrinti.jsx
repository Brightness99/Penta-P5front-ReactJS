// @flow
// https://codyhouse.co/demo/vertical-timeline/index.html
import React from 'react';

export class TimelineAboutPrinti extends React.Component {
  render() {
    return (
      <div className="org-timeline-printi">
        <div className="container">
          <h4>A Printi não para de crescer</h4>
          <p>Confira um pouco da história da nossa evolução</p>

          <div className="mol-timeline">
            <div className="atm-card-timeline">
              <div className="qrk-number-card">
                1
              </div>

              <div className="qrk-text-card">
                <div>
                  <p>10 de junho 2012</p>
                  <p>Como tudo começou</p>
                </div>
                <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" />
                <div>
                  <p>CRAS JUSTO DAPIBUS</p>
                  <p>Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default TimelineAboutPrinti;

