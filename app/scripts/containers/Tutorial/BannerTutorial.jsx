// @flow

import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';
import { PrevArrow, NextArrow } from 'components/Carousel';

type Props = {
  screenSize: boolean,
}
export class BannerTurorial extends React.Component {
  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className={cx(!isMobile(screenSize) && ('container'))}>
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
      </div>
    );
  }
}

export default BannerTurorial;
