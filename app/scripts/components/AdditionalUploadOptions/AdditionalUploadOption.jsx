// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleIcon } from 'components/Icons';
import { BoxRadio } from 'atoms/Inputs';

type Props = {
  title: string,
  video: string,
  options: [],
  handleOptionSelected: () => Object
};

type State= {
  activeRadio: string
}

export default class AdditionalUploadOption extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeRadio: '',
    };
  }
  props: Props;
  state: State;

  handleSelection = (ev) => {
    const { handleOptionSelected, options } = this.props;
    const label = ev.currentTarget.value;
    const option = options.find(x => x.label === label);
    this.setState({
      activeRadio: label,
    });

    if (typeof handleOptionSelected === 'function' && option) {
      handleOptionSelected(option);
    }
  };

  renderPriceTitle = (option) => {
    if (option.value) return <span className="gratis-title">GRATIS</span>;
    return <span className="price-title">{`+R$${option.price}`}</span>;
  };

  renderOptions = () => {
    const { options } = this.props;
    const { activeRadio } = this.state;
    return options.map(
      (option) => (
        <BoxRadio
          key={option.label}
          value={option.label}
          onChange={this.handleSelection}
          name="box-radio"
          checked={activeRadio === option.label}
        >
          <section className="box-radio-container">
            <span>{option.label}</span>
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
            <Link className="link" to={video}>Vídeo explicativo</Link>
          </div>
        </div>
        <div className="content">
          {this.renderOptions()}
        </div>
      </section>
    );
  }
}
