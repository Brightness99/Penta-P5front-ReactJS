// @flow

import React from 'react';
import { connect } from 'react-redux';

import Newsletter from 'components/Newsletter';

import Logo from './Logo';
import Social from './Social';
import Links from './Links';
import Disclaimer from './Disclaimer';
import Badges from './Badges';
import Infos from './Infos';

export class Footer extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: {
    locale: LocaleFooter,
    screenSize: string,
  };

  renderMobile = () => {
    const { locale: { RIGHTS_RESERVED, INFOS, SEE_ALL_LINKS, links }, screenSize } = this.props;

    return (
      <footer className="app__footer">
        <Newsletter parent={'footer'} />
        <Social />
        <Links links={links} screenSize={screenSize} locale={{ SEE_ALL_LINKS }} />
        <Logo className="app__footer__logo" />
        <Disclaimer locale={{ RIGHTS_RESERVED }} />
        <Infos locale={{ INFOS }} />
      </footer>
    );
  };

  renderDesktop = () => {
    const {
      locale: {
        RIGHTS_RESERVED,
        INFOS,
        certificates,
        support,
        payment_methods,
        links,
      },
      screenSize,
    } = this.props;
    return (
      <footer className="app__footer">
        <Newsletter parent={'footer'} />
        <hr />
        <div className="app__footer__data container">
          <div className="app__footer__data-left">
            <Logo className="app__footer__logo" />
            <Social minified />
            <Disclaimer locale={{ RIGHTS_RESERVED }} />
          </div>
          <Links links={links} screenSize={screenSize} />
        </div>
        <hr />
        <Badges locale={{ certificates, payment_methods, support }} />
        <Infos locale={{ INFOS }} />
      </footer>
    );
  };

  render() {
    const { screenSize } = this.props;
    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state, ownProps: {} = {}): {} {
  return {
    ...ownProps,
    locale: state.locale.translate.footer,
  };
}

export default connect(mapStateToProps)(Footer);
