// @flow 

import React from 'react';
import { Link } from 'react-router-dom';

// <iframe width="560" height="315" src="https://www.youtube.com/embed/PXMhlhRNLD0" frameBorder="0" allowFullscreen></iframe>
// <Link to="https://www.youtube.com/embed/PXMhlhRNLD0" target="_blank">adadsasdad</Link>

export class VideosPrinti extends React.Component {
  render() {
    // pegar o src e colocar no box grande
    const videoSrc = ['https://www.youtube.com/embed/PXMhlhRNLD0', 'https://www.youtube.com/embed/PXMhlhRNLD0', 'https://www.youtube.com/embed/PXMhlhRNLD0'];
    return (
      <div className="org-videos-printi">
        <h4>Nossos Vídeos</h4>
        <div className="mol-videos-printi">
          <div className="atm-video">
            <iframe width="560" height="315" src={videoSrc[0]} frameBorder="0" allowFullScreen />
          </div>
          <div className="atm-video">
            <div className="qrk-videos">
              <img src={require('assets/media/images/video1-help-center.png')} alt="Video1" />
            </div>
            <div className="qrk-videos">
              <img src={require('assets/media/images/video2-help-center.png')} alt="Video2" />
            </div>
            <div className="qrk-videos">
              <img src={require('assets/media/images/video3-help-center.png')} alt="Video3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default VideosPrinti;
