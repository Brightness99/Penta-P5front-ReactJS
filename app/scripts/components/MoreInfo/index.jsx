// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { connect } from 'react-redux';

type Props = {
  locale: {
    MORE_INFOS: string,
  },
  text: string,
  className?: string,
};

export class Newsletter extends React.Component {
  static props: Props;

  render() {
    const { locale: { MORE_INFOS }, className, text } = this.props;

    return (
      <div
        className={cx(
          'app__more-infos',
          className
        )}
      >
        <SVG src={require('assets/media/svg/icon_info.svg')} /> {MORE_INFOS}
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
    locale: state.locale.translate.common,
  };
}

export default connect(mapStateToProps)(Newsletter);
