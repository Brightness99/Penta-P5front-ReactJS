// @flow

import React from 'react';
import FlagIcon from 'components/Flags';

type Props = {
  currentCountry: string,
};

const locales = {
  US: {
    name: 'United States',
    link: 'http://react.printi.com',
  },
  BR: {
    name: 'Brasil',
    link: 'http://react.printi.com.br',
  },
};

const LocaleChange = (props: Props) => {
  const { currentCountry } = props;

  return (
    <ul className="mol-topbar-localeList">
      {
        Object.keys(locales)
        .filter((country) => country !== currentCountry)
        .map((country) => (
          <li key={country}><a href={locales[country].link} title={locales[country].name}><FlagIcon countryCode={country.toUpperCase()} />{locales[country].name}</a></li>
        ))
      }
    </ul>
  );
};

export default LocaleChange;
