// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import Loading from 'components/Loading';

type Props = {
  pickupPlaces: [],
  selectedPickupPlace: number,
};

type State = {
  selectedPickupPlace: number,
};

export default class MatrixPickupPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickupPlace: props.selectedPickupPlace || 0,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPickupPlace !== this.state.selectedPickupPlace) {
      this.setState({
        selectedPickupPlace: nextProps.selectedPickupPlace,
      });
    }
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  render() {
    const { pickupPlaces } = this.props;

    if (pickupPlaces.length === 0) {
      return <Loading />;
    }
    return (
      <div>123</div>
    );
  }
}
