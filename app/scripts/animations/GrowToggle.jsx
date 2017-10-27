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

const GrowToggle = (props: Props) => (
  <CSSTransition
    {...props}
    classNames="anm-grow-toggle"
    timeout={props.timeout || { enter: 200, exit: 100 }}
    mountOnEnter={true}
    unmountOnExit={true}
    appear={true}
  >
    {props.children}
  </CSSTransition>
);

export default GrowToggle;
