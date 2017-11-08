import React from 'react';
import { isMobile } from 'utils/helpers';
import Slider from 'react-slick';
import { PrevArrow, NextArrow } from 'components/Carousel';

export class Tutorial extends React.Component {
  render() {
    return (
      <section>
        <div className="container">
          <div>
            <Slider
              className="org-component-banners"
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              dots={true}
              dotsClass="atm-carousel-dots"
              autoplay={false}
            >
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </Slider>
          </div>

          <div>
            <h2>Tutoriais</h2>

            <div>
              search
            </div>

            <div>
              content
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default Tutorial;
