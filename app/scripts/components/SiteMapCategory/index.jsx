// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Arrow } from 'components/Icons';

type SiteMapCategoryItem = {
  category: string,
  item: string,
  url: string,
}

type Props = {
  items: SiteMapCategoryItem[],
  title: string
}

export class SiteMapCategory extends React.Component {
  props: Props;

  render = () => {
    const { items, title } = this.props;
    return (
      <section className="site-map-category__container">
        <h3>{title}</h3>
        <ul>
          {
            items.map((x, index) => {
              const key = x.item + index;
              return <li key={key}><NavLink to={x.url}><Arrow />{x.item}</NavLink></li>;
            })
          }
        </ul>
      </section>
    );
  }
}
