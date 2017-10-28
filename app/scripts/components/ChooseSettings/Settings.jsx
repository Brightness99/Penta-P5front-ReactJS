// @flow
import React from 'react';
import cx from 'classnames';
import { Select } from 'atoms/Inputs/Select';
import CheckIcon from 'components/Icons/Check';
import { isEmpty, isMobile, getScreenSize } from 'utils/helpers';

type Props = {
  productPart: ProductPartType,
  productPartName: string,
  form: {
    [key: string]: {
      [key: string]: { valid: boolean, value: string },
    },
  },
  handleChange: (e: Event) => void,
};

const Settings = ({ productPart, productPartName, form, handleChange }: Props) => {
  const combinations = Object.keys(productPart.data.combination)
  .map(key => productPart.data.combination[key]);

  const isMobileScreen = isMobile(getScreenSize());

  return (
    <section className={cx('org-choose-settings', !isMobileScreen && combinations.length === 1 && 'single-settings')}>
      {
        combinations.map((combination, combinationIndex, arr) => {
          const formPart = form[productPartName];
          const formField = formPart ? formPart[`product_${combination.name}_id`] || {} : {};
          const formFieldName = Object.keys(productPart.data.combination)[combinationIndex];
          const formIdField = `product_${formFieldName}_id`;
          const defaultField = { value: '', valid: false };

          const isChosenSetting = formPart && (formPart[formIdField] || defaultField).valid;
          return (
            <article
              // eslint-disable-next-line react/no-array-index-key
              key={`${combination.name}-${combinationIndex}`}
              className="mol-choose-settings"
            >
              <h5 className={cx('atm-number-setting')}>
                <span
                  className={cx(isChosenSetting && 'valid-number-setting')}
                >
                  {isChosenSetting ? <CheckIcon /> : combinationIndex + 1}
                </span>
              </h5>
              <p className="title-choose-settings">
                {`${combination.name.slice(0, 1)
                .toUpperCase()}${combination.name.slice(1)}`}
              </p>
              <section className="org-checkout-content-data">
                <Select
                  className="atm-checkout-input atm-checkout-input-one"
                  name={formIdField}
                  showLabel={true}
                  id={formIdField}
                  placeholder={'Selecione...'}
                  required={true}
                  defaultValue={formField.value || ''}
                  value={formField.value || ''}
                  onChange={(e: Event) => handleChange(e, arr.length, productPartName)}
                >
                  {
                    Object.keys(combination.options)
                    .map(key => combination.options[key])
                    .filter(option => !isEmpty(option.name) && !isEmpty(option.value))
                    .map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                  }
                </Select>
              </section>
            </article>
          );
        })
      }
    </section>
  );
};

export default Settings;
