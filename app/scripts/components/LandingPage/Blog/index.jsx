// @flow

// TODO: Carousel on mobile
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Slider from 'react-slick';

import { blogFetch } from 'actions';
import { isMobile } from 'utils/helpers';

import Loading from 'components/Loading';
import { HourglassIcon, CalendarIcon } from 'components/Icons';
import { BlockTitle } from 'atoms/Titles';

type Props = {
  screenSize: string,
  blog: {},
  locale: {},
  dispatch: () => {},
};

const missingBlogAttributes = {
  reading_time: 2,
  post_category: 'Biblioteca',
  post_creation: '2017-09-15',
};

export class BlogBlock extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(blogFetch());
  }

  props: Props;

  renderPost() {
    const { blog: { blog }, locale } = this.props;

    return blog.map((item) => (
      <div className="blogCard" key={`blogCard-${item.title}`}>
        <NavLink to={item.url} target="_blank">
          <span className="titleCategory">{missingBlogAttributes.post_category}</span>
          <img src={item.image} alt={item.title} />
          <div className="blogCard-text">
            <h4 className="titlePost">{item.title}</h4>
            <p>{item.content}</p>
          </div>
          <div className="blogCard-footer">
            <div className="blogCard-footer-date">
              <CalendarIcon />
              <span>{moment(missingBlogAttributes.post_creation).format(locale.DATE_FORMAT)}</span>
            </div>
            <div className="blogCard-footer-time">
              <HourglassIcon />
              <span>{`${missingBlogAttributes.reading_time}${locale.TIME_MEASURE} ${locale.TO_READ}`}</span>
            </div>
          </div>
        </NavLink>
      </div>
    ));
  }

  renderDesktop() {
    const { locale } = this.props;

    return (
      <section className="container-blog">
        <div className="container">
          <BlockTitle>{locale.TITLE}</BlockTitle>
          <div className="box-blogCards">
            {this.renderPost()}
          </div>
        </div>
      </section>
    );
  }

  renderMobile() {
    const { locale } = this.props;

    return (
      <section className="container-blog">
        <BlockTitle>{locale.TITLE}</BlockTitle>
        <Slider
          className="box-blogCards carousel-display-overflow"
          arrows={false}
          dots={true}
          dotsClass="atm-carousel-dots"
          autoplay={false}
        >
          {this.renderPost()}
        </Slider>
      </section>
    );
  }

  render() {
    const { screenSize, blog: { isRunning, isLoaded } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    blog: state.blog,
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.home.blog,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogBlock);

