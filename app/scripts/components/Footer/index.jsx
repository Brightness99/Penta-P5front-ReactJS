// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Newsletter from 'components/Newsletter';
import Logo from './Logo';
import Social from './Social';
import Links from './Links';
import Disclaimer from './Disclaimer';
import Badges from './Badges';
import Infos from './Infos';

type Props = {
  locale: LocaleFooter,
  screenSize: string,
};

export class Footer extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile = () => {
    const { locale: { RIGHTS_RESERVED, INFOS, VIEW_ALL_LINKS, links }, locale, screenSize } = this.props;

    return (
      <footer className="app__footer">
        <Newsletter parent={'footer'} />
        <Social locale={locale} />
        <Links links={links} screenSize={screenSize} locale={{ VIEW_ALL_LINKS }} />
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
        links,
      },
      locale,
      screenSize,
    } = this.props;
    return (
      <footer className="app__footer">
        <Newsletter parent={'footer'} />
        <hr />
        <div className="app__footer__data container">
          <div className="app__footer__data-left">
            <Logo className="app__footer__logo" />
            <Social minified locale={locale} />
            <Disclaimer locale={{ RIGHTS_RESERVED }} />
          </div>
          <Links links={links} screenSize={screenSize} />
        </div>
        <hr />
        <Badges locale={locale} />
        <Infos locale={{ INFOS }} />
      </footer>
    );
  };

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state: {}): {} {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.footer,
  };
}

export default connect(mapStateToProps)(Footer);
