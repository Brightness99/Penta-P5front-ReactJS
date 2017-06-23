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
    selections: {},
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

  handleMatrixSelection = (selectedDate: number, selectedQuantity: number = 0) => {
    const { dispatch } = this.props;

    dispatch(settingsMatrixSelect(selectedDate, selectedQuantity));
  };

  handleMobileDate = (ev) => {
    this.handleMatrixSelection(ev.currentTarget.name);
  };

  renderTdPrice(prices, date) {
    if (typeof prices === 'undefined') {
      return (<td key={`price-${date}`}>---</td>);
    }

    return (
      <td key={`price-${date}`}>
        <label>
          <RadioButton />
          <div className="app__config__shipping-table__price">
            {`R$ ${prices.total.toFixed(2)}`}
            <span>{`R$ ${prices.unit.toFixed(2)} / un`}</span>
          </div>
        </label>
      </td>
    );
  }

  renderTdDate(quantity: number) {
    return (
      <td key={`quantity-${quantity}`}><span>{quantity}</span> un</td>
    );
  }

  renderTrDate(timestamp: number) {
    const date = moment(new Date(timestamp * 1000));
    return (
      <div>
        <div className="app__config__shipping-table__date-day">
          <span>{date.format('DD')}</span> {date.format('MMM')}
        </div>
        <div className="app__config__shipping-table__date-weekday">
          {date.format('dddd')}
        </div>
      </div>
    );
  }

  renderMobile() {
    const { matrix: { dates, rows, selection } } = this.props;

    return (
      <div className="app__config__shipping app__config__shipping--mobile">
        <ul className="app__config__shipping-datepicker">
          {
            Object.keys(dates).map((timestamp) => (
              <li key={timestamp}>
                <button
                  className={cx(selection.date === timestamp && 'selected')}
                  name={timestamp}
                  onClick={this.handleMobileDate}
                >
                  {this.renderTrDate(timestamp)}
                </button>
              </li>
            ))
          }
        </ul>
        <table className="app__config__shipping-table">
          <thead>
            <tr>
              <th className="app__config__shipping-table__quantity app__config__shipping-table--th app__config__shipping-table--th-gray">Quantidade</th>
              <th className="app__config__shipping-table--th app__config__shipping-table--th-gray">Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rows)
              .filter((quantity) => rows[quantity][selection.date] && !Array.isArray(rows[quantity][selection.date]))
              .map((quantity) => (
                <tr key={quantity}>
                  {this.renderTdDate(quantity)}
                  {this.renderTdPrice(rows[quantity][selection.date].prices, selection.date)}
                </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderDesktop() {
    const { matrix: { rows, dates } } = this.props;

    return (
      <div className="app__config__shipping app__config__shipping--desktop">
        <table className="app__config__shipping-table">
          <thead>
            <tr>
              <th className="app__config__shipping-table__logo" rowSpan={4}>
                Logo
              </th>
              <th
                className="app__config__shipping-table--th app__config__shipping-table--th-rounded app__config__shipping-table--th-yellow app__config__shipping-table--th app__config__shipping-table--th-round"
              >
                SuperExpres
              </th>
              <th colSpan={Object.keys(dates).length - 2} />
              <th
                className="app__config__shipping-table--th app__config__shipping-table--th-rounded app__config__shipping-table--th-green"
              >
                Frete <span>Grátis</span>
              </th>
            </tr>
            <tr>
              <th
                className="app__config__shipping-table--th app__config__shipping-table--th-gray"
                colSpan={Object.keys(dates).length}
              >
                PREVISÃO DE ENTREGA E VALORES
              </th>
            </tr>
            <tr>
              {Object.keys(dates).map((timestamp) => (
                <th className="app__config__shipping-table__date" rowSpan={3} key={timestamp}>{this.renderTrDate(timestamp)}</th>
              ))}
            </tr>
            <tr />
            <tr>
              <th className="app__config__shipping-table__quantity app__config__shipping-table--th app__config__shipping-table--th-rounded app__config__shipping-table--th-gray">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rows).map((quantity) => (
              <tr key={quantity}>
                {this.renderTdDate(quantity)}
                {Object.keys(dates).map((date) => (
                  this.renderTdPrice(rows[quantity][date].prices, date)
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
