// @flow

import React from 'react';
import AdditionalOption from './AdditionalUploadOption';

type Props = {
    items: []
}

export default class AdditionalUploadOptions extends React.Component {
  props: Props;

  renderList() {
    const { items } = this.props;
    return items.map(
      (additionalOption) => (
        <AdditionalOption
          key={`${new Date()}-${additionalOption.title}`}
          title={additionalOption.title}
          video={additionalOption.video}
          options={additionalOption.options}
          handleOptionSelected={(option) => console.log(option)}
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
