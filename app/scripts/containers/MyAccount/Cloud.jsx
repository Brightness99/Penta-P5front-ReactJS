// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { DateRangePicker, DateRangePickerPhrases } from 'react-dates';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, ANCHOR_LEFT, ANCHOR_RIGHT, DAY_SIZE, ICON_BEFORE_POSITION } from 'react-dates/constants';
import moment from 'moment';
import cx from 'classnames';
import { Button } from 'quarks/Inputs';
import { Link } from 'react-router-dom';
import { FileIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  autoFocus: boolean,
  autoFocusEndDate: boolean,
  initialStartDate: momentObj,
  initialEndDate: momentObj,
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

  renderMobile() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div className="container-cloud">
        <div className="container">
          <h2>Minha conta</h2>
          <h3 className="subtitle-cloud">Cloud</h3>
          <div className="box-cloudDate">
            <DateRangePicker
              onDatesChange={this.onDatesChange}
              onFocusChange={this.onFocusChange}
              focusedInput={focusedInput}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="btn-downloadCloud">
            <Link to="#" className="btn-default btn-primary fnt-sbold btn-sm"><i><FileIcon /></i>Download</Link>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
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
    // <label className="label-dateInitialFinal">Data Inicial</label>
    // <label className="label-dateInitialFinal">Data final</label>
    return (
      <div className="container-cloud">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-cloud">Cloud</h3>
        <div className="box-cloudDate">
          <DateRangePicker
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="btn-downloadCloud">
          <Link to="#" className="btn-default btn-primary fnt-sbold btn-sm"><i><FileIcon /></i>Download</Link>
        </div>
      </div>
    );
  }
  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default Cloud;
