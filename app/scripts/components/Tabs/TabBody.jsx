// @flow

import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { FadeToggle } from 'animations';

type Props = {
  children: any,
  activeIndex: number,
};

const TabBody = (props: Props) => {
  const { children, activeIndex } = props;


  if (!children) {
    console.warn('Tabs: Empty or errored children passed to TabBody'); // eslint-disable-line no-console
    return null;
  }

  if (!Array.isArray(children)) {
    return <div className="atm-tab-active">{children}</div>;
  }

  return (
    <TransitionGroup className="atm-tab-active">
      <FadeToggle key={children[activeIndex].key}>
        {children[activeIndex]}
      </FadeToggle>
    </TransitionGroup>
  );
};

export default TabBody;
