// @flow

import React from 'react';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import cx from 'classnames';
import { ExclusiveServiceIcon, MenuIcon, AngleDownIcon, MyAccountIcon } from 'components/Icons';
import Logo from 'components/Logo';

import Cart from './_Cart';
import ExclusiveService from './_ExclusiveService';
import Menu from './_Menu';
import SearchBar from './_SearchBar';
import Topbar from './_Topbar';
import Products from './_Products';
import MyAccount from './_MyAccount';

type Props = {
  screenSize: string,
  links: {},
  dispatch: () => {},
  totalCartItems: number,
};

type State = {
  showTopbar: boolean,
  activePane: string,
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTopbar: true,
      activePane: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  static props: Props;

  static state: State;

  handleScroll = () => {
    const windowScrollPosition = document.body.scrollTop;

    if (windowScrollPosition > 60) {
      this.setState({
        showTopbar: false,
      });
    } else {
      this.setState({
        showTopbar: true,
      });
    }
  };

  handlePaneHide = () => {
    this.setState({
      activePane: '',
    });
  };

  handleShowMenu = () => {
    this.setState({
      activePane: 'menu',
    });
  };

  handleShowProducts = () => {
    this.setState({
      activePane: 'products',
    });
  };

  handleShowMyAccount = () => {
    this.setState({
      activePane: 'account',
    });
  };

  renderMobile() {
    const { screenSize, dispatch, totalCartItems } = this.props;
    const { activePane } = this.state;

    return (
      <header className="org-header">
        <div className="mol-mobile-header">
          <div className="mol-header-button mol-header-button--menu">
            <button onClick={this.handleShowMenu} className="atm-header-icon-button">
              <MenuIcon />
            </button>
          </div>
          <Logo enableLink={true} />
          <Cart dispatch={dispatch} totalCartItems={totalCartItems} />
          <div className="mol-header-button">
            <button onClick={this.handleShowMyAccount}  className="atm-header-icon-button">
              <MyAccountIcon />
            </button>
          </div>
        </div>
        <SearchBar dispatch={dispatch} />
        <Menu
          screenSize={screenSize}
          isHidden={activePane !== 'menu'}
          handleClose={this.handlePaneHide}
        />
        <MyAccount
          isHidden={activePane !== 'account'}
          handleClose={this.handlePaneHide}
          screenSize={screenSize}
        />
      </header>
    );
  }

  renderDesktop() {
    const { screenSize, dispatch, totalCartItems } = this.props;
    const { showTopbar, activePane } = this.state;

    return (
      <header
        className={cx(
          'org-header',
          !showTopbar && 'org-header--scrolled'
        )}
      >
        <Topbar handleClose={this.handlePaneHide} />
        <div className="org-header-content">
          <div className="container">
            <Logo small={!showTopbar} enableLink={true} />
            <div className="mol-header-button">
              <button onClick={this.handleShowMenu} className="atm-header-button">
                <MenuIcon />Menu
              </button>
            </div>
            <div className="mol-header-button mol-header-button--no-position">
              <button
                onClick={activePane === 'products' ? this.handlePaneHide : this.handleShowProducts}
                className={cx(
                  'atm-header-button',
                  activePane === 'products' && 'atm-header-button-products--active',
                )}
              >
                <AngleDownIcon />Produtos
              </button>
            </div>
            <SearchBar dispatch={dispatch} />
            <div className="mol-header-button">
              <div onMouseOver={this.handlePaneHide} className="atm-header-button">
                <ExclusiveServiceIcon />Venda Corporativa
              </div>
              <ExclusiveService />
            </div>
            <div className="mol-header-button">
              <button className="atm-header-icon-button">
                <MyAccountIcon />
              </button>
              <MyAccount screenSize={screenSize} />
            </div>
            <Cart dispatch={dispatch} totalCartItems={totalCartItems} />
          </div>
        </div>
        <Menu
          screenSize={screenSize}
          isHidden={activePane !== 'menu'}
          handleClose={this.handlePaneHide}
        />
        <Products
          screenSize={screenSize}
          isHidden={activePane !== 'products'}
          handleClose={this.handlePaneHide}
        />
      </header>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

export default Header;
