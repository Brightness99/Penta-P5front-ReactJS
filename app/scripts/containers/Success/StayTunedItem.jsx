// @flow 

import React from 'react';
import { AngleRightIcon } from 'components/Icons';

class StayTunedItem extends React.Component {
  props: Props;

  render() {

    const { text } = this.props;

    return (
      <div className="stay-tuned-item">
        <AngleRightIcon />
        <div>
          {text}
        </div>
      </div>
    );
  }
}

export default StayTunedItem;
