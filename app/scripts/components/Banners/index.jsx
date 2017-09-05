// @flow

import React from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import { ArrowCarousel } from 'components/Icons';

type Props = {
  images: BannerImageType[],
  screenSize: string,
};

const Banners = (props: Props) => {
  const { images, screenSize } = props;


  const NextArrow = (arrowProps) => {
    const { onClick } = arrowProps;
    return (
      <button
        className="atm-banners-arrow atm-banners-arrow--next"
        onClick={onClick}
      >
        <ArrowCarousel />
      </button>
    );
  };

  const PrevArrow = (arrowProps) => {
    const { onClick } = arrowProps;
    return (
      <button
        className="atm-banners-arrow atm-banners-arrow--prev"
        onClick={onClick}
      >
        <ArrowCarousel />
      </button>
    );
  };

  return (
    <Slider
      className="org-component-banners"
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
    >
      {images
        .filter((image) => {
          if (isMobile(screenSize)) {
            return !!image.file.mobile;
          }

          return !!image.file.desktop;
        })
        .map((image) => (
          image.link
            ? <NavLink to={image.link.url} target={image.link.target} key={`${image.alt}-${image.file.desktop}-${image.file.mobile}`}>
              <img src={`${isMobile(screenSize) ? image.file.mobile : image.file.desktop}`} alt={image.alt} />
            </NavLink>
            : <img src={`${isMobile(screenSize) ? image.file.mobile : image.file.desktop}`} alt={image.alt} />
      ))}
    </Slider>
  );
};

export default Banners;
