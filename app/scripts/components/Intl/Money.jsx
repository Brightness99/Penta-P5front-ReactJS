// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  className: string,
  children: number,
  locale: {
    CURRENCY_FORMAT: string,
    LANGUAGE: string,
  },
};

export const IntlMoney = (props: Props) => {
  const { className, children, locale } = props;
  return (
    <span className={className}>
      {locale.CURRENCY_FORMAT}{new Intl.NumberFormat(locale.LANGUAGE.replace('_', '-'), { minimumFractionDigits: 2 }).format(children.toFixed(2))}
    </span>
  );
};

function mapStateToProps(state) {
  return {
    locale: {
      CURRENCY_FORMAT: state.locale.CURRENCY_FORMAT,
      LANGUAGE: state.locale.LANGUAGE,
    },
  };
}

export default connect(mapStateToProps)(IntlMoney);
