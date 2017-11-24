// @flow
import React from 'react';
import AvailableUploadStrategy from './AvailableUploadStrategy';
import getUploadStrategies from './getUploadStrategies';

type Props = {
  availableStrategies: Array<number>,
  handleSelectedStrategy: (strategyIndex: number) => void,
  locale: {},
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
    const { availableStrategies, locale } = this.props;
    const { selectedItem } = this.state;
    const strategies = getUploadStrategies(locale);
    return (
      <section className="available-upload-strategies-container">
        <section className="strategies">
          {
            availableStrategies.map(x => {
              const info = strategies[x - 1];
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
      </section>
    );
  }
}
