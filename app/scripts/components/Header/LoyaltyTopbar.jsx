// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';
import { CloseIcon } from 'components/Icons';
import LogoLoyalty from 'components/LogoLoyalty';

type Props = {
  loyalty: {},
  onClose: () => {},
};

export class LoyaltyTopbar extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    document.querySelector('body').classList.add('has-loyalty-bar');
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('has-loyalty-bar');
  }

  static props: Props;

  handleClose = () => {
    const { onClose } = this.props;

    /* istanbul ignore else */
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  render() {
    const { loyalty } = this.props;

    return (
      <div className="org-loyalty-topbar" style={{ backgroundColor: loyalty.color }}>
        <div className="mol-loyalty-topbar container">
          <LogoLoyalty short={true} invert={true} />
          <div className="atm-loyalty-text">{loyalty.header}</div>
          <button className="atm-icon-button" onClick={this.handleClose}><CloseIcon /></button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loyalty: state.account.loyalty,
  };
}

export default connect(mapStateToProps)(LoyaltyTopbar);
