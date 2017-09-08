// @flow

import React from 'react';

export class ListModels extends React.Component {
  render() {
    return (
      <div className="org-list-models">
        <div className="mol-search-models">
          search
        </div>
        <div className="mol-list-models">
          <div className="atm-model">1</div>
          <div className="atm-model">2</div>
          <div className="atm-model">3</div>
          <div className="atm-model">4</div>
          <div className="atm-model">5</div>
        </div>
      </div>
    );
  }
}

export default ListModels;
