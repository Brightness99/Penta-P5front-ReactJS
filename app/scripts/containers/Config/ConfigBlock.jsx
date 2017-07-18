// @flow height: 4rem;


import React from 'react';
import cx from 'classnames';
import MoreInfo from 'components/MoreInfo';
import { ValidateOrdering } from 'atoms/Ordering';

type Props = {
  className: string,
  children?: typeof React.Component,
  order: string,
  locale: {},
  selected?: boolean,
  button?: typeof React.Component,
  screenSize: string,
  isComplete: boolean,
};

const ConfigBlock = (props: Props) => {
  const { locale, children, order, button, screenSize, isComplete } = props;

  const renderMobileHeader = () => {
    return (
    <div className="app__config__block-header">
      <ValidateOrdering order={order} isComplete={isComplete} />
      <div className="app__config__block-header__title">
        <h3>{locale.TITLE}</h3>
        <MoreInfo text={locale.MORE_INFO_TEXT} />
        {button}
      </div>
    </div>
    );
  };

  const renderDesktopHeader = () => (
    <div className="app__config__block-header">
      <ValidateOrdering order={order} isComplete={isComplete} />
      <div className="app__config__block-header__title">
        <h3>{locale.TITLE} {button}</h3>
        <MoreInfo text={locale.MORE_INFO_TEXT} />
      </div>
    </div>
  );

  return (
    <section
      className={cx('app__config__block', props.className)}
    >
      {['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
        ? renderMobileHeader()
        : renderDesktopHeader()}
      {React.cloneElement(children)}
    </section>
  );
};

export default ConfigBlock;
