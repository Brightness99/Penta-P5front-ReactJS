// @flow

import React from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import { isMobile } from 'utils/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/Icons';
import TooltipEnhancer from 'components/TooltipEnhancer/index';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import ShareCode from 'components/ShareCodeModal';
import { IntlMoney, IntlDate } from 'components/Intl';
import { copyElementContentToClipboard } from 'utils/copy-util';

type Props = {
  screenSize: string,
  voucher: {
    voucher_id: string,
    voucher_name: string,
  },
  sendReferralRequest: (customerId: string, emails: Array<string>) => void,
  getReferralHistory: ({ order: string, page: number, per_page: number, sort: string }) => void,
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
  domain: string,
};

type HistoryType = {
  page: number,
  per_page: number,
  order: ReferralHistoryOrder,
  sort: ReferralHistorySort,
};

type State = {
  showCopiedTooltip: boolean,
  showShareModal: boolean,
  history: HistoryType,
};

export class Referral extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCopiedTooltip: false,
      showShareModal: false,
      history: {
        page: 1,
        per_page: 10,
        order: 'desc',
        sort: 'created_at',
      },
    };
  }


  static defaultProps = {
    screenSize: 'xs',
  };

  componentDidMount() {
    this.getHistory(this.state.history);
  }

  getHistory = (history: HistoryType) => {
    const { getReferralHistory } = this.props;
    getReferralHistory(history);
  };

  static props: Props;
  static state: State;

  handleShowingTooltip = () => {
    this.setState({ showCopiedTooltip: !this.state.showCopiedTooltip });
  };

  handleShowingModal = () => {
    this.setState({
      showShareModal: !this.state.showShareModal,
      showCopiedTooltip: false,
    });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.handleShowingModal();
  };

  handleChangeHistoryTable = (name: ReferralHistoryFieldName, value: ReferralHistoryFieldValue) => {
    const newHistory = Object.assign({}, this.state.history);
    newHistory[name] = value;
    this.getHistory(newHistory);
    this.setState({ history: newHistory });
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
    const { referral } = this.props;
    const sliderSettings = {
      arrows: false,
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const data = referral.data[this.state.history.page] || [];

    return (
      <section className="mol-list-mobile">
        {
          data.length > 0 &&
          <Slider {...sliderSettings}>
            {
              data.map(history =>
                <section
                  key={`${history.voucher_used_by_email_id}-${history.voucher_id}`}
                  className="atm-content-list"
                >
                  <span className="qrk-title-list">{'Data'}</span>
                  <IntlDate className="qrk-text-list">{history.voucher_used_on_date}</IntlDate>
                  <span className="qrk-title-list">{'E-mail'}</span>
                  <span className="qrk-text-list">{history.voucher_used_by_email_id}</span>
                  <span className="qrk-title-list">{'Voucher value'}</span>
                  <span className="qrk-text-list">{history.voucher_name}</span>
                  <span className="qrk-title-list">{'Valor'}</span>
                  <IntlMoney className="qrk-text-list voucher-value">{+history.voucher_amount}</IntlMoney>
                  <span className="qrk-title-list">{'Data de validade'}</span>
                  <IntlDate className="qrk-text-list">{history.voucher_expiry_date}</IntlDate>
                </section>
              )
            }
          </Slider>
        }
        {data.length > 0 && this.renderPagination()}
      </section>
    );
  }

  renderPagination = () => {
    const { referral } = this.props;
    const totalCount = +referral.total_count || 0;
    const { page, per_page: perPage } = this.state.history;

    return (
      totalCount !== 0 &&
      <nav className="referral-pagination">
        <button
          onClick={() => page > 1 && this.handleChangeHistoryTable('page', page - 1)}
        >
          <ChevronLeftIcon />
        </button>
        {[...new Array(Math.ceil(totalCount / perPage)).keys()].map(i =>
          <li
            key={`${i + 1}-page`}
          >
            <button
              className={cx('referral-pagination__page-number', page === (i + 1) && 'active')}
              onClick={() => this.handleChangeHistoryTable('page', i + 1)}
            >
              {i + 1}
            </button>
          </li>
        )}
        <button
          onClick={() => page < Math.ceil(totalCount / perPage) && this.handleChangeHistoryTable('page', page + 1)}
        >
          <ChevronRightIcon />
        </button>
      </nav>
    );
  };

  render() {
    const { showCopiedTooltip, showShareModal, history } = this.state;
    const {
      screenSize, voucher, facebook,
      customerInfo, language, referral, domain,
    } = this.props;
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

    const isMobileScreen = isMobile(screenSize);
    const { page } = history;
    const data = referral.data[page] || [];

    return (
      <section className="tpl-referral">
        {!isMobileScreen && <Breadcrumbs links={breadcrumb} />}
        <section className={cx(isMobileScreen && 'container')}>
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
                  domain={domain}
                />
              </Modal>
            </section>
          }
          <h2 className="title-myaccount">{'Minha conta'}</h2>
          <section className="org-referral-share">
            <article className="mol-referral-text">
              <h4 className="qrk-title-text">{'Indicações'}</h4>
              <p className="qrk-text">
                {`Indique a Printi para seus amigos, a cada um que comprar, você e ele ganham
                créditos para trocar por nossos produtos`}
              </p>
            </article>
            <section className="mol-content-share">
              <p className="qrk-text-share">{'Compartilhe seu código promocional:'}</p>
              <form
                className="mol-share"
                onSubmit={this.handleSubmit}
                onBlur={this.handleShowingTooltip}
              >
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
                <button
                  type="submit"
                  className="btn-default btn-secondary fnt-sbold btn-sm"
                >
                  {'Compartilhar'}
                </button>
              </form>
            </section>
          </section>
          <section className="org-table-referral">
            <p className="qrk-text">{'Descontos que você ganhou:'}</p>
            <IntlMoney className="qrk-value">
              {+referral.total_voucher_amount || 0}
            </IntlMoney>
            {isMobileScreen && (this.renderList())}
            {!isMobileScreen && (
              <section className="mol-content-table">
                <ul className="atm-head-table">
                  <li>{'Data'}</li>
                  <li>{'E-mail'}</li>
                  <li>{'Voucher value'}</li>
                  <li>{'Valor'}</li>
                  <li>{'Data de validade'}</li>
                </ul>
                <section className="atm-content">
                  {data.length > 0 || !referral.isRunning
                    ? data.map(voucherData =>
                      <section
                        key={`${voucherData.voucher_id}-${voucherData.voucher_used_by_email_id}`}
                        className="voucher-history__row-content"
                      >
                        <section className="qrk-content-item">
                          <IntlDate>{voucherData.voucher_used_on_date}</IntlDate>
                        </section>
                        <section className="qrk-content-item">
                          <p>{voucherData.voucher_used_by_email_id}</p>
                        </section>
                        <section className="qrk-content-item">
                          <p>{voucherData.voucher_name}</p>
                        </section>
                        <section className="qrk-content-item color-credit">
                          <IntlMoney>{+voucherData.voucher_amount}</IntlMoney>
                        </section>
                        <section className="qrk-content-item">
                          <IntlDate>{voucherData.voucher_expiry_date}</IntlDate>
                        </section>
                      </section>
                    ) : <Loading />
                  }
                </section>
              </section>
            )}
            {!isMobileScreen && this.renderPagination()}
          </section>
        </section>
      </section>
    );
  }
}

export default Referral;
