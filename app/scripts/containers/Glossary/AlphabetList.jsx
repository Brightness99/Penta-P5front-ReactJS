// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';

type Props = {
  screenSize: string,
}
class AlphabetList extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className={cx(isMobile(screenSize) && ('scroll-list-mobile'))}>
        <ul className="org-alphabet-list">
          <li>
            <NavLink to="#">#</NavLink>
          </li>
          <li>
            <NavLink to="#">A</NavLink>
          </li>
          <li>
            <NavLink to="#">B</NavLink>
          </li>
          <li>
            <NavLink to="#">C</NavLink>
          </li>
          <li>
            <NavLink to="#">D</NavLink>
          </li>
          <li>
            <NavLink to="#">E</NavLink>
          </li>
          <li>
            <NavLink to="#">F</NavLink>
          </li>
          <li>
            <NavLink to="#">G</NavLink>
          </li>
          <li>
            <NavLink to="#">H</NavLink>
          </li>
          <li>
            <NavLink to="#">I</NavLink>
          </li>
          <li>
            <NavLink to="#">J</NavLink>
          </li>
          <li>
            <NavLink to="#">K</NavLink>
          </li>
          <li>
            <NavLink to="#">L</NavLink>
          </li>
          <li>
            <NavLink to="#">M</NavLink>
          </li>
          <li>
            <NavLink to="#">N</NavLink>          
          </li>
          <li>
            <NavLink to="#">O</NavLink>
          </li>
          <li>
            <NavLink to="#">P</NavLink>
          </li>
          <li>
            <NavLink to="#">Q</NavLink>
          </li>
          <li>
            <NavLink to="#">R</NavLink>
          </li>
          <li>
            <NavLink to="#">S</NavLink>
          </li>
          <li>
            <NavLink to="#">T</NavLink>
          </li>
          <li>
            <NavLink to="#">U</NavLink>
          </li>
          <li>
            <NavLink to="#">V</NavLink>
          </li>
          <li>
            <NavLink to="#">W</NavLink>
          </li>
          <li>
            <NavLink to="#">X</NavLink>
          </li>
          <li>
            <NavLink to="#">Y</NavLink>
          </li>
          <li>
            <NavLink to="#">Z</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AlphabetList;
