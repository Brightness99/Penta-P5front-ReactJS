// @flow

import * as React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';
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
  header: React.Element<any>[],
};

export default class FunnelBlock extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  render(): React.Node {
    const { children, header, order, isComplete, className } = this.props;

    return (
      <section
        className={cx('org-funnel-block', className)}
      >
        <div className="mol-funnel-block-header">
          <ValidateOrdering order={order} isComplete={isComplete} />
          <div className="atm-funnel-block-title">
            {header}
          </div>
        </div>
        <div className="mol-funnel-block-body">
          {children}
        </div>
      </section>
    );
  }
}
