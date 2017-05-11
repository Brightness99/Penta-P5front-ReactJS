// @flow

import React from 'react';
import Topbar from './Topbar';
import Logo from './Logo';

type Props = {
  screenSize: string,
};

export class Header extends React.Component {

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <header className="app__header">
        <Logo />
      </header>
    );
  }

  renderDesktop() {
    return (
      <header className="app__header">
        <Topbar />
        <div className="app__header__container container">
          <Logo />
        </div>
      </header>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default Header;
