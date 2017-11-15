// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import Breadcrumbs from 'components/Breadcrumbs';
import * as ReferralActions from 'actions/referral';
import { socialLoginSettingsFetch } from 'actions';
import Sidebar from './Sidebar';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import ArtProposal from '../ArtProposal';
import MyAddresses from './MyAddresses';
import CardsAccount from './CardsAccount';
import TemplateModels from './TemplateModels';
import Notification from './Notification';
import Cloud from './Cloud';
import Loyalty from './Loyalty';
import CustomerData from './CustomerData';
import Referral from './Referral';
import Briefing from './Briefing';

type Props = {
  screenSize: AppStoreType.screenSize,
  router: RouterStore,
  locale: AccountLocaleType,
  voucher: {
    voucher_id: string,
    voucher_name: string,
  },
  sendReferralRequest: (customerId: string, emails: Array<string>) => void,
  customerInfo: UserCustomerInfoType,
  referral: ReferralType,
  socialLoginSettingsFetch: () => void,
  facebook: {
    status: string,
    credentials: {
      app_id: number | string,
      secret_key: string,
    },
  },
  language: string,
};

type State = {
  breadcrumbs: {},
};

export class MyAccount extends React.Component {
  constructor(props: Props) {
    super(props);

    this.defaultBreadcrumbs = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: props.locale.TITLE,
        url: '/minha-conta',
      },
    ];

    this.state = {
      breadcrumbs: this.defaultBreadcrumbs,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    if (!this.props.facebook) {
      this.props.socialLoginSettingsFetch();
    }
  }

  static props: Props;
  static state: State;
  static defaultBreadcrumbs: [];

  handleBreadcrumbs = (breadcrumbs) => {
    this.setState({
      breadcrumbs: this.defaultBreadcrumbs.concat(breadcrumbs),
    });
  };

  renderContainer() {
    const {
      screenSize, voucher, customerInfo = {},
      referral, facebook, language,
    } = this.props;

    return (
      <Switch>
        <Route
          path="/minha-conta/pedidos"
          render={() => (
            <Switch>
              <Route
                path="/minha-conta/pedidos/:orderNumber"
                render={() => (
                  <Switch>
                    <Route
                      path="/minha-conta/pedidos/:orderNumber/proposta-de-arte"
                      render={(props) => <ArtProposal {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
                    />
                    <Route
                      render={(props) => <OrderDetails {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
                    />
                  </Switch>
                )}
              />
              <Route
                path="/minha-conta/pedidos/:orderNumber/proposta-de-arte"
                render={(props) => <ArtProposal {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
              />
              <Route
                render={(props) => <OrderList {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
              />
            </Switch>
          )}
        />
        <Route
          path="/minha-conta/enderecos"
          render={(props) => <MyAddresses {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/cartoes-salvos"
          render={(props) => <CardsAccount {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/meus-dados"
          render={(props) => <CustomerData {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/modelos-salvos"
          render={(props) => <TemplateModels {...props} screenSize={screenSize} />}
        />
        <Route
          path="/minha-conta/notificacoes"
          render={(props) => <Notification {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/cloud"
          render={(props) => <Cloud {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/programa-de-fidelidade"
          render={(props) => <Loyalty {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
        <Route
          path="/minha-conta/indicacoes"
          render={(props) =>
            <Referral
              {...props}
              referral={referral}
              screenSize={screenSize}
              voucher={voucher}
              customerInfo={customerInfo}
              sendReferralRequest={this.props.sendReferralRequest}
              facebook={facebook}
              language={language}
            />}
        />
        <Route
          render={(props) => <OrderList {...props} setBreadcrumbs={this.handleBreadcrumbs} />}
        />
      </Switch>
    );
  }

  render() {
    const { screenSize, locale, router: { location: { pathname } } } = this.props;
    const { breadcrumbs } = this.state;
    const pathStrings = pathname.split('/');
    const isProposalArtPage = (pathStrings[pathStrings.length - 1] === 'proposta-de-arte');
    const breadcrumbsMark = (isProposalArtPage) ?
      (
        <div className="container">
          <Breadcrumbs links={breadcrumbs} />
        </div>
      ) :
      (
        <Breadcrumbs links={breadcrumbs} />
      );
    return (
      <Switch>
        <Route
          exact={true}
          path="/minha-conta/pedidos/:orderNumber/:itemId/briefing"
          render={(props) => <Briefing {...props} />}
        />
        <Route
          path="/minha-conta"
          render={() => (
            <div
              className={cx(
                'container-myaccount',
                isProposalArtPage && 'container-art-proposal',
                isMobile(screenSize) && 'container',
              )}
            >
              {!isMobile(screenSize) && !isProposalArtPage && <Sidebar screenSize={screenSize} />}
              <div className="container-myaccount-content">
                {breadcrumbsMark}
                {!isProposalArtPage && <PageTitle>{locale.TITLE}</PageTitle>}
                {this.renderContainer()}
              </div>
            </div>
          )}
        />
      </Switch>
    );
  }
}

const mapStoreToProps = (state) => {
  const { LANGUAGE: language, COUNTRY_CODE: countryCode } = state.locale;
  const { socials } = state.socialLoginSettings;
  const { voucher_id, voucher_name } = state.account;
  return ({
    screenSize: state.app.screenSize,
    locale: state.locale.translate.account,
    router: state.router,
    referral: state.referral,
    voucher: {
      voucher_id,
      voucher_name,
    },
    customerInfo: {
      ...state.user.customerInfo,
      voucher_id,
      voucher_name,
    },
    language,
    facebook: socials.facebook[countryCode],
  });
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(ReferralActions, dispatch),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(MyAccount);
