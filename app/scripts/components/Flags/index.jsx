// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  countryCode: string,
};

type State = {
  component: ?any,
};

export default class FlagIcon extends React.Component {
  constructor(props: Props): void {
    super(props);

    this.state = {
      component: null,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  async componentDidMount() {
    const { countryCode } = this.props;

    if (countryCode) {
      const { default: Flag } = await import(`./4x3/${countryCode.toUpperCase()}`);

      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        component: <Flag />,
      });
      /* eslint-enable react/no-did-mount-set-state */
    } else {
      Error('FlagIcon: Country Code is undefined.');
    }
  }

  static props: Props;
  static state: State;

  render() {
    return (
      <i className="atm-flag-icon">
        {this.state.component}
      </i>
    );
  }
}
