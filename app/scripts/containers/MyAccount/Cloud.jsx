// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { isMobile } from 'utils/helpers';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from 'react-dates/constants';
import moment from 'moment';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FileIcon } from 'components/Icons';
import config from 'config';

type Props = {
  screenSize: string,
  autoFocus: boolean,
  autoFocusEndDate: boolean,
  initialStartDate: momentObj,
  initialEndDate: momentObj,
  withPortal: boolean,
};

export class Cloud extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;
  state: State;

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { screenSize } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Cloud',
      },
    ];
    const csvLink = (startDate && endDate) ? config.apiUrl + '/v2/cloud/order-list?date_end=' + endDate.format('YYYY-MM-DD') + '&date_start=' + startDate.format('YYYY-MM-DD') : "#";

    return (
      <div className="container-cloud">
        <div className={cx(isMobile(screenSize) && ('container'))}>
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <h2>Minha conta</h2>
          <h3 className="subtitle-cloud">Cloud</h3>
          <div className="box-cloudDate">
            <DateRangePicker
              onDatesChange={this.onDatesChange}
              onFocusChange={this.onFocusChange}
              focusedInput={focusedInput}
              startDate={startDate}
              endDate={endDate}
              orientation={isMobile(screenSize) ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
              withFullScreenPortal={isMobile(screenSize)}
              startDatePlaceholderText="Data Inicial"
              endDatePlaceholderText="Data Final"
            />
          </div>
          <div className="btn-downloadCloud">
            <a href={csvLink} className="btn-default btn-primary fnt-sbold btn-sm"><i><FileIcon /></i>Download</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Cloud;
