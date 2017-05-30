// @flow

import React from 'react';
import cx from 'classnames';
import MoreInfo from 'components/MoreInfo';

type Props = {
  className: string,
  children?: typeof React.Component,
  order: string,
  locale: {},
  selected?: boolean,
  button?: typeof React.Component,
  screenSize: string,
};

const ConfigBlock = (props: Props) => {
  const { locale, children, order, button } = props;
  const renderMobileHeader = () => (
    <div className="app__config__block-header">
      <div className="app__config__block-header__order">
        {order}
      </div>
      <div className="app__config__block-header__title">
        <h3>{locale.TITLE}</h3>
        <MoreInfo text={locale.MORE_INFO_TEXT} />
        {button}
      </div>
    </div>
  );

  const renderDesktopHeader = () => (
    <div className="app__config__block-header">
      <div className="app__config__block-header__order">
        {order}
      </div>
      <div className="app__config__block-header__title">
        <h3>{locale.TITLE}</h3>
        {button}
        <MoreInfo text={locale.MORE_INFO_TEXT} />
      </div>
    </div>
  );

  return (
    <section
      className={cx('app__config__block', props.className)}
    >
      {['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(props.screenSize)
        ? renderMobileHeader()
        : renderDesktopHeader()}
      {React.cloneElement(children)}
    </section>
  );
};

export default ConfigBlock;
