// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from 'react-dates/constants';
import { FileIcon } from 'components/Icons';
import config from 'config';

type Props = {
  screenSize: string,
  autoFocus: boolean,
  autoFocusEndDate: boolean,
  initialStartDate: {},
  initialEndDate: {},
  withPortal: boolean,
  locale: {},
  setBreadcrumbs: () => {},
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
  }

  componentDidMount() {
    this.handleBreadcrumbs();
  }

  static props: Props;
  static state: State;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs, locale } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: locale.TITLE,
        },
      ]);
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  render() {
    const { screenSize, locale } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const csvLink = (startDate && endDate) && `${config.apiUrl}/v2/cloud/order-list?date_end=${endDate.format('YYYY-MM-DD')}&date_start=${startDate.format('YYYY-MM-DD')}`;

    return (
      <div className="container-cloud">
        <h3 className="atm-myorder-title">{locale.TITLE}</h3>
        <div className="box-cloudDate">
          <DateRangePicker
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            orientation={isMobile(screenSize) ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
            withFullScreenPortal={isMobile(screenSize)}
            startDatePlaceholderText={locale.cloud_orders.STARTS_AT}
            endDatePlaceholderText={locale.cloud_orders.FINISHES_AT}
          />
        </div>
        <div className="btn-downloadCloud">
          <a href={csvLink} className="btn-default btn-primary fnt-sbold btn-sm"><i><FileIcon /></i>{locale.cloud_orders.DOWNLOAD_LINK}</a>
        </div>
        <Helmet>
          <title>{'Minha Conta - Cloud | Printi'}</title>
          <meta name="description" content={'Minha Conta - Cloud - Printi'} />
        </Helmet>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.account.cloud,
  };
}

export default connect(mapStateToProps)(Cloud);
