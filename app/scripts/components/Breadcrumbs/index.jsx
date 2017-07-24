// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  links: [],
};

const Breadcrumbs = (props: Props) => (
  <div className="app__breadcrumb">
    {props.links.map((link, index) => {
      if (index + 1 === props.links.length) {
        return <span>{link.title}</span>;
      }

      return [<Link to={{ pathname: link.url }}>{link.title}</Link>, <span className="separator">></span>];
    }).reduce((prevValue, currentValue) => prevValue.concat(currentValue), [])
    }
  </div>
);

export default Breadcrumbs;
