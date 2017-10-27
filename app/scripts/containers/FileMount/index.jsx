// @flow
import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile, getTitleFromSlug } from 'utils/helpers';
import { PageTitle } from 'atoms/Titles';
import Breadcrumbs from 'components/Breadcrumbs';
import { fileMountFetch } from 'actions';

import Sidebar from './Sidebar';
import ContentText from './ContentText';

type Props = {
  app: AppStore,
  router: RouterStore,
  fileMount: {},
  match: {
    params: {
      slug: ''
    }
  },
  dispatch: () => {},
};

type State = {
  slug: string,
};

export class FileMount extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      slug: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;
    const validSlug = (slug === undefined) ? '' : slug;
    dispatch(fileMountFetch(validSlug));
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { slug } }, dispatch } = this.props;
    if (slug !== nextProps.match.params.slug) {
      const validSlug = (nextProps.match.params.slug === undefined) ? '' : nextProps.match.params.slug;
      this.setState({ slug: validSlug });
      dispatch(fileMountFetch(validSlug));
    }
  }

  static props: Props;

  static state: State;

  selectItem = (str) => {
    const { dispatch } = this.props;
    dispatch(fileMountFetch(str));
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
        title: 'Montagem do arquivo',
        url: '/montagem-do-arquivo',
      },
      {
        title: getTitleFromSlug(slug),
      },
    ];
    const { fileMount } = this.props;
    return (
      <section>
        <div className="container">
          <div className="template-file-mount">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <PageTitle>Montagem do arquivo</PageTitle>
            <div className="org-content-file-mount">
              <Sidebar screenSize={screenSize} selectItem={this.selectItem} fileMount={fileMount} />
              {!isMobile(screenSize) && <ContentText fileMount={fileMount} />}
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
    fileMount: state.fileMount,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileMount);

