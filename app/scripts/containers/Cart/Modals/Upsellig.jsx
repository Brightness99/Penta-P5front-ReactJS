// @flow

import React from 'react';
import { CheckBox } from 'components/Input';
import { TextButton, RoundedConfirmationButton } from 'atoms/Buttons';
import cx from 'classnames';
import { IntlDate, IntlMoney } from 'components/Intl';

type Props = {
  isUpsellSelected: boolean,
  handleUpsellChoose: () => {},
  handleModalClose: () => {},
};

const UpsellingModal = (props: Props) => {
  const handleClose = () => {
    const { handleModalClose } = props;

    if (typeof handleModalClose === 'function') {
      handleModalClose();
    }
  };

  const handleChoose = () => {
    const { handleUpsellChoose } = props;

    if (typeof handleUpsellChoose === 'function') {
      handleUpsellChoose();
    }
  };

  return (
    <div className="org-up-sell">
      <div className="mol-up-sell-header">
        Turbine seu produto
        <span>Antecipe sua entrega agora mesmo! :)</span>
      </div>
      <div className="mol-up-sell-content">
        <div className="atm-up-sell-content-title">previsão de entrega</div>
        <div className="mol-up-sell-content-main">
          <div className="atm-up-sell-days">-3 <span>dias</span></div>
          <div className="atm-up-sell-delivery">Nova previsão de entrega <IntlDate>04/08/2017</IntlDate></div>
          <label className={cx('atm-up-sell-checkbox', props.isUpsellSelected && 'atm-up-sell-checkbox--checked')}>
            <CheckBox checked={props.isUpsellSelected} onChange={handleChoose} value="123" />+ <IntlMoney>{10}</IntlMoney>
          </label>
        </div>
      </div>
      <div className="mol-up-sell-footer">
        <div className="atm-up-sell-prices">
          <IntlMoney>{90.99}</IntlMoney>
          <IntlMoney className="atm-up-sell-prices-after">{100.99}</IntlMoney>
        </div>
        <div className="atm-up-sell-add">
          <TextButton onClick={handleClose}>Cancelar</TextButton>
          <RoundedConfirmationButton
            isEnabled={props.isUpsellSelected}
            value="val"
            onClick={() => console.log(123)}
          >
            ADICIONAR
          </RoundedConfirmationButton>
        </div>
      </div>
    </div>
  );
};

export default UpsellingModal;
