// @flow

import React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  timeout: {
    enter: number,
    exit: number,
  },
  direction: string,
  children: any,
};

const SlideToggle = (props: Props) => (
  <CSSTransition
    {...props}
    classNames={props.direction ? `anm-slide-toggle-${props.direction}` : 'anm-slide-toggle-ltr'}
    timeout={props.timeout || { enter: 200, exit: 100 }}
  >
    {props.children}
  </CSSTransition>
);

export default SlideToggle;
