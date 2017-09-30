// @flow

import React from 'react';
import cx from 'classnames';

import { StarIcon } from 'components/Icons';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  opinions: {},
};

type State = {
  load: number,
  visible: number,
}

export default class ProductOpinionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      load: 6,
      visible: 2,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  }

  props: Props;

  state: State;

  moreComments = () => {
    const { opinions: { list } } = this.props;
    const { load, visible } = this.state;

    if ((load + visible) <= list.length) {
      this.setState({
        visible: visible + load,
      });
    } else {
      this.setState({
        visible: list.length,
      });
    }
  }

  renderStars = (stars: number) => (
    Array.from({ length: 5 }, (v, k) => (
      <li className={cx('opinion-stars-item', k + 1 <= stars && 'opinion-stars-item-filled')}>
        <StarIcon />
      </li>
    ))
  )

  starSubtitle() {
    const { opinions } = this.props;

    return (
      <ul className="opinion-stars">
        {this.renderStars(opinions.avgNumber)}
      </ul>
    );
  }

  renderListOpinions() {
    const { opinions: { list } } = this.props;
    const { visible } = this.state;

    return list
      .slice(0, visible)
      .map((item) => (
        <div className="opinion-boxText" key={item.id}>
          <p className="opinion-title">{item.title}</p>
          <ul className="opinion-stars">{this.renderStars(item.stars)}</ul>
          <p className="opinion-text">"{item.content}"</p>
          <sub>{item.author}</sub>
        </div>
      )
    );
  }

  renderListTotalOpinions() {
    const { opinions: { stars } } = this.props;

    return [1, 2, 3, 4, 5]
      .sort((a, b) => b - a)
      .map((item) => (
        <div key={`opinons-stars-${item}`} className="opinions-percentual-stars">
          <ul className="opinion-stars">
            {this.renderStars(item)}
          </ul>
          {this.loaderStars(stars[item])}
          <p className="opinions-star-number">{stars[item] || 0}</p>
        </div>
      )
    );
  }

  loaderStars(item = 0) {
    const { opinions } = this.props;
    const percentual = (item * 100) / opinions.count;

    return (
      <div className="loader">
        <div className={`linePercentual star-${percentual}`} />
      </div>
    );
  }

  render() {
    const { opinions } = this.props;
    const { visible, load } = this.state;

    return (
      <section className="container-opinions">
        <div className="container">
          <h4 className="opinions-title">Mais opiniões</h4>
          <div className="container-boxOpinions">
            <div className="box-opinions">
              <h5 className="opinion-titleNumber"><span>94</span>% dos clientes recomendam este produto</h5>
              <p className="opinion-textEvaluation">Avaliação geral: {this.starSubtitle()} de {opinions.count} avaliações.</p>
              {this.renderListTotalOpinions()}
            </div>
            <div className="box-opinions">
              <div className="box-formOpinions">
                <h5 className="opnions-subtitle">E você, o que achou?</h5>
                <form>
                  <input type="text" className="input-text" placeholder="Envie a sua opinião..." />
                  <input type="submit" className="btn-default btn-secondary btn-lg input-submit" name="opinions" value="Enviar" />
                </form>
              </div>
              <div className="container-boxOpinions">
                {this.renderListOpinions()}
              </div>
              {opinions.list.length - visible > 0 && <button className="btn-default btn-third btn-xs" onClick={this.moreComments}>carregar mais avaliações ({opinions.list.length - visible > load ? load : opinions.list.length - visible })</button>}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
