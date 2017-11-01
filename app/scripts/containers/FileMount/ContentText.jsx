// @flow

import React from 'react';

type Props = {
  fileMount: {},
}

export class ContentText extends React.Component {

  static props: Props;

  render() {
    const { fileMount } = this.props;
    const renderMark = (fileMount && fileMount.isLoaded) ?
      (<div dangerouslySetInnerHTML={{ __html: fileMount.mountData.content }} />) :
      null;
    return (
      <div className="atm-content-file">
        {renderMark}
      </div>
    );
  }
}

export default ContentText;
