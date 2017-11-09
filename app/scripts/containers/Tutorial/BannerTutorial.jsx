import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { PrevArrow, NextArrow } from 'components/Carousel';

export class BannerTurorial extends React.Component {
  render() {
    return (
      <div className="mol-banner-tutorial">
        <Slider
          className="org-component-banners"
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          dots={true}
          dotsClass="atm-carousel-dots atm-carousel-dots--inline"
          autoplay={false}
        >
          <Link to="#">
            <img src={require('assets/media/images/tutorial-slide.png')} alt="Banner" />
          </Link>
        </Slider>
      </div>
    );
  }
}

export default BannerTurorial;
