// @flow

import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  links: [],
};

const BreadcrumbsBlock = (props: Props) => {
  const { links } = this.props;

  return (
    <div className="container">
      <Breadcrumbs links={links} />
    </div>
  );
};

export default BreadcrumbsBlock;
