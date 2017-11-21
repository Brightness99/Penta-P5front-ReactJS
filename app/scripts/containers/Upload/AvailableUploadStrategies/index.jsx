// @flow
import React from 'react';
import UploadExtraInformationPanel from '../UploadExtraInformationPanel';
import AvailableUploadStrategy from './AvailableUploadStrategy';
import strategiesInfo from './availableUploadStrategies';

type Props = {
  availableStrategies: Array<number>,
  handleSelectedStrategy: (strategyIndex: number) => void,
  message: string,
  showMessage: boolean,
}

type State = {
  selectedItem: number
}

export default class AvailableUploadStrategies extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { selectedItem: -1 };
  }

  props: Props;
  state: State;

  handleOnSelect = (item: number) => {
    const { handleSelectedStrategy } = this.props;
    this.setState({
      selectedItem: item,
    });

    if (typeof handleSelectedStrategy === 'function') {
      handleSelectedStrategy(item);
    }
  };

  render() {
    const { availableStrategies, message, showMessage } = this.props;
    const { selectedItem } = this.state;
    return (
      <section className="available-upload-strategies-container">
        <section className="strategies">
          {
            availableStrategies.map(x => {
              const info = strategiesInfo[x - 1];
              return (
                <AvailableUploadStrategy
                  key={info.index}
                  {...info}
                  selectedItem={selectedItem}
                  handleOnSelect={this.handleOnSelect}
                />);
            })
          }
        </section>
        {
          showMessage && <UploadExtraInformationPanel description={message} />
        }
      </section>
    );
  }
}
