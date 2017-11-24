// @flow

import React from 'react';

type Props = {
  parts: Object,
  locale: {
    TWO_PART_PRODUCT: string,
    COUNTRY_CODE: string,
  },
};

const PartsLabel = (props: Props) => {
  const { parts, locale } = props;

  if (parts.length > 1) {
    return (
      <div className="app__config__options-parts">
        {`${locale.TWO_PART_PRODUCT}: ${parts.reduce(
          (prevPart, currentPart) => (prevPart !== '' ? `${prevPart} ${locale.COUNTRY_CODE === 'US' ? 'and' : 'e'} ${currentPart.name}` : currentPart.name),
          ''
        )}`}
      </div>
    );
  }

  return null;
};

export default PartsLabel;
