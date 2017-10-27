// @flow
import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { RadioButton } from 'components/Input';
import Loading from 'components/Loading';
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
      sms_enabled: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountNotificationFetch());
  }

  componentWillReceiveProps(nextProps) {
    const { account: { notification } } = this.props;
    const { account } = nextProps;
    if (notification !== account.notifiation) {
      if (!account.notification.isUpdating && account.notification.isUpdated) {
        if (account.notification.error) {
          swal({
            title: account.notification.error.message,
            type: 'error',
            confirmButtonColor: '#2cac57',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        } else {
          swal({
            title: 'Successfully saved.',
            type: 'success',
            confirmButtonColor: '#2cac57',
            confirmButtonText: 'OK',
            showCancelButton: false,
          });
        }
      }
      this.setState({
        sms_enabled: account.notification.sms_enabled,
      });
    }
  }

  static props: Props;

  handleChange = (ev) => {
    this.setState({
      [ev.currentTarget.name]: ev.currentTarget.value,
    });
  };

  handleSave = () => {
    const { dispatch } = this.props;

    dispatch(accountNotificationUpdate(this.state));
  };

  renderForm() {
    const { sms_enabled } = this.state;

    return (
      <div>
        <p className="legend-myorder">Deseja receber notificações por SMS?</p>
        <div>
          <div className="notification-option">
            <label>
              <RadioButton
                name="sms_enabled"
                value="1"
                checked={sms_enabled === '1'}
                onChange={this.handleChange}
              />
              Sim
            </label>
          </div>

          <div className="notification-option">
            <label>
              <RadioButton
                name="sms_enabled"
                value="0"
                checked={sms_enabled === '0'}
                onChange={this.handleChange}
              />
              Não
            </label>
          </div>

          <div className="mol-checkout-pane-footer">
            <button onClick={this.handleSave} className="atm-send-button">Salvar</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize, account: { notification } } = this.props;

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
        title: 'Notificações',
      },
    ];

    return (
      <div className="container-myData">
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <h2>Minha conta</h2>
        <h3 className="title-myData">Notificações</h3>
        {!notification.isLoaded || notification.isRunning ? <Loading /> : this.renderForm()}
      </div>
    );
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

