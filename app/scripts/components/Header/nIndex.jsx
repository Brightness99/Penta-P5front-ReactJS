// @flow

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import { HeartIcon, HelpCircleIcon, ExclusiveServiceIcon, MenuIcon, AngleDownIcon, MyAccountIcon, Glass } from 'components/Icons';
import LogoScroll from 'components/LogoScroll';
import Overlay from 'components/Overlay';
import Logo from 'components/Logo';

import { FadeToggle, SlideToggle } from 'animations';

import Cart from './_Cart';
import ExclusiveService from './_ExclusiveService';
import Menu from './_Menu';
import SearchBar from './_SearchBar';
import Topbar from './_Topbar';
import Products from './_Products';

import Account from './Account';
import Bag from './Bag';
import ArrowMenu from './ArrowMenu';
import Sidebar from './Sidebar';

import ProductsMenu from './ProductsMenu';
import ProfileMenu from './ProfileMenu';


type Props = {
  screenSize: string,
  links: {},
  dispatch: () => {},
  totalCartItems: number,
};

type State = {
  showProduct: boolean,
  showProfile: boolean,
  isHide: boolean,
  logo: boolean,
  sideBar: boolean,
  showTopbar: boolean,
  showMenu: boolean,
  showProducts: boolean,
  activePane: string,
};

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showProduct: false,
      showProfile: false,
      sideBar: false,
      isHide: false,
      logo: true,
      showTopbar: true,
      showMenu: false,
      showProducts: false,
      activePane: '',
    };
    this.showToggleNav = this.showToggleNav.bind(this);
  }

  static defaultProps = {
    screenSize: 'xs',
  };

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

  showToggleNav = (e) => {
    const { showProduct, showProfile, sideBar } = this.state;

    if (e.currentTarget.className === 'title-logo-menu products') {
      this.setState({
        showProduct: !showProduct,
      });
    } else if (e.currentTarget.className === 'accountIcon') {
      this.setState({
        showProfile: !showProfile,
      });
    } else if (e.currentTarget.className === 'title-logo-menu menu') {
      this.setState({
        sideBar: !sideBar,
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

  renderMobile() {
    const { screenSize, dispatch, totalCartItems } = this.props;
    const { showProduct, showProfile, sideBar } = this.state;

    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/svg/icon-search.svg')}')`,
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    return (
      <header className="app__header">
        <div>
          <div className="app__header__container container">
            <div>
              <div className="menu">
                <NavLink className="title-logo-menu menu" to="#" onClick={this.showToggleNav}>
                  <Menu />
                </NavLink>
              </div>
              <Logo enableLink={true} />
            </div>
            <div>
              <div>
                <Cart dispatch={dispatch} totalCartItems={totalCartItems} />
              </div>
              <div>
                <NavLink to="/login-cadastro" className="accountIcon" id="profile" onClick={this.showToggleNav}>
                  <Account />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="box-search-mobile">
            <form>
              <input type="text" placeholder="Procure por produtos ou informações" className="input-text" />
              <input type="submit" value="" className="btn-default btn-lg" style={styles} />
            </form>
          </div>
        </div>
        <div>
          {sideBar && (<Sidebar screenSize={screenSize} />)}
        </div>
      </header>
    );
  }

  renderDesktop() {
    const { screenSize, dispatch, totalCartItems } = this.props;
    const { showTopbar, activePane, showProducts } = this.state;

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
            <button className="atm-header-icon-button">
              <MyAccountIcon />
            </button>
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

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default Header;
