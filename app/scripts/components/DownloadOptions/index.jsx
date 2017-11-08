// @flow
import React from 'react';
import cx from 'classnames';
import { isMobile, getScreenSize } from 'utils/helpers';

type RequestDownloadTemplateType = (file: string, orientation: 'vertical' | 'horizontal', data: any) => void;

type Props = {
  options: Array<string>,
  orientation: 'vertical' | 'horizontal',
  parts: {
    [key: string]: {
      guideCombination: number,
      fileCombinationId: number,
    },
  },
  requestDownloadTemplate: RequestDownloadTemplateType,
  downloadOptions: DownloadOptionsType,
};

const getDownloadUrl = (downloadOptions: DownloadOptionsType) =>
  (option: string, orientation: 'vertical' | 'horizontal') => {
    const downloadOption = downloadOptions[option] || {};
    return (downloadOption[orientation] || {}).url;
  };

const handleClick = (requestDownloadTemplate: RequestDownloadTemplateType) =>
  (downloadOptions: DownloadOptionsType = {}, option: string, orientation: 'vertical' | 'horizontal', parts: any) => {
    const url = getDownloadUrl(downloadOptions || {})(option, orientation);
    if (url) {
      return;
    }
    requestDownloadTemplate(option, orientation, parts);
  };

const DownloadOptions = ({ options, requestDownloadTemplate, orientation, parts, downloadOptions }: Props) => {
  const url = getDownloadUrl(downloadOptions || {});
  return (
    <section className="mol-sidebar-download-template">
      <section className="atm-sidebar-choose-download">
        <h4 className="title-atm-sidebar">{'Baixe o gabarito:'}</h4>
        <ul className={cx('qrk-list-download', isMobile(getScreenSize()) && 'mobile-download-template')}>
          {
            options.map(option => {
              const href = url(option, orientation);
              return (
                <li key={option}>
                  <img src={require(`assets/media/images/${option.toLowerCase()}-icon.png`)} alt={option} />
                  {
                      href ?
                        <a
                          href={href}
                          className={'btn-default btn-sm fnt-sbold'}
                          download
                        >
                          {option.toUpperCase()}
                        </a> :
                        <button
                          type="button"
                          className={'btn-default btn-sm fnt-sbold download-template__button'}
                          onClick={() => handleClick(requestDownloadTemplate)(downloadOptions, option, orientation, {
                            packageName: `${option} ${orientation}`,
                            parts,
                          })}
                        >
                          {option.toUpperCase()}
                        </button>
                    }
                </li>
              );
            }
            )
          }
        </ul>
      </section>
    </section>
  );
};

export default DownloadOptions;
