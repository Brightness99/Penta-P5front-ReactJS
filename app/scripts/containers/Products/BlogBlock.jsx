// @flow
// TODO: Carousel on mobile
import React from 'react';
import { connect } from 'react-redux';
import { blogFetch } from 'actions';

import { HourglassIcon } from 'components/Icons';

type Props = {
  screenSize: string,
  className: string,
  blog: {},
  button?: typeof React.Component,
  dispatch: () => {},
};

export class BlogBlock extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(blogFetch());
  }

  props: Props;

  renderPost() {
    const { blog: { blog } } = this.props;

    return blog.map((item) => (
      <div className="blogCard" key={item.id}>
        <span className="titleCategory">Biblioteca</span>
        <img src={item.image} alt="Papel" />
        <div className="blogCard-text" id="bla bla bla">
          <div className="truncate">
            <h5 className="titlePost">{item.title}</h5>
          </div>
          <p>{item.content}</p>
          <sub className="hourglassText">
            <HourglassIcon />
            <span>{item.reading_time}</span>
          </sub>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <section className="container-blog">
        <h4 className="blog-title">Últimas do blog</h4>
        <div className="box-blogCards">
          {this.renderPost()}
        </div>
      </section>
    );
  }

}

function mapStateToProps(state) {
  return {
    blog: state.blog,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogBlock);
