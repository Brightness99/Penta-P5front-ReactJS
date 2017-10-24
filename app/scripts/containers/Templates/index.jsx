// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import { Arrow } from 'components/Icons';
import Timeline from 'components/Timeline';
import ProductsTemplates from 'components/ProductsTemplates';
import ChooseSettings from 'components/ChooseSettings/index';
import DownloadTemplate from 'components/DownloadTemplate/index';

import {
  sendDownloadRequest, templatesFetch, requestDownloadTemplate,
  fetchTemplateDetailsById as fetchTemplateById, setActiveFinalId,
  startTemplateDownload, finishTemplateDownload,
} from 'actions/index';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';

type Props = {
  app: AppStore,
  templatesFetch: () => void,
  fetchTemplateDetailsById: (id: string) => void,
  templates: Array<TemplateType>,
  downloadData: DownloadDataType,
  activeFinalId: string,
  setActiveFinalId: (id: string) => void,
  sendDownloadRequest: (finalId: string, data: DownloadRequestFormType) => void,
  requestDownloadTemplate: (file: string, orientation: 'vertical' | 'horizontal', data: DownloadFileFormType) => void,
  startTemplateDownload: () => void,
  finishTemplateDownload: () => void,
  effects: {
    isLoaded: boolean,
    isRunning: boolean,
  },
}

type State = {
  activeStep: 1 | 2 | 3,
};

export class Templates extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { activeStep: 1 };
  }

  static defaultProps = {
    templatesFetch: () => null,
    fetchTemplateDetailsById: () => null,
  };

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.props.templatesFetch();
  }

  static props: Props;
  static state: State;

  handleNavigation = (step) => {
    this.setState({ activeStep: step });
  };

  renderBackLink() {
    return (
      <nav className="org-links-choose-settings">
        <Route
          path={'/download-de-gabaritos'}
          exact
          render={() =>
            <NavLink to={'/'} className="atm-link">
              <Arrow />{'Voltar para escolher outro produto'}
            </NavLink>
          }
        />
        <Route
          path={'/download-de-gabaritos/:slug'}
          exact
          render={() =>
            <NavLink to={'/download-de-gabaritos'} className="atm-link">
              <Arrow />{'Voltar para escolher outro produto'}
            </NavLink>
          }
        />
        <Route
          path={'/download-de-gabaritos/:slug/baixar'}
          exact
          render={({ match }) =>
            <NavLink to={`/download-de-gabaritos/${match.params.slug}`} className="atm-link">
              <Arrow />{'Voltar para escolher outro produto'}
            </NavLink>
          }
        />
      </nav>
    );
  }

  render() {
    const { effects, app: { screenSize }, templates, fetchTemplateDetailsById, activeFinalId, downloadData } = this.props;
    const { isLoaded, isRunning } = effects;
    if (!isLoaded || isRunning) {
      return (
        <Loading />
      );
    }
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Gabaritos',
      },
    ];
    return (
      <section>
        <article className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          {isMobile(screenSize) && this.renderBackLink()}
          <h3 className="title-timeline">{'Gabaritos'}</h3>
          <p className="subtitle-timeline">
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
            consectetur purus sit amet fermentum`}
          </p>
        </article>
        <Timeline
          finalId={`${activeFinalId}`}
          screenSize={screenSize}
          activeStep={this.state.activeStep}
          handleNavigation={this.handleNavigation}
        />
        <Route
          path={'/download-de-gabaritos'}
          exact
          render={() =>
            <ProductsTemplates
              screenSize={screenSize}
              templates={templates}
              handleNavigation={this.handleNavigation}
              setActiveFinalId={this.props.setActiveFinalId}
            />}
        />
        <Route
          path={'/download-de-gabaritos/:slug'}
          exact
          render={({ match }) =>
            <ChooseSettings
              id={`f${match.params.slug}`}
              finalProductName={(templates.find(template => `f${match.params.slug}` === template.final_product_id) || {}).final_product_name}
              fetchTemplateDetailsById={fetchTemplateDetailsById}
              handleNavigation={this.handleNavigation}
              sendDownloadRequest={this.props.sendDownloadRequest}
              screenSize={screenSize}
            />}
        />
        <Route
          path={'/download-de-gabaritos/:slug/baixar'}
          exact
          render={({ match }) => (
            activeFinalId !== null
              ? <DownloadTemplate
                finalId={activeFinalId || `f${match.params.slug}`}
                handleNavigation={this.handleNavigation}
                downloadData={downloadData}
                requestDownloadTemplate={this.props.requestDownloadTemplate}
                startTemplateDownload={this.props.startTemplateDownload}
                finishTemplateDownload={this.props.finishTemplateDownload}
                screenSize={screenSize}
                productName={(templates.find(template => `f${match.params.slug}` === template.final_product_id) || {}).final_product_name}
              />
              : <Redirect to={`/download-de-gabaritos/${match.params.slug}`} />
          )}
        />
      </section>
    );
  }
}

const mapStoreToProps = (state) => {
  const { templates, isLoaded, isRunning, activeFinalId, downloadData } = state.templates;
  return ({
    app: state.app,
    templates,
    activeFinalId,
    downloadData,
    effects: {
      isLoaded,
      isRunning,
    },
  });
};

const mapDispatchToProps = (dispatch) => ({
  templatesFetch: () => dispatch(templatesFetch()),
  fetchTemplateDetailsById: (id: string) => dispatch(fetchTemplateById(id)),
  setActiveFinalId: (id: string) => dispatch(setActiveFinalId(id)),
  sendDownloadRequest: (finalId: string, data: any) => dispatch(sendDownloadRequest(finalId, data)),
  requestDownloadTemplate: (file: string, orientation: 'vertical' | 'horizontal', data: any) =>
    dispatch(requestDownloadTemplate(file, orientation, data)),
  startTemplateDownload: () => dispatch(startTemplateDownload()),
  finishTemplateDownload: () => dispatch(finishTemplateDownload()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Templates);
