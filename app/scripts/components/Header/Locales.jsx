// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  currentCountry: string,
};

const locales = {
  US: {
    name: 'United States',
    flag: '',
    link: 'http://react.printi.com',
  },
  BR: {
    name: 'Brasil',
    flag: '',
    link: 'http://react.printi.com.br',
  },
};

const LocaleChange = (props: Props) => {
  const { currentCountry } = props;

  return (
    <ul className="mol-topbar-locales">
      {
        Object.keys(locales)
        .filter((country) => country !== currentCountry)
        .map((country) => (
          <li key={country}><NavLink to={locales[country].link}>{locales[country].name}</NavLink></li>
        ))
      }
    </ul>
  );
};

export default LocaleChange;
