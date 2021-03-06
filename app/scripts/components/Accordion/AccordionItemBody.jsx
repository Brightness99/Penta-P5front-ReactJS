// @flow

// TODO: Accept text as children

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  children: string,
  key: string,
  active: boolean,
  className: '',
  update: number,
};

type State = {
  height: number,
};

export default class AccordionItemBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.active ? this.body.scrollHeight : 0,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps(nextProps) {
    const { active, update } = this.props;

    if (nextProps.active !== active || nextProps.update !== update) {
      this.setState({
        height: nextProps.active ? this.body.scrollHeight : 0,
      });
    }
  }

  static props: Props;

  static state: State;

  render() {
    const { children, key, className } = this.props;
    const { height } = this.state;

    return (
      <div
        className={cx('atm-accordion-item-body', className)}
        key={key}
        ref={(body) => this.body = body} // eslint-disable-line no-return-assign
        style={{
          height,
        }}
      >
        {React.cloneElement(
          children,
          {
            ...children.props,
          }
        )}
      </div>
    );
  }
}
