// @flow

import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { isMobile } from 'utils/helpers';
import { CloseIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  handleCloseTopbar: () => {},
  account: {};
}
export class LoyaltyTopbar extends React.Component {
  props: Props;

  setBackgroundColor = (color) => {
    return {
      background: color,
    };
  }

  setColor = (color) => {
    return {
      color,
    };
  }

  closeTopbar = () => {
    const { handleCloseTopbar } = this.props;

    /* istanbul ignore else */
    if (typeof handleCloseTopbar === 'function') {
      handleCloseTopbar();
    }
  };

  handleClickClose = (ev) => {
    ev.preventDefault();

    this.closeTopbar();
  };

  render() {
    const { screenSize, account: { loyalty } } = this.props;
    return (
      <div className="org-loyalty-topbar" style={this.setBackgroundColor(loyalty.color)}>
        <div className={cx(!isMobile(screenSize) ? 'container' : 'container-mobile')}>
          <div className="mol-loyalty-topbar">
            <div>
              <div className="qrk-type-of-loyalty" style={this.setColor(loyalty.color)}>
                <p>{loyalty.loyalty_tier_name}</p>
              </div>
              <p>{loyalty.header}</p>
            </div>
            <a href="#close" onClick={this.handleClickClose}><CloseIcon /></a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

export default connect(mapStateToProps)(LoyaltyTopbar);
