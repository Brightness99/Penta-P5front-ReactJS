// @flow

import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import { PrevArrow, NextArrow } from 'components/Carousel/Arrows';

type Props = {
  images: BannerImageType[],
  screenSize: AppStoreType.screenSize,
};

const Banners = (props: Props) => {
  const { images, screenSize } = props;

  const renderSlider = () => (
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
            : <img
              src={`${isMobile(screenSize) ? image.file.MOBILE : image.file.DESKTOP}`}
              alt={image.ALT}
              key={`${image.ALT}-${image.file.DESKTOP}-${image.file.MOBILE}`}
            />
        ))}
    </Slider>
  );

  if (isMobile(screenSize)) {
    return renderSlider();
  }

  return (
    <div className="container">
      {renderSlider()}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

export default connect(mapStateToProps)(Banners);
