// @flow

import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { vsprintf } from 'sprintf-js';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { StarIcon } from 'components/Icons';
import { BlockTitle } from 'atoms/Titles';

type Props = {
  screenSize: AppStoreType.screenSize,
  locale: {},
  opinions: {},
  product: {},
};

type State = {
  load: number,
  visible: number,
};

export class ProductOpinionsBlock extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      load: 6,
      visible: 2,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

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
  };

  renderStars(stars: number) {
    return (
      <ul className="opinion-stars">
        {Array.from([1, 2, 3, 4, 5], (value) => (
          <li className={cx('opinion-stars-item', value <= stars && 'opinion-stars-item-filled')} key={value}>
            <StarIcon />
          </li>
        ))}
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
          {this.renderStars(item)}
          {this.loaderStars(stars[item])}
          <p className="opinions-star-number">{stars[item] || 0}</p>
        </div>
      )
    );
  }

  loaderStars(item = 0) {
    const { opinions } = this.props;

    return (
      <div className="loader">
        <div
          className="linePercentual"
          style={{
            width: `${(item * 100) / opinions.count}%`,
          }}
        />
      </div>
    );
  }

  renderOpinions() {
    const { opinions, product, locale } = this.props;
    const { visible, load } = this.state;

    return (
      <div className="box-opinions">
        <div className="box-formOpinions">
          <h5 className="opnions-subtitle">{locale.YOUR_OPINION}</h5>
          <a
            className="atm-button-rounded atm-button-rounded--blue"
            href={`mailto:suporte@printi.com.br?subject=Avaliação do produto ${product.name}`}
          >
            {locale.SUBMIT_REVIEW}
          </a>
        </div>
        <div className="container-boxOpinions">
          {this.renderListOpinions()}
          {opinions.list.length - visible > 0 &&
            <button className="atm-button-transparent" onClick={this.moreComments}>
              {locale.LOAD_MORE} ({opinions.list.length - visible > load ? load : opinions.list.length - visible })
            </button>
          }
        </div>
      </div>
    );
  }

  renderMobile() {
    const { opinions, locale } = this.props;

    return (
      <div className="box-opinions">
        <div className="box-opinions--mobile">
          <div className="box-opinions-total">{opinions.avgNumber.replace('.', ',')}</div>
          <div className="box-opinions-stars">
            {this.renderStars(Math.round(parseFloat(opinions.avgNumber)))}
            <span>{opinions.count} {locale.REVIEWS}</span>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { opinions, locale } = this.props;

    return (
      <div className="box-opinions">
        <div className="opinion-textEvaluation">
          {`${locale.GENERAL_REVIEW}: `}{this.renderStars(Math.round(parseFloat(opinions.avgNumber)))}{` ${vsprintf(locale.TOTAL_REVIEWS, opinions.count)}.`}
        </div>
        {this.renderListTotalOpinions()}
      </div>
    );
  }

  render() {
    const { screenSize, locale } = this.props;

    return (
      <section className="container-opinions">
        <div className="container">
          <BlockTitle>{locale.TITLE}</BlockTitle>
          <div className="container-boxOpinions">
            {isMobile(screenSize) ? this.renderMobile() : this.renderDesktop()}
            {this.renderOpinions()}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_landing_page.reviews,
    opinions: state.products.opinions,
    product: state.products.product,
  };
}

export default connect(mapStateToProps)(ProductOpinionsBlock);
