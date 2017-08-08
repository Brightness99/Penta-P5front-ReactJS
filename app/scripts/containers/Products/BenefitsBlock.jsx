// @flow
// TODO: Carousel on mobile
import React from 'react';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';

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
      <p key={`advantages-${item}`}><i className="checkIcon"><CheckIcon /></i>{item}</p>
    ));
  }
  //  <h4 className="benefits-title">{advantages.TITLE}</h4>
  renderMobile() {
    const { advantages } = this.props;

    return (
      <section className="container-benefits">
        <div className="container">
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
          <div className="benefitsCard-btn">
            <Link to={{ pathname: `/configuracao-banner` }} className="btn-default btn-primary btn-lg">Configure este produto</Link>
          </div>
        </div>
      </section>
    );
  }
  renderDesktop() {
    const { advantages } = this.props;

    return (
      <section className="container-benefits">
        <div className="container">
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
                <Link to={{ pathname: `/configuracao-banner` }} className="btn-default btn-primary btn-lg">Configure este produto</Link>
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
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}
