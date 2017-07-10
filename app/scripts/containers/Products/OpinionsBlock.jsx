// @flow

//botão para mostrar de 6 em 6
//listar apenas 6 em 6

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

export default class OpinionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      load: 6,
      visible: 2,
    };
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
    Array.from({ length: 5 }, (v, k) => {
      return (
        <li className={cx('opinion-stars-item', k + 1 <= stars && 'opinion-stars-item-filled')}>
          <StarIcon />
        </li>
      );
    })
  )

  renderListOpinions() {
    const { opinions: { list } } = this.props;
    const { visible } = this.state;

    return list
      .slice(0, visible)
      .map((item, key) => (
        <div className="opinion-boxText" key={item.id} name={key}>
          <p className="opinion-title">{item.title}</p>
          <ul className="opinion-stars">{this.renderStars(item.stars)}</ul>
          <p>"{item.content}"</p>
          <sub>{item.author}</sub>
        </div>
      )
    );
  }

  renderListTotalOpinions() {
    const { opinions: { stars, list } } = this.props;
    const map = new Map(Object.entries(stars));
  
    //https://pt.stackoverflow.com/questions/173293/como-percorrer-um-objeto-em-javascript
    //for (let [key, value] of Object.entries(stars)) {
      //console.log(key + ' ' + value);
    //}

    console.log(stars);
    console.log('map', map);
    //console.log('Object Entries', Object.entries(stars));

    //Object.keys(stars).forEach((value) => (
      //console.log('Stars', value + ' ' + stars[value])
    //));

    return Object.entries(stars).map((item, key) => (
      <div key={item.id} name={key}>
        <ul className="opinion-stars">{this.renderStars(item.stars)}</ul>
      </div>
    ));
  }

  render() {
    const { opinions } = this.props;
    const { visible, load } = this.state;

    console.log(opinions);
    console.log('nota de avaliação', opinions.avgNumber);
    console.log('total de avaliações', opinions.count);
    console.log('avaliações com estrelas', opinions.stars);

    return (
      <section className="container-opinions">
        <h4 className="opinions-title">Mais opiniões</h4>
        <div className="container-boxOpinions">
          <div className="box-opinions">
            <h5 className="opinion-titleNumber"><span>94</span>% dos clientes recomendam este produto</h5>
            <p>Avaliação geral: {opinions.avgNumber} de {opinions.count} avaliações</p>
            <p>{this.renderListTotalOpinions()}</p>
          </div>
          <div className="box-opinions">
            <h5 className="opnions-subtitle">E você, o que achou?</h5>
            <input type="text" placeholder="Envie a sua opinião..." />
            <div className="container-boxOpinions">
              {this.renderListOpinions()}
            </div>
            {opinions.list.length - visible > 0 && <button className="btn-default btn-third btn-xs" onClick={this.moreComments}>carregar mais avaliações ({opinions.list.length - visible > load ? load : opinions.list.length - visible })</button>}
          </div>
        </div>
      </section>
    );
  }
}
