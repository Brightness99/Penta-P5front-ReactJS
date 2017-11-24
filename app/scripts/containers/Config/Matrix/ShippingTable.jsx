// @flow

import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { RoundedTransparentButton } from 'atoms/Buttons';
import { PlusCircleIcon } from 'components/Icons';
import LoyaltyContainer from 'components/LoyaltyContainer';

import { RadioButton } from 'components/Input';
import Loading from 'components/Loading';

type Props = {
  locale: {},
  className: string,
  screenSize: string,
  matrix: {
    dates: {},
    rows: {},
    selection: {},
  },
  loyalty: {},
  dispatch: () => {},
  onSelect: () => {},
  isCustomEnabled: boolean,
};

export default class MatrixShippingTable extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleSelection = (ev) => {
    const { onSelect } = this.props;

    if (typeof onSelect === 'function') {
      onSelect(ev);
    }
  };

  renderTdPrice(prices, date, quantity) {
    const { matrix: { selection }, locale } = this.props;

    if (typeof prices === 'undefined') {
      return (<td key={`price-${date}`}>---</td>);
    }

    const isChecked = selection.date === date && selection.quantity === quantity;

    return (
      <td key={`price-${date}`} className={cx(isChecked && 'active')}>
        <label>
          <RadioButton
            name={date}
            value={quantity}
            checked={isChecked}
            onChange={this.handleSelection}
          />
          <div className="app__config__shipping-table__price">
            {`R$ ${prices.total.toFixed(2)}`}
            <span>{`R$ ${prices.unit.toFixed(2)} ${locale.COUNTRY_CODE === 'BR' ? '/ un' : 'each'}`}</span>
          </div>
        </label>
      </td>
    );
  }

  renderTdDate(quantity: number) {
    const { locale } = this.props;

    return (
      <td key={`quantity-${quantity}`}><span>{quantity}</span>{locale.COUNTRY_CODE === 'BR' && ' un'}</td>
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
    const { matrix: { dates, rows, selection }, isCustomEnabled, locale } = this.props;

    return (
      <div className="app__config__shipping--mobile">
        <ul className="app__config__shipping-datepicker" key="datepicker">
          {
            Object.keys(dates).map((timestamp) => (
              <li key={timestamp}>
                <button
                  className={cx(selection.date === timestamp && 'selected')}
                  name={timestamp}
                  onClick={() => {}}
                >
                  {this.renderTrDate(timestamp)}
                </button>
              </li>
            ))
          }
        </ul>
        <table className="app__config__shipping-table" key="shipping-table">
          <thead>
            <tr>
              <th className="app__config__shipping-table__quantity app__config__shipping-table--th app__config__shipping-table--th-gray">{locale.QUANTITY}</th>
              <th className="app__config__shipping-table--th app__config__shipping-table--th-gray">Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rows)
              .filter((quantity) => rows[quantity][selection.date] && !Array.isArray(rows[quantity][selection.date]))
              .map((quantity) => (
                <tr key={quantity}>
                  {this.renderTdDate(quantity)}
                  {this.renderTdPrice(rows[quantity][selection.date].prices, selection.date, quantity)}
                </tr>
                ))}
          </tbody>
        </table>
        {isCustomEnabled && <RoundedTransparentButton key="button">
          <PlusCircleIcon />
          <span>{locale.CUSTOM_QUANTITY}</span>
        </RoundedTransparentButton>}
      </div>
    );
  }

  renderDesktop() {
    const { matrix: { rows, dates }, isCustomEnabled, locale } = this.props;

    return (
      <div className="app__config__shipping--desktop">
        <table className="app__config__shipping-table">
          <thead>
            <tr>
              <th className="app__config__shipping-table__logo" rowSpan={4}>
                <img src={require('assets/media/svg-wannabe/icon-frete.png')} alt="Printi Delivery" />
              </th>
              <th
                className={cx(
                  locale.COUNTRY_CODE === 'BR' && [
                    'app__config__shipping-table--th',
                    'app__config__shipping-table--th-rounded',
                    'app__config__shipping-table--th-yellow',
                    'app__config__shipping-table--th-round',
                  ]
                )}
              >
                {locale.COUNTRY_CODE === 'BR' && 'SUPEREXPRESS'}
              </th>
              <th colSpan={Object.keys(dates).length - 2} />
              <th
                className="app__config__shipping-table--th app__config__shipping-table--th-rounded app__config__shipping-table--th-green"
              >
                {locale.SHIPPING} <span>{locale.FREE}</span>
              </th>
            </tr>
            <tr>
              <th
                className="app__config__shipping-table--th app__config__shipping-table--th-gray"
                colSpan={Object.keys(dates).length}
              >
                {locale.QTY_DATE_PRICE}
              </th>
            </tr>
            <tr>
              {Object.keys(dates).map((timestamp) => (
                <th className="app__config__shipping-table__date" rowSpan={3} key={timestamp}>{this.renderTrDate(timestamp)}</th>
              ))}
            </tr>
            <tr />
            <tr>
              <th className="app__config__shipping-table__quantity app__config__shipping-table--th app__config__shipping-table--th-rounded app__config__shipping-table--th-gray">{locale.QUANTITY}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rows).map((quantity) => (
              <tr key={quantity}>
                {this.renderTdDate(quantity)}
                {Object.keys(dates).map((date) => (
                  this.renderTdPrice(rows[quantity][date].prices, date, quantity)
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isCustomEnabled && <RoundedTransparentButton key="button">
          <PlusCircleIcon />
          <span>{locale.CUSTOM_QUANTITY}</span>
        </RoundedTransparentButton>}
      </div>
    );
  }

  renderPage() {
    const { screenSize, matrix: { isRunning, isLoaded } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div className={cx('app__config__shipping', isMobile(screenSize) ? 'app__config__shipping--mobile' : 'app__config__shipping--desktop')}>
        <LoyaltyContainer component="matrix" />
        {this.renderPage()}
      </div>
    );
  }
}
