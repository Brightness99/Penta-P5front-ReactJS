// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ReferralActions from 'actions/referral';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import { copyElementContentToClipboard } from 'utils/copy-util';
import { socialLoginSettingsFetch } from 'actions';

import ShareCode from 'components/ShareCodeModal';
import Breadcrumbs from 'components/Breadcrumbs';
import Modal from 'components/Modal';
import TooltipEnhancer from 'components/TooltipEnhancer';
import Loading from 'components/Loading/index';
import { Input } from 'quarks/Inputs';


type Props = {
  app: AppStore,
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
  showShareModal: boolean,
  showCopiedTooltip: boolean,
};

export class Referral extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showShareModal: false,
      showCopiedTooltip: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.props.socialLoginSettingsFetch();
  }

  static props: Props;
  static state: State;

  handleShowingModal = () => {
    this.setState({
      showShareModal: !this.state.showShareModal,
      showCopiedTooltip: false,
    });
  };

  handleShowingTooltip = () => {
    this.setState({ showCopiedTooltip: !this.state.showCopiedTooltip });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.handleShowingModal();
  };

  handleCopy = () => {
    const isSuccessful = copyElementContentToClipboard('promo_code');
    const { customerInfo: { voucher_id, voucher_name } = {} } = this.props;
    if (isSuccessful && Boolean(voucher_name || voucher_id)) {
      this.handleShowingTooltip();
    }
  };

  render() {
    const {
      app: { screenSize }, customerInfo = {},
      referral, facebook, language,
    } = this.props;
    const { showShareModal, showCopiedTooltip } = this.state;
    const { voucher_id, voucher_name } = customerInfo;
    const isLoggedIn = customerInfo.id;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Indique a Printi',
      },
    ];
    const { isRunning } = referral;

    if (isRunning || customerInfo.isRunning) {
      return <Loading />;
    }

    const EnhancedCopyButton = TooltipEnhancer(showCopiedTooltip)(() =>
      <button type="button" className="atm-link-copy" onClick={this.handleCopy}>
        {'copiar'}
      </button>
    );

    return (
      <section>
        {
          showShareModal &&
          <section className="modal-referral">
            <Modal handleCloseModal={this.handleShowingModal}>
              <ShareCode
                customerId={customerInfo.id}
                sendReferralRequest={this.props.sendReferralRequest}
                handleCloseModal={this.handleShowingModal}
                voucher={{ voucher_id, voucher_name }}
                facebook={facebook}
                language={language}
                screenSize={screenSize}
              />
            </Modal>
          </section>
        }
        <section className="bg-referral">
          <section className="org-referral-page">
            <section className="container">
              {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
              <h2 className="title-referral">{'Indique a Printi'}</h2>

              <section className="mol-texts-referral">
                <h3 className="qrk-title">{'Quem indica ganha. E quem é indicado também!'}</h3>
                <p className="qrk-text">
                  {`Isso mesmo: indique a Printi para seus amigos,
                  e a cada primeira compra feita por eles utilizando seu código promocional,
                  você receberá um voucher de desconto!`}
                </p>
              </section>

              <section className="mol-content-share">
                <p className="qrk-text-share">
                  {
                    isLoggedIn ?
                      'Compartilhe seu código promocional:'
                      : 'Faça o login ou se cadastre para compartilhar seu código promocional com seus amigos!'
                  }
                </p>
                {
                  isLoggedIn ?
                    <form
                      className="mol-share"
                      onSubmit={this.handleSubmit}
                      onBlur={this.handleShowingTooltip}
                    >
                      <section className="atm-input-link">
                        <Input
                          id="promo_code"
                          name="promo_code"
                          defaultValue={voucher_name || voucher_id}
                          value={voucher_name || voucher_id}
                          className="atm-input"
                          readOnly={true}
                        />
                        <EnhancedCopyButton
                          keyProp={'promo-code-copy-tooltip'}
                          text={'Voucher copiado'}
                        />
                      </section>
                      <button
                        className="btn-default btn-secondary fnt-sbold btn-sm"
                      >
                        {'Compartilhar'}
                      </button>
                    </form> :
                    <Link to={'/login-cadastro'} className="btn-default btn-secondary fnt-sbold btn-sm">
                      {'Entrar/Cadastrar'}
                    </Link>
                }
              </section>
            </section>
            <section className="mol-infos-referral">
              <section className="container">
                <section className="atm-infos">
                  <p>{'Em caso de dúvida, visite a nossa '}<Link to="/central-de-ajuda">{'Central de ajuda'}</Link></p>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

const mapStoreToProps = (state) => {
  const { LANGUAGE: language, COUNTRY_CODE: countryCode } = state.locale;
  const { socials } = state.socialLoginSettings;
  const { voucher_id, voucher_name } = state.account;
  return ({
    app: state.app,
    customerInfo: {
      ...state.user.customerInfo,
      voucher_id,
      voucher_name,
    },
    referral: state.referral,
    facebook: socials.facebook[countryCode],
    language,
  });
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ReferralActions, dispatch),
  socialLoginSettingsFetch: () => dispatch(socialLoginSettingsFetch()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Referral);
