// @flow

import React from 'react';
import AdditionalOption from './AdditionalUploadOption';

type Props = {
    items: [],
    handleOptionsChanged: (options: {}) => void
}

type State = {
  selectedOptions: []
}

export default class AdditionalUploadOptions extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOptions: [],
    };
  }

  props: Props;
  state: State;

  handleSelectedOption(option, title) {
    const { selectedOptions } = this.state;
    const { items, handleOptionsChanged } = this.props;
    const newSelectedOptions = [...selectedOptions.filter(x => x.title !== title), { title, option }];
    this.setState({
      selectedOptions: newSelectedOptions,
    });
    if (newSelectedOptions.length === items.length && typeof handleOptionsChanged === 'function') {
      handleOptionsChanged(newSelectedOptions);
    }
  }

  renderList() {
    const { items } = this.props;
    return items.map(
      (additionalOption) => (
        <AdditionalOption
          key={additionalOption.title}
          title={additionalOption.title}
          video={additionalOption.video}
          options={additionalOption.options}
          handleOptionSelected={(option) => this.handleSelectedOption(option, additionalOption.title)}
        />
      )
    );
  }

  render() {
    return (
      <section className="additional-options-container">
        {this.renderList()}
      </section>
    );
  }
}
