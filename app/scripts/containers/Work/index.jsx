import React from 'react';

import BannerWork from './BannerWork';
import DetailsWork from './DetailsWork';
import OwnersComment from './OwnersComment';
import WeSearch from './WeSearch';
import LookJobs from './LookJobs';

export class Work extends React.Component {
  render() {
    return (
      <section className="tpl-work-us">
        <BannerWork />
        <DetailsWork />
        <OwnersComment />
        <WeSearch />
        <LookJobs />
      </section>
    );
  }
}

export default Work;
