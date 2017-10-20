// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { PrintiIcon, PrintiSymbolIcon } from 'components/Icons';

type Props = {
  enableLink: boolean,
  small: boolean,
  fill: string,
  onClick: () => {},
  account: {},
};

export class LogoLoyalty extends React.Component {
  props: Props;

  setBackgroundColor = (color) => {
    return {
      background: color,
    };
  }

  render() {
    const { enableLink, small, account: { loyalty } } = this.props;

    const handleClick = (ev) => {
      const { onClick } = this.props;

      if (typeof onClick === 'function') {
        onClick(ev);
      }
    };

    if (enableLink) {
      return (
        <div className="atm-printi-logo">
          <NavLink to="/" onClick={handleClick}>
            {loyalty.isLoaded && !loyalty.isRunning && loyalty.color && <div className="org-logo-loyalty">
              {small ? '' : <p>Club</p> }
              {loyalty.color && <p className="mol-logo-loyalty" style={this.setBackgroundColor(loyalty.color)}>{loyalty.loyalty_tier_name}</p>}
            </div>}
          </NavLink>
        </div>
      );
    }

    return (
      <NavLink to="/" onClick={handleClick}>
        {loyalty.isLoaded && !loyalty.isRunning && loyalty.color && <div className="org-logo-loyalty">
          {small ? '' : <p>Club</p> }
          {/*<p>Club</p>*/}
          {loyalty.color && <p className="mol-logo-loyalty" style={this.setBackgroundColor(loyalty.color)}>{loyalty.loyalty_tier_name}</p>}
        </div>}
      </NavLink>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

export default connect(mapStateToProps)(LogoLoyalty);
