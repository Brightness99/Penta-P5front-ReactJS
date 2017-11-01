// @flow
import React from 'react';
import cx from 'classnames';
import FacebookProvider, { Share } from 'react-facebook';
import { Input } from 'quarks/Inputs';

import { LinkIcon, MailIcon, FacebookIcon } from 'components/Icons';
import TooltipEnhancer from 'components/TooltipEnhancer/index';
import { copyElementContentToClipboard } from 'utils/copy-util';
import { isMobile } from 'utils/helpers';

type Props = {
  sendReferralRequest: (customerId: string, emails: Array<string>) => void,
  customerId: string,
  handleCloseModal: () => void,
  promoCodeLink: string,
  socialLoginSettingsFetch: () => void,
  facebook: {
    status: string,
    credentials: {
      app_id: number | string,
      secret_key: string,
    },
  },
  language: string,
  voucher: {
    voucher_id: string,
    voucher_name: string,
  },
  screenSize: string,
};

type State = {
  form: {
    [key: string]: {
      emails: { valid: boolean, value: string },
      message?: { valid: boolean, value: string },
    },
  },
  canSubmit: boolean,
  showCopiedTooltip: boolean,
  activeSection: 'email' | 'link' | 'facebook',
};

const message = (voucher: string) =>
  `Hey all, check my discount voucher from printi, with that you can get discount on your order: ${voucher}`;

// TODO: check facebook share
export default class ShareCode extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    const { voucher_id, voucher_name } = props.voucher;
    const voucher = voucher_name || voucher_id;

    const voucherValue = props.promoCodeLink || voucher || '';
    const voucherValid = Boolean(voucherValue);

    this.state = {
      form: {
        email: {
          emails: { valid: false, value: '' },
          message: {
            valid: true,
            value: message(voucher),
          },
        },
        link: {
          promo_code_link: { valid: voucherValid, value: voucherValue },
        },
      },
      canSubmit: {
        email: false,
        link: voucherValid,
      },
      showCopiedTooltip: false,
      activeSection: 'email',
    };
  }

  static props: Props;
  static state: State;

  handleChange = (e: KeyboardEvent | TouchEvent) => {
    const { value, id } = e.currentTarget;
    const { activeSection } = this.state;
    const form = Object.assign({}, this.state.form[activeSection]);
    form[id] = { value: value.trim(), valid: Boolean(value.trim()) };
    let canSubmit = true;
    Object.keys(form)
    .forEach((index) => {
      if (form[index].valid !== true) {
        canSubmit = false;
      }
    });
    this.setState({
      form: Object.assign({}, this.state.form, { [activeSection]: form }),
      canSubmit: Object.assign({}, this.state.canSubmit, { [activeSection]: canSubmit }),
    });
  };

  handleShowingTooltip = () => {
    this.setState({ showCopiedTooltip: !this.state.showCopiedTooltip });
  };

  handleChangeShareSection = (activeSection: string) => {
    this.setState({ activeSection });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const { canSubmit, form, activeSection } = this.state;
    const { sendReferralRequest, customerId, handleCloseModal } = this.props;

    if (canSubmit[activeSection]) {
      const activeForm = form[activeSection];
      const formData = Object.keys(activeForm)
      .reduce((previousInput, nextInput) => ({
        ...previousInput,
        [nextInput]: nextInput === 'emails' ? activeForm[nextInput].value.split(/\s*,\s*/) : activeForm[nextInput].value,
      }), {});
      sendReferralRequest(customerId, formData);
      handleCloseModal();
    }
  };

  handleCopyLink = () => {
    const isSuccessful = copyElementContentToClipboard('promo_code_link');
    const { form, activeSection } = this.state;
    const { value: promoCodeLink } = form[activeSection].promo_code_link;
    if (isSuccessful && Boolean(promoCodeLink)) {
      this.handleShowingTooltip();
    }
  };

  renderShareSection = () => {
    const { activeSection, form, canSubmit, showCopiedTooltip } = this.state;
    const activeForm = form[activeSection];
    switch (activeSection) {
      case 'email':
        return (
          <section className="mol-share-form">
            <p className="atm-text-emails">{'Se preferir, digite os emails:'}</p>
            <form className="mol-share" onSubmit={this.handleSubmit}>
              <section className="atm-input-link">
                <Input
                  id="emails"
                  name="emails"
                  defaultValue={activeForm.emails.value}
                  value={activeForm.emails.value}
                  onChange={this.handleChange}
                  placeholder={'Endereço de email...'}
                  className="atm-input"
                />
              </section>
              <button
                type="submit"
                className="btn-default btn-secondary fnt-sbold btn-sm"
                disabled={!canSubmit}
              >
                {'Enviar'}
              </button>
            </form>
            <p className="atm-legend-emails">
              {'Use vírgula para separar os emails. Por exemplo: email-1@printi.com.br, email-2@printi.com.br'}
            </p>
          </section>
        );
      case 'link': {
        const EnhancedCopyButton = TooltipEnhancer(showCopiedTooltip)(() =>
          <button
            type="button"
            className="atm-link-copy"
            onClick={this.handleCopyLink}
          >
            {'copiar'}
          </button>
        );
        return (
          <form
            className="mol-share mol-share-form mol-share-link"
            onSubmit={this.handleSubmit}
            onBlur={this.handleShowingTooltip}
          >
            <section className="atm-input-link">
              <Input
                id="promo_code_link"
                name="promo_code_link"
                defaultValue={activeForm.promo_code_link.value}
                value={activeForm.promo_code_link.value}
                onChange={this.handleChange}
                className="atm-input"
                readOnly={true}
              />
              <EnhancedCopyButton
                keyProp={'promo-code-link-copy-tooltip'}
                text={'Voucher copiado'}
              />
            </section>
          </form>
        );
      }
      default:
        return null;
    }
  };

  render() {
    const { activeSection } = this.state;
    const { facebook, language, screenSize, voucher } = this.props;
    const credentials = (facebook || {}).credentials || {};
    return (
      <section className="org-modal-share">
        <h4 className="title-modal-share">{'Compartilhar código'}</h4>
        <p
          className="subtitle-modal-share"
        >
          {'Escolha a forma que acha mais fácil para indicar a Printi para seus amigos. \\o/'}
        </p>
        <section className="mol-texts-modal-share">
          <button
            onClick={() => this.handleChangeShareSection('email')}
            className={cx('atm-text-modal-share', activeSection === 'email' && 'selected-section')}
          >
            <MailIcon />
            <p>{'Compartilhar por Email'}</p>
          </button>
          <button
            onClick={() => this.handleChangeShareSection('link')}
            className={cx('atm-text-modal-share', 'link-icon', activeSection === 'link' && 'selected-section')}
          >
            <LinkIcon />
            <p>{'Copiar link promocional'}</p>
          </button>
          <FacebookProvider
            appId={(credentials.app_id || 0).toString()}
            version={'v2.10'}
            language={language}
          >
            <Share
              appId={(credentials.app_id || 0).toString()}
              href="https://www.facebook.com/"
              mobileIframe={isMobile(screenSize)}
              quote={message(voucher.voucher_name || voucher.voucher_id)}
            >
              <button
                type="button"
                className={cx('atm-text-modal-share', 'facebook-icon', activeSection === 'facebook' && 'selected-section')}
              >
                <FacebookIcon />
                <p>{'Compartilhar por Facebook'}</p>
              </button>
            </Share>
          </FacebookProvider>
        </section>
        {this.renderShareSection()}
      </section>
    );
  }
}
