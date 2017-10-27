// @flow

import React from 'react';
import { isMobile } from 'utils/helpers';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
}

export class VideosPrinti extends React.Component {

  props: Props;

  render() {
    const { screenSize } = this.props;
    const videoSrc = ['https://www.youtube.com/embed/PXMhlhRNLD0', 'https://www.youtube.com/embed/PXMhlhRNLD0', 'https://www.youtube.com/embed/PXMhlhRNLD0'];
    return (
      <div className="org-videos-printi">

        <div className="mol-titles-videos-printi">
          <p className="title-our-videos">Nossos Vídeos</p>
          {!isMobile(screenSize) && <p className="subtitle-our-videos">Veja também</p>}
        </div>

        <div className="mol-videos-printi">
          <div className="atm-video">
            <iframe
              width="560"
              height="315"
              src={videoSrc[0]} frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="atm-video">
            <div className="qrk-videos">
              <Link to="">
                <img src={require('assets/media/images/video1-help-center.png')} alt="Video1" />
              </Link>
            </div>
            <div className="qrk-videos">
              <Link to="">
                <img src={require('assets/media/images/video2-help-center.png')} alt="Video2" />
              </Link>
            </div>
            <div className="qrk-videos">
              <Link to="">
                <img src={require('assets/media/images/video3-help-center.png')} alt="Video3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default VideosPrinti;
