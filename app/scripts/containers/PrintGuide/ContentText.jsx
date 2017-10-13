// @flow

import React from 'react';

type Props = {
  guide: {},
}

export class ContentText extends React.Component {

  static props: Props;

  render() {
    const { guide } = this.props;
    const renderMark = (guide && guide.isLoaded) ?
      (<div className="atm-content-file" dangerouslySetInnerHTML={{ __html: guide.guideData.content }} />) :
      null;
    return (
      <div className="atm-content-file">
        {renderMark}
      </div>
    );
  }
}

export default ContentText;
