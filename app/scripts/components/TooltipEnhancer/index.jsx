// @flow
import React from 'react';
import type { ReactElement } from 'react';
import Tooltip from 'components/Tooltipster';

type Props = {
  keyProp: string,
  text: string,
};

const TooltipEnhancer = (showingProp: boolean) => (WrappedComponent: ReactElement) => (props: Props) => (
  showingProp ?
    <Tooltip key={props.keyProp} text={props.text}>
      <WrappedComponent />
    </Tooltip> :
    <WrappedComponent />
);

export default TooltipEnhancer;
