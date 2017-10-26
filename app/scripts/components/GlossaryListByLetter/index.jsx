// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  letter: string,
  items: []
};

export class GlossaryListByLetter extends React.PureComponent {
  props: Props;

  getTitle(letter: string) {
    return letter.toLocaleUpperCase() + letter.toLocaleLowerCase();
  }

  render() {
    const { letter, items } = this.props;
    return (
      <div className="org-content-alphabet-list">
        <p className="title-content-list">{this.getTitle(letter)}</p>
        <div className="mol-content-list">
          <ul className="atm-list-link">
            {
              items.map(x =>
                <li key={x.slug}>
                  <NavLink to={`/glossario/${x.slug}`}>
                    {x.title}
                  </NavLink>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}
