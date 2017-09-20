// @flow 

import React from 'react';

class MethodItem extends React.Component {
  props: Props;

  render() {

    const { buttonText, linkText } = this.props;

    return (
      <div className="method-item">

        <img src={require('assets/media/images/boleto.png')} alt="{buttonText}" />

        <div className="link-1">
          <a>{buttonText}</a>
        </div>

        <div className="link-2">
          <a>{linkText}</a>
        </div>

      </div>
    );
  }
}

export default MethodItem;
