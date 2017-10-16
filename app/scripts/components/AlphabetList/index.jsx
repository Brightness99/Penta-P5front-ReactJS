// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';

type Props = {
  screenSize: string,
  indexes: [],
  filter: (query: string) => void,
}

type State = {
  alphabetWithAvailability: []
}

export class AlphabetList extends React.Component {
  constructor(props: Props) {
    super(props);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map(x => x);
    this.state = {
      alphabetWithAvailability: this.alphabet.map(x => ({ key: x, value: true })),
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  componentWillReceiveProps = (nextProps: Props) => {
    const { indexes } = nextProps;
    const array = this.alphabet.map(x => ({
      key: x,
      value: indexes.includes(x),
    }));
    this.setState({
      alphabetWithAvailability: array,
    });
  };

  props: Props;
  state: State;
  alphabet: [];

  render() {
    const { screenSize, filter } = this.props;
    const { alphabetWithAvailability } = this.state;
    return (
      <div className={cx(isMobile(screenSize) && ('scroll-list-mobile'))}>
        <ul className="org-alphabet-list">
          <li>
            <Link onClick={() => filter('')} to="#">#</Link>
          </li>
          {
            alphabetWithAvailability.map(x =>
              <li key={x.key}>
                <Link className={cx({ 'disable-link': !x.value })} onClick={() => filter(x.key)} to="#">{x.key.toUpperCase()}</Link>
              </li>)
          }
        </ul>
      </div>
    );
  }
}
