// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

type Props = {
  enableLink: boolean,
  small: boolean,
  fill: string,
  onClick: () => {},
  account: {},
};

export class LogoLoyalty extends React.Component {
  props: Props;

  setBackgroundColor = (color) => ({
    background: color,
  });

  render() {
    const { account: { loyalty }, small, enableLink } = this.props;

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
