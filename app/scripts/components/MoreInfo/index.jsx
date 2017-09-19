// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { connect } from 'react-redux';

type Props = {
  locale: {
    MORE_INFO: string,
  },
  text: string,
  className?: string,
};

export class Newsletter extends React.Component {
  static props: Props;

  render() {
    const { locale: { MORE_INFO }, className, text } = this.props;

    return (
      <div
        className={cx(
          'app__more-infos',
          className
        )}
      >
        <SVG src={require('assets/media/svg/icon_info.svg')} /> {MORE_INFO}
        <div className="atm-more-info-content">
          {text}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    locale: {
      MORE_INFO: state.locale.translate.common.MORE_INFO,
    },
  };
}

export default connect(mapStateToProps)(Newsletter);
