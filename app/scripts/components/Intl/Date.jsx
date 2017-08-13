// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  className: string,
  children: number,
  locale: {
    TIME_FORMAT: string,
    LANGUAGE: string,
  },
};

export const IntlDate = (props: Props) => {
  const { className, children, locale } = props;

  const standardDate = new Date(children);

  const userOffset = standardDate.getTimezoneOffset() * 60 * 1000;

  return (
    <span className={className}>
      {new Intl
        .DateTimeFormat(locale.LANGUAGE.replace('_', '-'))
        .format(new Date(standardDate.getTime() + userOffset))
      }
    </span>
  );
};

function mapStateToProps(state) {
  return {
    locale: {
      TIME_FORMAT: state.locale.CURRENCY_FORMAT,
      LANGUAGE: state.locale.LANGUAGE,
    },
  };
}

export default connect(mapStateToProps)(IntlDate);
