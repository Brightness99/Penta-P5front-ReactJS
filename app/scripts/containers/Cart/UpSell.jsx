// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { ChevronRightIcon } from 'components/Icons';

type Props = {
  onClick: () => {},
};

export default class CartUpSell extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleModalOpen = () => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  render() {
    return (
      <div className="org-up-sell">
        <button onClick={this.handleModalOpen} className="mol-up-sell">turbine seu produto <ChevronRightIcon /></button>
      </div>
    );
  }
}
