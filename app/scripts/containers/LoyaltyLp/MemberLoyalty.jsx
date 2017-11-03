// @flow

import React from 'react';

export class MemberLoyalty extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="atm-member-loyalty">
          <h3 className="title-loyalty">Como se tornar membro</h3>
          <p className="subtitle-loyalty">Muito fácil, como tudo por aqui:</p>
          <div className="qrk-be-member">
            <div className="qrk-">
              <div>
                <img src={require('assets/media/images/member-loyalty1.png')} alt="Membro" />
              </div>
              <div>
                <p>texto</p>
              </div>
            </div>
            <div className="line-dashed">
              line
            </div>
            <div className="qrk-">
              <img src={require('assets/media/images/member-loyalty2.png')} alt="Membro" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberLoyalty;
