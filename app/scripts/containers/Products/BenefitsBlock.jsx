// @flow
// TODO: Carousel on mobile
import React from 'react';
import Logo from 'components/Logo';

import { CheckIcon, CloseIcon } from 'components/Icons';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  advantages: {},
};

export default class BenefitsBlock extends React.Component {
  static props: Props;

  renderListAdvantages() {
    const { advantages } = this.props;

    return advantages.LIST.map((item) => (
      <p><i className="checkIcon"><CheckIcon /></i>{item}</p>
    ));
  }

  render() {
    const { advantages } = this.props;

    return (
      <section className="container-benefits">
        <h4 className="benefits-title">{advantages.TITLE}</h4>
        <div className="container-benefitsCard">
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">{advantages.OTHER_ONLINE_PRINTING_COMPANIES}</p>
            <p><i className="checkIcon"><CheckIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="checkIcon"><CheckIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
          </div>
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">
              <Logo />
            </p>
            {this.renderListAdvantages()}
            <div className="benefitsCard-btn">
              <button className="btn-default btn-primary btn-lg">Configure este produto</button>
            </div>
          </div>
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">{advantages.TRADITIONAL_PRINTING_COMPANIES}</p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="closeIcon"><CloseIcon /></i></p>
            <p><i className="checkIcon"><CheckIcon /></i></p>
            <p><i className="checkIcon"><CheckIcon /></i></p>
            <p><i className="checkIcon"><CheckIcon /></i></p>
          </div>
        </div>
        <sub>{advantages.CHECK_AVAILABLE_PRODUCTS}</sub>
      </section>
    );
  }
}
