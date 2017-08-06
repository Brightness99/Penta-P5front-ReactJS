// @flow

import React from 'react';
import Topbar from './Topbar';
import Logo from './Logo';
import Account from './Account';
import Cart from './Cart';
import Bag from './Bag';

type Props = {
  screenSize: string,
  links: {},
  dispatch: () => {},
};

type State = {
  open: boolean,
};

//https://codepen.io/danbuda/post/a-react-navbar-component
//https://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
//https://codepen.io/kjamshaid/pen/yJqAzw
//https://stackoverflow.com/questions/30135351/toggle-dropdown-menu-in-reactjs
//https://stackoverflow.com/questions/39974486/accordion-sidebar-menu-using-nav-components-with-react-bootstrap
//https://jsfiddle.net/jL3yyk98/

//hover
//https://jsfiddle.net/qfLzkz5x/8/
//https://stackoverflow.com/questions/29981236/how-do-you-hover-in-reactjs-onmouseleave-not-registered-during-fast-hover-ove
//https://stackoverflow.com/questions/41937093/in-react-onmouseenter-or-hover-is-not-working-as-expected
//https://jsfiddle.net/qfLzkz5x/8/

//sidebar
//http://plnkr.co/edit/fojeyUjllAJ5UYejYf0m?p=preview
//http://reactjsexample.com/tag/sidebar/
//https://codepen.io/jackrugile/pen/lCDIL
//https://codepen.io/sirJconny/pen/BRzQEx

//show and hide
//https://stackoverflow.com/questions/24502898/show-or-hide-element

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;
  state: State;

  renderMobile() {
    return (
      <header className="app__header">
        <Logo />
      </header>
    );
  }

  renderDesktop() {
    const { dispatch } = this.props;

    return (
      <header className="app__header">
        <Topbar />
        <div className="app__header__container container">
          <div>
            <Logo />
            <div className="menu">
              <p className="title-logo-menu">Menu</p>
            </div>
            <div>
              <p className="title-logo-menu">Produtos</p>
            </div>
          </div>
          <div className="box-search">
            <input type="text" placeholder="Procure por produtos ou informações" className="input-text" />
            <input type="submit" value="lupa" className="btn-default btn-secondary btn-lg" />
          </div>
          <div className="box-bag-account-cart">
            <div>
              <Bag />
              <p className="title-logo-menu">atendimento exclusivo</p>
            </div>
            <div>
              <Account />
            </div>
            <div>
              <Cart dispatch={dispatch} />
            </div>
          </div>
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
