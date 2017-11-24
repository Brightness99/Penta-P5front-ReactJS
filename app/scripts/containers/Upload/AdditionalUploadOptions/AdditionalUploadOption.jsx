// @flow

import React from 'react';
import { BoxRadio } from 'atoms/Inputs';

type Props = {
  title: string,
  options: [],
  defaultValue: string,
  freeTitle: string,
  handleOptionSelected: (value) => Object
};

type State= {
  activeRadio: string
}

export default class AdditionalUploadOption extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeRadio: props.defaultValue,
    };
  }

  componentWillReceiveProps({ defaultValue }) {
    if (defaultValue !== this.props.defaultValue) {
      this.handleSelection(defaultValue);
    }
  }

  props: Props;
  state: State;

  handleSelection = (id) => {
    const { handleOptionSelected, options } = this.props;
    const option = options.find(x => x.id === id);
    this.setState({
      activeRadio: id,
    });

    if (typeof handleOptionSelected === 'function' && option) {
      handleOptionSelected(option);
    }
  };

  renderPriceTitle = (option, freeTitle) => {
    if (option.price === 0) return <span className="gratis-title">{freeTitle}</span>;
    return <span className="price-title">{`+R$${option.price}`}</span>;
  };

  renderOptions = () => {
    const { options, freeTitle } = this.props;
    const { activeRadio } = this.state;
    return options.map(
      (option) => (
        <BoxRadio
          key={option.id}
          value={option.id}
          onChange={() => this.handleSelection(option.id)}
          name="box-radio"
          checked={activeRadio === option.id}
        >
          <section className="box-radio-container">
            <span className="radio-label">{option.name}</span>
            {this.renderPriceTitle(option, freeTitle)}
          </section>
        </BoxRadio>
      )
    );
  };

  render() {
    const { title } = this.props;
    return (
      <section className="additional-option-container">
        <h4 className="title">{title}</h4>
        <div className="content">
          {this.renderOptions()}
        </div>
      </section>
    );
  }
}
