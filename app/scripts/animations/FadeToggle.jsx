// @flow

import React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  timeout: {
    enter: number,
    exit: number,
  },
  children: any,
};

const FadeToggle = (props: Props) => (
  <CSSTransition
    {...props}
    classNames="anm-fade-toggle"
    timeout={props.timeout || { enter: 300, exit: 300 }}
  >
    {props.children}
  </CSSTransition>
);

export default FadeToggle;
