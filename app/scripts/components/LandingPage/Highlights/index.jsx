// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { isMobile } from 'utils/helpers';
import { BlockTitle } from 'atoms/Titles';
import { PrevArrow, NextArrow } from 'components/Carousel/Arrows';

type Props = {
  highlights: {},
  screenSize: string,
};

const Highlights = (props: Props) => {
  const { highlights, screenSize } = props;

  const renderHighlights = () => {
    return highlights.list.map((highlight) => (
      <NavLink to={highlight.link.URL} title={highlight.link.TITLE} className="box-highlight">
        <img src={`http://dev-cms.printi.com.br${highlight.image.URL}`} alt={highlight.image.ALT} />
        <div className="desc-highlight">
          <h4 className="box-highlight-title">{highlight.TITLE}</h4>
          <p>{highlight.TEXT}</p>
        </div>
      </NavLink>
    ));
  };

  const renderMobile = () => (
    <div className="container">
      <section className="container-highlight">
        <h4 className="title-highlight">{highlights.TITLE}</h4>
        <Slider
          className="boxes-highlight"
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          dots={true}
          dotsClass="atm-carousel-dots"
          autoplay={false}
        >
          {renderHighlights()}
        </Slider>
      </section>
    </div>
  );

  const renderDesktop = () => (
    <div className="container">
      <section className="container-highlight">
        <BlockTitle>{highlights.TITLE}</BlockTitle>
        <Slider
          className="boxes-highlight"
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          dots={true}
          dotsClass="atm-carousel-dots"
          autoplay={false}
          slidesToShow={3}
          slidesToScroll={3}
        >
          {renderHighlights()}
        </Slider>
      </section>
    </div>
  );

  return isMobile(screenSize) ? renderMobile() : renderDesktop();
};

export default Highlights;
