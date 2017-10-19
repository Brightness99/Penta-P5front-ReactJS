// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import { TransitionGroup } from 'react-transition-group';
import { IntlDate } from 'components/Intl';

type Props = {
  timelines: [],
}

export class TimelineAboutPrinti extends React.Component {
  props: Props;

  render() {
    const { timelines } = this.props;
    const timelinesMark = timelines.map((timeline, index) => (
      <div key={index.toString()} className="atm-card-timeline">
        <span className="qrk-number-card">{timeline.id}</span>
        <div className="qrk-text-card">
          <div className="bsn-title-card">
            <p className="title-data"><IntlDate>{timeline.date}</IntlDate></p>
            <p className="title-card">{timeline.title}</p>
          </div>
          <img src={`${config.basePath}files/${timeline.image.file}`} alt="Como tudo começou" />
          {/* <img src={require('assets/media/images/como-tudo-comecou.png')} alt="Como tudo começou" /> */}
          <div className="bsn-text-card">
            <p className="title-text-card">{timeline.image.title}</p>
            <p className="text-card">{timeline.excerpt}</p>
          </div>
        </div>
      </div>
    ));
    const loadMoreMark = (timelines.length > 5) ?
      (<div className="org-btn-more">
        <Link to="#" className="btn-default btn-third btn-xs">Carregar mais histórias</Link>
      </div>) :
      null;
    return (
      <div className="org-timeline-printi">
        <div className="container">
          <h4 className="title-timeline">A Printi não para de crescer</h4>
          <p className="subtitle-timeline">Confira um pouco da história da nossa evolução</p>
          <div className="mol-timeline">
            <span className="atm-line-timeline" />
            {timelinesMark}
          </div>
          {loadMoreMark}
        </div>
      </div>
    );
  }
}

export default TimelineAboutPrinti;

