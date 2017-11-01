// @flow

import React from 'react';

type Props = {
  guide: {},
}

export class ContentText extends React.Component {

  static props: Props;

  render() {
    const { guide } = this.props;
    const pageTitle = (guide && guide.isLoaded) ? guide.guideData.pageTitle : '';
    const renderMark = (guide && guide.isLoaded) ?
      (<div dangerouslySetInnerHTML={{ __html: guide.guideData.content }} />) :
      null;
    return (
      <div className="atm-content-file">
        <div className="guide-title">
          <h1>{pageTitle}</h1>
        </div>
        <div className="guide-body">
          {renderMark}
        </div>
      </div>
    );
  }
}

export default ContentText;
