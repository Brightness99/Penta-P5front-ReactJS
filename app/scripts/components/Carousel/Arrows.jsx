// @flow

import React from 'react';
import cx from 'classnames';
import { ArrowCarousel } from 'components/Icons';

type Props = {
  className: string,
  onClick: () => {},
};

export const PrevArrow = (props: Props) => {
  const { onClick, className } = props;

  return (
    <button
      className={cx(
        'atm-carousel-arrow',
        'atm-carousel-arrow--prev',
        className,
      )}
      onClick={onClick}
    >
      <ArrowCarousel />
    </button>
  );
};

export const NextArrow = (props: Props) => {
  const { onClick, className } = props;

  return (
    <button
      className={cx(
        'atm-carousel-arrow',
        'atm-carousel-arrow--next',
        className,
      )}
      onClick={onClick}
    >
      <ArrowCarousel />
    </button>
  );
};
