// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import cx from 'classnames';
import { ExclusiveServiceIcon, MenuIcon, AngleDownIcon, MyAccountIcon } from 'components/Icons';
import LogoLoyalty from 'components/LogoLoyalty';
import LoyaltyTopbar from 'components/Header/LoyaltyTopbar';
import { userLogOut } from 'actions';

import Cart from './Cart';
import ExclusiveService from './ExclusiveService';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Topbar from './Topbar';
import Products from './Products';
import MyAccount from './MyAccount';

type Props = {
  screenSize: string,
  links: {},
  dispatch: () => {},
  totalCartItems: number,
  isAuthorized: boolean,
  config: {},
  account: {},
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
    const { screenSize } = this.props;

    if (!isMobile(screenSize)) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentDidUpdate() {
    const { screenSize } = this.props;

    if (!isMobile(screenSize)) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    const { screenSize } = this.props;

    if (!isMobile(screenSize)) {
      window.removeEventListener('scroll', this.handleScroll);
    }
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

  handleLogOut=() => {
    this.props.dispatch(userLogOut());
  };

  renderMobile() {
    const { screenSize, dispatch, totalCartItems, isAuthorized, config, account: { loyalty } } = this.props;
    const { activePane } = this.state;

    return (
      <header className="org-header">
        {loyalty.isLoaded && !loyalty.isRunning && loyalty.header && <LoyaltyTopbar />}
        <div className="mol-mobile-header">
          <div className="mol-header-button mol-header-button--menu">
            <button onClick={this.handleShowMenu} className="atm-header-icon-button">
              <MenuIcon />
            </button>
          </div>
          <LogoLoyalty enableLink={true} />
          <Cart dispatch={dispatch} totalCartItems={totalCartItems} />
          <div className="mol-header-button">
            <button onClick={this.handleShowMyAccount} className="atm-header-icon-button">
              <MyAccountIcon />
            </button>
          </div>
        </div>
        <SearchBar dispatch={dispatch} />
        <Menu
          screenSize={screenSize}
          isHidden={activePane !== 'menu'}
          categories={config.productCategories.categories}
          handleClose={this.handlePaneHide}
        />
        <MyAccount
          isHidden={activePane !== 'account'}
          handleClose={this.handlePaneHide}
          handleLogOut={this.handleLogOut}
          isAuthorized={isAuthorized}
          screenSize={screenSize}
        />
      </header>
    );
  }

  renderDesktop() {
    const { screenSize, dispatch, totalCartItems, isAuthorized, config, account: { loyalty } } = this.props;
    const { showTopbar, activePane } = this.state;

    return (
      <header
        className={cx(
          'org-header',
          !showTopbar && 'org-header--scrolled'
        )}
      >
        <Topbar handleClose={this.handlePaneHide} />
        {loyalty.isLoaded && !loyalty.isRunning && loyalty.header && <LoyaltyTopbar />}
        <div className="org-header-content">
          <div className="container">
            <LogoLoyalty small={!showTopbar} enableLink={true} />
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
                  'atm-header-button-products',
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
              <MyAccount
                screenSize={screenSize}
                isAuthorized={isAuthorized}
                handleLogOut={this.handleLogOut}
              />
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
          categories={config.productCategories.categories}
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

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

export default connect(mapStateToProps)(Header);

