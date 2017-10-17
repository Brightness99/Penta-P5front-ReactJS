// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { cartUpsellingDateFetch, cartUpsellingAddFetch } from 'actions';
import { CheckBox } from 'components/Input';
import { TextButton, RoundedConfirmationButton } from 'atoms/Buttons';
import cx from 'classnames';
import { IntlDate, IntlMoney } from 'components/Intl';
import Loading from 'components/Loading';

type Props = {
  isUpsellSelected: boolean,
  itemId: string,
  locale: {},
  upselling: {},
  handleUpsellChoose: () => {},
  handleModalClose: () => {},
  dispatch: () => {},
};

export default class UpsellingDateModal extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { itemId, upselling, dispatch } = this.props;

    if (!upselling) {
      dispatch(cartUpsellingDateFetch(itemId));
    }
  }

  static props: Props;

  handleClose = () => {
    const { handleModalClose } = this.props;

    if (typeof handleModalClose === 'function') {
      handleModalClose();
    }
  };

  handleChoose = () => {
    const { handleUpsellChoose } = this.props;

    if (typeof handleUpsellChoose === 'function') {
      handleUpsellChoose();
    }
  };

  handleSubmit = () => {
    const { dispatch, itemId, handleModalClose } = this.props;

    dispatch(cartUpsellingAddFetch(itemId));

    if (typeof handleModalClose === 'function') {
      handleModalClose();
    }
  };

  renderContent() {
    const { locale, isUpsellSelected, upselling } = this.props;

    return [
      <div key="header" className="mol-up-sell-header">
        {locale.TITLE}
        <span>{locale.SUB_TITLE}</span>
      </div>,
      <div key="content" className="mol-up-sell-content">
        <div className="atm-up-sell-content-title">{locale.ESTIMATED_DELIVERY}</div>
        <div className="mol-up-sell-content-main">
          <div className="atm-up-sell-days">-{upselling.days} <span>{locale.DAYS}</span></div>
          <div className="atm-up-sell-delivery">{locale.NEW_ESTIMATED_DELIVERY}<IntlDate>{upselling.expected_delivery_date}</IntlDate></div>
          <label className={cx('atm-up-sell-checkbox', isUpsellSelected && 'atm-up-sell-checkbox--checked')}>
            <CheckBox checked={isUpsellSelected} onChange={this.handleChoose} />+ <IntlMoney>{upselling.diff_total_price}</IntlMoney>
          </label>
        </div>
      </div>,
      <div key="footer" className="mol-up-sell-footer">
        <div className="atm-up-sell-prices">
          <IntlMoney>{upselling.old_total_price}</IntlMoney>
          <IntlMoney className="atm-up-sell-prices-after">{upselling.new_total_price}</IntlMoney>
        </div>
        <div className="atm-up-sell-add">
          <TextButton onClick={this.handleClose}>{locale.CANCEL}</TextButton>
          <RoundedConfirmationButton
            isEnabled={isUpsellSelected}
            onClick={this.handleSubmit}
          >
            {locale.ADD}
          </RoundedConfirmationButton>
        </div>
      </div>,
    ];
  }

  render() {
    const { upselling } = this.props;

    return (
      <div className="org-up-sell">
        {!upselling ? <Loading /> : this.renderContent()}
      </div>
    );
  }
}
