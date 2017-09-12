// @flow

import React from 'react';
import cx from 'classnames';
import { ArrowCarousel } from 'components/Icons';

type Props = {
  className: string,
  onClick: () => {},
};

export const PrevArrow = (props: Props) => {
  const { onClick } = props;
  return (
    <button
      className="atm-carousel-arrow atm-carousel-arrow--prev"
      onClick={onClick}
    >
      <ArrowCarousel />
    </button>
  );
};

export const NextArrow = (props: Props) => {
  const { onClick } = props;
  return (
    <button
      className="atm-carousel-arrow atm-carousel-arrow--next"
      onClick={onClick}
    >
      <ArrowCarousel />
    </button>
  );
};
