// @flow

import React from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import { PrevArrow, NextArrow } from 'components/Carousel/Arrows';

type Props = {
  images: BannerImageType[],
  screenSize: string,
};

const Banners = (props: Props) => {
  const { images, screenSize } = props;

  return (
    <Slider
      className="org-component-banners"
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      dots={true}
      dotsClass="atm-carousel-dots atm-banners-dots"
      autoplay={true}
    >
      {images
        .filter((image) => {
          if (isMobile(screenSize)) {
            return !!image.file.MOBILE;
          }

          return !!image.file.DESKTOP;
        })
        .map((image) => (
          image.link
            ? <NavLink to={image.link.URL} target={image.link.TARGET} key={`${image.ALT}-${image.file.DESKTOP}-${image.file.MOBILE}`}>
              <img src={`${isMobile(screenSize) ? image.file.MOBILE : image.file.DESKTOP}`} alt={image.ALT} />
            </NavLink>
            : <img src={`${isMobile(screenSize) ? image.file.MOBILE : image.file.DESKTOP}`} alt={image.ALT} />
      ))}
    </Slider>
  );
};

export default Banners;
