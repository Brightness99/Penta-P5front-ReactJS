// @flow

import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import config from 'config';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';
import { AngleDownIcon, StarIcon } from 'components/Icons';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

type Props = {
  screenSize: string,
  isHidden: string,
  handleClose: () => {},
  categories: []
};

type State = {
  activeIndex: string,
};

export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.categories.length > 0) {
      this.state = {
        activeIndex: nextProps.categories[0].id,
      };
    }
  };

  static props: Props;

  static state: State;

  handleMouseOver = (ev) => {
    this.setState({
      activeIndex: ev.currentTarget.value.toString(),
    });
  };

  handleClick = (ev) => {
    const { handleClose } = this.props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  };

  renderProductList(category) {
    return (
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
      </ul>
    );
  }

  renderCategories=() => {
    const { categories } = this.props;
    const { activeIndex } = this.state;

    if (categories.length === 0) return <div className="org-products-menu org-products-menu--desktop" />;

    const selectedCategory = categories
       .filter((category) => category.id === activeIndex)
       .reduce((prevItem, currentItem) => ({
         ...currentItem,
       }), {});

    return (
      <div className="org-products-menu org-products-menu--desktop">
        <ul className="mol-products-menu-menu">
          {categories.map((category) => (
            <li
              key={category.title}
              className={cx(
                 'atm-products-menu-item',
                 category.id === activeIndex && 'atm-products-menu-item--active',
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
            <h3>{selectedCategory.title}</h3>
            {this.renderProductList(selectedCategory)}
          </div>
          <div className="atm-products-menu-image">
            <NavLink
              onClick={this.handleClick}
              activeClassName="link-active"
              to={`/${selectedCategory.image_link}`}
            >
              <img src={`${config.basePath}files/${selectedCategory.image.file}`} alt={selectedCategory.image.alt} />
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  renderDesktop=() => {
    const { isHidden } = this.props;

    return (
      <TransitionGroup className="org-header-products-menu container">
        {!isHidden && [
          <FadeToggle key="fade-toggle-products">
            <Overlay onClick={this.handleClick} />
          </FadeToggle>,
          <SlideToggle key="slide-toggle-products" direction="ttb" >
            {this.renderCategories()}
          </SlideToggle>,
        ]}
      </TransitionGroup>
    );
  };

  renderMobile() {
    const { categories } = this.props;

    if (categories.length === 0) return null;

    return (
      <Accordion className="org-accordion-product">
        {
          categories.map((category) => (
            <AccordionItem key={category.id}>
              <AccordionItemTitle>{category.title}</AccordionItemTitle>
              <AccordionItemBody>{this.renderProductList(category)}</AccordionItemBody>
            </AccordionItem>
          ))
        }
      </Accordion>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
