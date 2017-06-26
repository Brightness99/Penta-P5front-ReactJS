// @flow

import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { settingsMatrixSelect } from 'actions';

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

export default class MatrixShippingTable extends React.Component {
  componentWillUpdate(nextProps) {
    const currentProps = this.props;

    if (Object.keys(currentProps.matrix.dates).length <= 0 && Object.keys(nextProps.matrix.dates).length > 0) {
      this.handleMatrixSelection(Object.keys(nextProps.matrix.dates)[0]);
    }
  }

  static props: Props;

  handleMatrixSelection = (selectedDate: number, selectedQuantity: number = 0 ) => {
    const { dispatch } = this.props;

    dispatch(settingsMatrixSelect(selectedDate, selectedQuantity));
  };

  handleMobileDate = (ev) => {
    this.handleMatrixSelection(ev.currentTarget.name);
  };

  renderMobileDayChoser(timestamp: number) {
    const date = moment(new Date(timestamp * 1000));
    const { matrix: { selection } } = this.props;

    return (
      <li key={timestamp}>
        <button
          className={cx(selection.date === timestamp && 'selected')}
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
    const { matrix: { rows, selection } } = this.props;

    return Object.keys(rows)
      .filter((quantity) => rows[quantity][selection.date] && !Array.isArray(rows[quantity][selection.date]))
      .map((quantity) => {
        const prices = rows[quantity][selection.date].prices;

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
