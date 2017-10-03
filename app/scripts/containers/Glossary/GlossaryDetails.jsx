// @flow

import React from 'react';
import { connect } from 'react-redux';
import { glossarySlugFetch } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  match: {
    params: {
      slug: string,
    }
  },
  glossarySlugLoad: (string)=>void,
  glossary: {},
  isRunning: boolean,
}

class GlossaryDetails extends React.Component {

  componentDidMount = () => {
    const { glossarySlugLoad, match } = this.props;
    if (typeof glossarySlugLoad === 'function') {
      const slug = match.params.slug;
      glossarySlugLoad(slug);
    }
  };

  static props: Props;

  renderContent() {
    const { isRunning, glossary } = this.props;
    if (isRunning) return '...loading';
    return (
      <div className="org-content-text">
        <h3 className="title-texts">{glossary.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: glossary.description }} />
      </div>
    );
  }

  render() {
    const { match, isRunning, glossary } = this.props;
    const title = isRunning ? match.params.slug : glossary.title;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Glossário',
        url: '/glossario',
      },
      {
        title,
      },
    ];
    return (
      <div>
        <Breadcrumbs links={breadcrumb} />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.app.screenSize,
  glossary: state.glossary.glossarySlug.glossary,
  isRunning: state.glossary.glossarySlug.isRunning,
});

const mapDispatchToProps = (dispatch) => ({
  glossarySlugLoad: (string) => dispatch(glossarySlugFetch(string)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryDetails);
