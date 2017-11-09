// @flow
import React from 'react';
import cx from 'classnames';
import Select from 'atoms/Inputs/Select/Simple';
import DownloadOptions from 'components/DownloadOptions';
import { isMobile, getScreenSize } from 'utils/helpers';

type Props = {
  form: {
    [key: string]: {
      [key: string]: {
        valid: boolean,
        value: string,
      },
    },
  },
  handleSubmit: (e: Event) => void,
  handleChange: (e: Event) => void,
  downloadData: {
    options: {
      [key: string]: Array<string>,
    },
    parts: {
      [key: string]: ProductPartType,
    },
  },
  requestDownloadTemplate: (file: string, orientation: 'vertical' | 'horizontal', data: any) => void,
  canSubmit: boolean,
  productName: string,
  downloadOptions: DownloadOptionsType,
};

const getOrientation = (formField) => (formField ? formField.orientation : { valid: false, value: '' });

const DownloadSection = ({ downloadData, form, canSubmit, handleChange, requestDownloadTemplate, productName, downloadOptions }: Props) => {
  if (!downloadData) {
    return null;
  }
  const { options, ...parts } = downloadData;
  const partValues = Object.keys(parts)
  .map(key => ({ key, data: parts[key] }));

  const optionKeys = Object.keys(options);
  const canShowDownloadOptions = canSubmit || optionKeys.length === 1;

  const orientation = optionKeys.length === 1 ? optionKeys[0] : getOrientation(form[partValues[0].key]).value;
  const optionData = options[orientation];
  return (
    <section className={'download-template-main'}>
      <form className="container">
        <h2 className={cx('download-template-title', isMobile(getScreenSize()) && 'mobile-download-template-title')}>
          {productName}
        </h2>
        {
          optionKeys.length > 1 &&
          partValues.map(part => {
            const formField = getOrientation(form[part.key]) || { valid: false, value: '' };
            return (
              <article
                key={part.key}
                className={cx('download-template-form', isMobile(getScreenSize()) && 'mobile-download-template-form')}
              >
                <p>{'Orientação'}</p>
                <section className="">
                  <Select
                    className="atm-checkout-input atm-checkout-input-one"
                    name={'orientation'}
                    showLabel={true}
                    id={'orientation'}
                    placeholder={'Selecione...'}
                    required={true}
                    defaultValue={formField.value || ''}
                    value={formField.value || ''}
                    onChange={e => handleChange(e, part.key)}
                  >
                    {
                      Object.keys(options)
                      .map(option => <option key={option} value={option}>{option}</option>)
                    }
                  </Select>
                </section>
              </article>
            );
          })
        }
        {
          canShowDownloadOptions &&
          <section
            className={cx('container', 'download-template-container', isMobile(getScreenSize()) && 'mobile-download-template-container')}
          >
            <section className="org-download-template">
              <DownloadOptions
                options={optionData}
                orientation={orientation}
                parts={parts}
                requestDownloadTemplate={requestDownloadTemplate}
                productName={productName}
                downloadOptions={downloadOptions}
              />
            </section>
          </section>
        }
      </form>
      {/* {*/}
      {/* canShowDownloadOptions &&*/}
      {/* <section>*/}
      {/* <section className="org-download-template">*/}
      {/* <article className="mol-footer-preview">*/}
      {/* <section className="container">*/}
      {/* <p className="text-footer-preview">*/}
      {/* {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque*/}
      {/* auctor sapien nibh, nec varius sem finibus sit amet. Nulla ornare ligula nec ex sodales rutrum. Maecenas ac*/}
      {/* consectetur mi, vel malesuada libero.`}*/}
      {/* </p>*/}
      {/* <form>*/}
      {/* <Input*/}
      {/* name="email"*/}
      {/* placeholder="E-mail"*/}
      {/* showLabel={true}*/}
      {/* />*/}
      {/* <Button*/}
      {/* type="submit"*/}
      {/* kind="success"*/}
      {/* className="btn-default"*/}
      {/* >*/}
      {/* {'Enviar'}*/}
      {/* </Button>*/}
      {/* </form>*/}
      {/* </section>*/}
      {/* </article>*/}
      {/* </section>*/}
      {/* </section>*/}
      {/* }*/}
    </section>
  );
};

export default DownloadSection;
