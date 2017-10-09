// @flow
import React from 'react';
import AvailableUploadStrategy from './AvailableUploadStrategy';
import AvailableUploadExtraInfo from './AvailableUploadExtraInfo';
import strategiesInfo from './availableUploadStrategies';

type Props = {
  availableStrategies: Array<number>,
}

export default class AvailableUploadStrategies extends React.Component {
  props: Props;

  render() {
    const { availableStrategies } = this.props;
    return (
      <section className="available-upload-strategies-container">
        <section className="strategies">
          {
            availableStrategies.map(x => {
              const info = strategiesInfo[x - 1];
              return <AvailableUploadStrategy key={info.index} {...info} />;
            })
          }
        </section>
        {
          <AvailableUploadExtraInfo />
        }
      </section>
    );
  }
}
