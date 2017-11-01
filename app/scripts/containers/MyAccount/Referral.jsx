// @flow

import React from 'react';
import cx from 'classnames';
import { isMobile } from 'utils/helpers';
import TooltipEnhancer from 'components/TooltipEnhancer/index';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { CheckIcon } from 'components/Icons';
import Modal from 'components/Modal';
import ShareCode from 'components/ShareCodeModal';
import { copyElementContentToClipboard } from 'utils/copy-util';

type Props = {
  screenSize: string,
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
  showCopiedTooltip: boolean,
  showShareModal: boolean,
};

export class Referral extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showCopiedTooltip: false,
      showShareModal: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };
  static props: Props;
  static state: State;

  handleShowingTooltip = () => {
    this.setState({ showCopiedTooltip: !this.state.showCopiedTooltip });
  };

  handleShowingModal = () => {
    this.setState({ showShareModal: !this.state.showShareModal });
  };

  handleCopyLink = () => {
    const isSuccessful = copyElementContentToClipboard('voucher_code');
    const { voucher_id, voucher_name } = this.props.voucher;
    const promoCodeLink = voucher_name || voucher_id;
    if (isSuccessful && Boolean(promoCodeLink)) {
      this.handleShowingTooltip();
    }
  };

  renderList() {
    return (
      <div className="mol-list-mobile">
        <div className="atm-content-list">
          <p className="qrk-title-list">Email</p>
          <p className="qrk-text-list">adriano_rod_oliveira@gmail.com</p>
          <p className="qrk-title-list">Atualizado</p>
          <p className="qrk-text-list">15/05/2017</p>
          <p className="qrk-title-list">Créditos</p>
          <p className="qrk-text-list">R$5,00</p>
        </div>
        <div className="atm-content-list">
          <p className="qrk-title-list">Email</p>
          <p className="qrk-text-list">adriano_rod_oliveira@gmail.com</p>
          <p className="qrk-title-list">Atualizado</p>
          <p className="qrk-text-list">15/05/2017</p>
          <p className="qrk-title-list">Créditos</p>
          <p className="qrk-text-list">R$5,00</p>
        </div>
      </div>
    );
  }

  render() {
    const { showCopiedTooltip, showShareModal } = this.state;
    const { screenSize, voucher, facebook, customerInfo, language } = this.props;
    const { voucher_id, voucher_name } = voucher;
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
        title: 'Indicações',
      },
    ];
    const EnhancedCopyButton = TooltipEnhancer(showCopiedTooltip)(() =>
      <button type="button" className="atm-link-copy" onClick={this.handleCopyLink}>
        {'copiar'}
      </button>
    );
    return (
      <div className="tpl-referral">
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className={cx(isMobile(screenSize) && 'container')}>
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
          <h2 className="title-myaccount">Minha conta</h2>
          <div className="org-referral-share">
            <div className="mol-referral-text">
              <h4 className="qrk-title-text">Indicações</h4>
              <p className="qrk-text">Indique a Printi para seus amigos, a cada um que comprar, você e ele ganham
                créditos para trocar por nossos produtos</p>
            </div>
            <div className="mol-content-share">
              <p className="qrk-text-share">Compartilhe seu código promocional:</p>
              <section className="mol-share">
                <section className="atm-input-link">
                  <Input
                    id={'voucher_code'}
                    name={'voucher_code'}
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
                <button className="btn-default btn-secondary fnt-sbold btn-sm" onClick={this.handleShowingModal}>
                  {'Compartilhar'}
                </button>
              </section>
            </div>
          </div>
          <div className="org-table-referral">
            <p className="qrk-text">Até o momento você ganhou:</p>
            <p className="qrk-value">R$45,00</p>
            {isMobile(screenSize) && (this.renderList())}
            {!isMobile(screenSize) && (
              <div className="mol-content-table">
                <ul className="atm-head-table">
                  <li>Email</li>
                  <li>Atualizado</li>
                  <li>Créditos</li>
                </ul>
                <div className="atm-content">
                  <div className="qrk-content-item">
                    <p>adriano_rod_oliveira@gmail.com</p>
                  </div>
                  <div className="qrk-content-item">
                    <p>15/05/2017</p>
                  </div>
                  <div className="qrk-content-item color-credit">
                    <p>R$5,00</p>
                    <CheckIcon />
                  </div>
                  <div className="qrk-content-item">
                    <p>adriano_rod_oliveira@gmail.com</p>
                  </div>
                  <div className="qrk-content-item">
                    <p>15/05/2017</p>
                  </div>
                  <div className="qrk-content-item color-credit">
                    <p>R$5,00</p>
                    <CheckIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Referral;
