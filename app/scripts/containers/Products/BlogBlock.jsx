// @flow
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
        <span>Biblioteca</span>
        <img src={item.image} alt="Papel" />
        <div className="blogCard-text">
          <h5 className="titlePost">{item.title}</h5>
          <p>{item.content}</p>
          <sub><HourglassIcon />{item.reading_time}</sub>
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
