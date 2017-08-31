// @flow

import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';
import { AngleDownIcon, StarIcon } from 'components/Icons';

import categoriesMock from 'assets/json/categoriesMock.json';

type Props = {
  screenSize: string,
  isHidden: string,
  handleClose: () => {},
};

type State = {
  activeIndex: number,
};

export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: parseInt(categoriesMock[0].id, 10),
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleMouseOver = (ev) => {
    this.setState({
      activeIndex: parseInt(ev.currentTarget.value, 10),
    });
  };

  handleClick = (ev) => {
    const { handleClose } = this.props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  };

  renderProductList(category) {
    return [
      <h3 key={`${category.title}-title`}>{category.title}</h3>,
      <ul key={`${category.title}-content`}>
        {category.products.map((product) => (
          <li key={product.slug}>
            <NavLink
              onClick={this.handleClick}
              to={`/produtos-${product.slug}`}
            >
              <span>{product.title}</span>
              {product.starred && <StarIcon />}
            </NavLink>
          </li>
        ))}
      </ul>,
    ];
  }

  renderDesktop() {
    const { isHidden } = this.props;
    const { activeIndex } = this.state;

    const selectedCategory = categoriesMock
      .filter((category) => parseInt(category.id, 10) === activeIndex)
      .reduce((prevItem, currentItem) => ({
        ...currentItem,
      }), {});

    return (
      <TransitionGroup className="org-header-products-menu container">
        {!isHidden && [
          <FadeToggle key="fade-toggle-products">
            <Overlay onClick={this.handleClick} />
          </FadeToggle>,
          <SlideToggle key="slide-toggle-products" direction="ttb">
            <div className="org-products-menu org-products-menu--desktop">
              <ul className="mol-products-menu-menu">
                {categoriesMock.map((category) => (
                  <li
                    key={category.title}
                    className={cx(
                      'atm-products-menu-item',
                      parseInt(category.id, 10) === activeIndex && 'atm-products-menu-item--active',
                    )}
                    onMouseOver={this.handleMouseOver}
                    value={category.id}
                  >
                    <span>{category.title}</span><AngleDownIcon />
                  </li>
                ))}
              </ul>
              <div className="mol-products-menu-content">
                <div className="mol-products-menu-links">
                  {this.renderProductList(selectedCategory)}
                </div>
                <div className="atm-products-menu-image">
                  <NavLink
                    onClick={this.handleClick}
                    activeClassName="link-active"
                    to={`/${selectedCategory.image_link}`}
                  >
                    <img src={`http://dev-cms.printi.com.br/files/${selectedCategory.image.file}`} alt={selectedCategory.image.alt} />
                  </NavLink>
                </div>
              </div>
            </div>
          </SlideToggle>,
        ]}
      </TransitionGroup>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? null : this.renderDesktop();
  }
}
