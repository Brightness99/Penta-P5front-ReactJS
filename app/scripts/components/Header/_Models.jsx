// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { AngleDownIcon } from 'components/Icons';

type Props = {
};

export default class HeaderModels extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  render() {
    return (
      <div className="mol-topbar-models">
        <button className="atm-topbar-link">
          Modelos <AngleDownIcon />
        </button>
        <ul className="mol-topbar-modelList">
          123
        </ul>
      </div>
    );
  }
}
