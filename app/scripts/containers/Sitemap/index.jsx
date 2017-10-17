// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { siteMapFetch } from 'actions';
import { SiteMapCategory } from 'components/SiteMapCategory';

type SiteMapCategoryType = {
  category: string,
  items: [],
}

type Props = {
  items: SiteMapCategoryType[],
  isLoaded: boolean,
  siteMapLoad: () => void,
  screenSize: string
};

export class Sitemap extends React.Component {

  componentDidMount = () => {
    const { isLoaded, siteMapLoad } = this.props;
    if (!isLoaded && typeof siteMapLoad === 'function') { siteMapLoad(); }
  };

  static props: Props;

  renderContent = () => {
    const { items, isLoaded } = this.props;
    if (!isLoaded) return '...loading';
    return (
      <section>
        {
          items.map(x => <SiteMapCategory key={x.category} items={x.items} title={x.category} />)
        }
      </section>
    );
  };

  render() {
    const { screenSize } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Mapa do site',
      },
    ];
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-sitemap">
            <h2 className="title-sitemap">Mapa do site</h2>
            {this.renderContent()}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.siteMap.items,
  isLoaded: state.siteMap.isLoaded,
  screenSize: state.app.screenSize,
});

const mapDispatchToProps = (dispatch) => ({
  siteMapLoad: () => dispatch(siteMapFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sitemap);
