// @flow

import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { RadioButton } from 'components/Input';
import Loading from 'components/Loading';

type Props = {
  locale: {},
  className: string,
  screenSize: string,
  matrix: {
    dates: {},
    rows: {},
  },
  dispatch: () => {},
};

type State = {
  selectedDay: number,
};

export default class MatrixShippingTable extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedDay: 0,
    };
  }

  componentWillUpdate(nextProps) {
    const currentProps = this.props;

    if (Object.keys(currentProps.matrix.dates).length <= 0 && Object.keys(nextProps.matrix.dates).length > 0) {
      this.setState({
        selectedDay: Object.keys(nextProps.matrix.dates)[0],
      });
    }
  }

  static props: Props;

  static state: State;

  handleMobileDate = (ev) => {
    this.setState({
      selectedDay: ev.currentTarget.name,
    });
  };

  renderMobileDayChoser(timestamp: number) {
    const date = moment(new Date(timestamp * 1000));
    const { selectedDay } = this.state;

    return (
      <li key={timestamp}>
        <button
          className={cx(selectedDay === timestamp && 'selected')}
          name={timestamp}
          onClick={this.handleMobileDate}
        >
          <div className="app__config__shipping--datepicker__weekday">
            {date.format('dddd')}
          </div>
          <div className="app__config__shipping--datepicker__date">
            <span>{date.format('DD')}</span> {date.format('MMM')}
          </div>
        </button>
      </li>
    );
  }

  renderMobileTable() {
    const { matrix: { rows } } = this.props;
    const { selectedDay } = this.state;

    console.log(Object.keys(rows)
      .filter((quantity) => !Array.isArray(rows[quantity][selectedDay])), selectedDay);

    return Object.keys(rows)
      .filter((quantity) => rows[quantity][selectedDay] && !Array.isArray(rows[quantity][selectedDay]))
      .map((quantity) => {
        console.log(rows, quantity, selectedDay, Array.isArray(rows[quantity][selectedDay]));
        const prices = rows[quantity][selectedDay].prices;

        return (
          <tr key={quantity}>
            <td><span>{quantity}</span> un</td>
            <td>
              <label>
                <RadioButton />
                <div className="app__config__shipping-price">
                  {`R$ ${prices.total.toFixed(2)}`}
                  <span>{`R$ ${prices.unit.toFixed(2)} / un`}</span>
                </div>
              </label>
            </td>
          </tr>
        );
      });
  }

  renderMobile() {
    const { matrix } = this.props;

    return (
      <div className="app__config__shipping">
        <ul className="app__config__shipping-datepicker">
          {
            Object.keys(matrix.dates).map((timestamp) => this.renderMobileDayChoser(timestamp))
          }
        </ul>
        <table className="app__config__shipping-table">
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            { this.renderMobileTable() }
          </tbody>
        </table>
      </div>
    );
  }

  renderDesktop() {
    return (
      <table>
        <thead />
        <tbody />
      </table>
    );
  }

  render() {
    const { screenSize, matrix: { isRunning, isLoaded } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}
