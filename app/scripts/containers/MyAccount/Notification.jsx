// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { Select } from 'atoms/Inputs';
import { ErrorText } from 'atoms/Texts';
import { RadioButton } from 'components/Input';
import { accountNotificationUpdate, accountNotificationFetch } from 'actions';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class Notification extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };
  
  static props: Props;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountNotificationFetch());
  }

  handleChange = (selected) => {

    this.setState({
      value: selected,
    });
  }

  handleSave = () => {

    const { dispatch } = this.props;
    const { value } = this.state;

    dispatch(accountNotificationUpdate({
      sms_enabled: value
    }));
  }

  renderForm() {

    const { account } = this.props;
    let value = '';

    if (account.notification.isLoaded && !account.notification.isRunning) {
      value = account.notification.sms_enabled;
    }

    if (value !== '') {
      return (
        <div>
          <div className="notification-option">
            <label>
              <RadioButton
                name='sms-notification'
                value='yes'
                checked={value === '1'}
                onChange={() => { this.handleChange('1'); }}
              />
              Yes
            </label>
          </div>

          <div className="notification-option">
            <label>
              <RadioButton
                name='sms-notification'
                value='no'
                checked={value === '0'}
                onChange={() => { this.handleChange('0'); }}
              />
              No
            </label>
          </div>

          <div className="mol-checkout-pane-footer">
            <button onClick={this.handleSave} className="atm-send-button">Save</button>
          </div>
        </div>
      );
    }

    return null;
  }

  renderMobile() {

    const { account } = this.props;

    const form = this.renderForm();

    return (
      <div className="container-myData">
        <h2>Minha conta</h2>
        <h3 className="title-myData">Notificação</h3>
        <p className="legend-myorder">Do you wish to receive SMS notifications?</p>
        {form}
      </div>
    );
  }

  renderDesktop() {

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
        title: 'Notificação',
      },
    ];

    const form = this.renderForm();

    return (
      <div className="container-myData">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="title-myData">Notificação</h3>
        <p className="legend-myorder">Do you wish to receive SMS notifications?</p>

        {form}

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

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

