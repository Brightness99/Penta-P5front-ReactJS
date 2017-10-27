// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile, getTitleFromSlug } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { guideFetch } from 'actions';

import Sidebar from './Sidebar';
import ContentText from './ContentText';

type Props = {
  app: AppStore,
  router: RouterStore,
  guide: {},
  match: {
    params: {
      slug: ''
    }
  },
  dispatch: () => {},
};

export class PrintGuide extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;
    const validSlug = (slug === undefined) ? '' : slug;
    dispatch(guideFetch(validSlug));
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { slug } }, dispatch } = this.props;
    if (slug !== nextProps.match.params.slug) {
      const validSlug = (nextProps.match.params.slug === undefined) ? '' : nextProps.match.params.slug;
      this.setState({ slug: validSlug });
      dispatch(guideFetch(validSlug));
    }
  }

  static props: Props;
  state = {
    slug: '',
  }

  refreshPage = () => {
    const { dispatch } = this.props;
    const indexPage = '';
    dispatch(guideFetch(indexPage));
  }

  selectItem = (str) => {
    const { dispatch } = this.props;
    dispatch(guideFetch(str));
    this.setState({ slug: str });
  };

  render() {
    const { app: { screenSize } } = this.props;
    const { slug } = this.state;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Guia de impressão',
        url: '/guia-de-impressao',
      },
      {
        title: getTitleFromSlug(slug),
      },
    ];
    const { guide } = this.props;
    return (
      <section>
        <div className="container">
          <div className="template-file-mount">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <h2 className="title-file-mount">Guia de impressão</h2>
            {!isMobile(screenSize) && <p className="subtitle-file-mount">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>}

            <div className="org-content-file-mount">
              <Sidebar screenSize={screenSize} selectItem={this.selectItem} />
              <ContentText guide={guide} />
            </div>

          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    guide: state.guide,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintGuide);

