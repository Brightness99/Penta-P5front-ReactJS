// @flow

import React from 'react';
import { PlayCircleIcon } from 'components/Icons';
import { BoxRadio } from 'atoms/Inputs';

type Props = {
  title: string,
  video: string,
  options: [],
  defaultValue: string,
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

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;
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

  renderPriceTitle = (option) => {
    if (option.price === 0) return <span className="gratis-title">GRATIS</span>;
    return <span className="price-title">{`+R$${option.price}`}</span>;
  };

  renderOptions = () => {
    const { options } = this.props;
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
            {this.renderPriceTitle(option)}
          </section>
        </BoxRadio>
      )
    );
  };

  render() {
    const { title, video } = this.props;
    return (
      <section className="additional-option-container">
        <div className="header">
          <h4 className="title">{title}</h4>
          <div className="media">
            <i className="media-icon"><PlayCircleIcon /></i>
            <a className="link" href={video}>Vídeo explicativo</a>
          </div>
        </div>
        <div className="content">
          {this.renderOptions()}
        </div>
      </section>
    );
  }
}
