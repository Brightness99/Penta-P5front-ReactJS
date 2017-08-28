// @flow

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import { HeartIcon, HelpCircleIcon, ExclusiveServiceIcon, MenuIcon, AngleDownIcon, MyAccountIcon, Glass } from 'components/Icons';
import LogoScroll from 'components/LogoScroll';
import Overlay from 'components/Overlay';
import Logo from 'components/Logo';


import Cart from './_Cart';
import ExclusiveService from './_ExclusiveService';
import SearchBar from './_SearchBar';
import Topbar from './_Topbar';

import Account from './Account';
import Bag from './Bag';
import ArrowMenu from './ArrowMenu';
import Menu from './Menu';
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
  state: State;

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
  }

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
    const { showProduct, showProfile, sideBar, logoScroll, logo, showTopbar } = this.state;

    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/svg/icon-search.svg')}')`,
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    return (
      <header
        className={cx(
          'org-header',
          !showTopbar && 'org-header--scrolled'
        )}
      >
        <Topbar />
        <div className="org-header-content">
          <div className="container">
            <Logo small={!showTopbar} enableLink={true} />
            <div className="mol-header-button">
              <button className="atm-header-button">
                <MenuIcon />Menu
              </button>
            </div>
            <div className="mol-header-button">
              <button className="atm-header-button">
                <AngleDownIcon />Produtos
              </button>
            </div>
            <SearchBar dispatch={dispatch} />
            <div className="mol-header-button">
              <div className="atm-header-button">
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
        {/*<div>*/}
          {/*<div className={"app__header__container container" + (logoScroll ? ' headerScroll' : '')}>*/}
            {/*<div>*/}
              {/*{ logo && (<Logo enableLink={true} />) }*/}
              {/*{ logoScroll && (<div><LogoScroll /></div>) }*/}
              {/*<div className="menu">*/}
                {/*<NavLink className="title-logo-menu menu" to="#" onClick={this.showToggleNav}>*/}
                  {/*<Menu /><span>Menu</span>*/}
                {/*</NavLink>*/}
              {/*</div>*/}
              {/*<div className="arrowProduct">*/}
                {/*<NavLink className="title-logo-menu products" to="#" onClick={this.showToggleNav}>*/}
                  {/*<ArrowMenu />Produtos*/}
                {/*</NavLink>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className="box-search">*/}
              {/*<form>*/}
                {/*<input type="text" placeholder="Procure por produtos ou informações..." className="input-text" />*/}
                {/*<input type="submit" value="" className="btn-default btn-secondary btn-lg" style={styles} />*/}
              {/*</form>*/}
            {/*</div>*/}
            {/*<div className="box-bag-account-cart">*/}
              {/*<div className="box-bag-text">*/}
                {/*<NavLink to="#" className="title-logo-menu">*/}
                  {/*<Bag />*/}
                  {/*<span>atendimento exclusivo</span>*/}
                {/*</NavLink>*/}
              {/*</div>*/}
              {/*<div>*/}
                {/*<NavLink to="/login-cadastro" className="accountIcon" id="profile" onClick={this.showToggleNav}>*/}
                  {/*<Account />*/}
                {/*</NavLink>*/}
              {/*</div>*/}
              {/*<div>*/}
                {/**/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*<div className="container-allSubmenus">*/}
          {/*<div className="container">*/}
            {/*{showProduct && (<ProductsMenu />)}*/}
            {/*{showProfile && (<ProfileMenu />)}*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*{sideBar && (<Sidebar screenSize={screenSize} />)}*/}
        {/*</div>*/}
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
