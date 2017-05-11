// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import Collapse, { Panel } from 'rc-collapse';

import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string,
  locale?: {
    SEE_ALL_LINKS: string,
  },
  links: LocaleLink[],
};

type State = {
  isExpanded: boolean,
};

export class Links extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  AccordionClose = <SVG src={require('assets/media/svg/icon_accordionclose.svg')} key="accordion-closed" />;

  AccordionOpen = <SVG src={require('assets/media/svg/icon_accordionopen.svg')} key="accordion-open" />;

  props: Props;

  state: State;

  handleExpand = (key) => {
    this.setState({
      isExpanded: key.length > 0,
    });
  };

  renderList() {
    const { links } = this.props;

    return links.map((d) => (
      <NavLink
        key={d.URL}
        to={d.URL}
        target={d.TARGET}
      >
        {d.TEXT}
      </NavLink>
    ));
  }

  renderMobile() {
    const { locale: { SEE_ALL_LINKS } } = this.props;
    const { isExpanded } = this.state;

    const header = (<div>
      {isExpanded ? this.AccordionClose : this.AccordionOpen} {SEE_ALL_LINKS}
    </div>);

    return (
      <Collapse
        className="app__footer__links-list"
        onChange={this.handleExpand}
      >
        <Panel
          header={header}
          headerClass="app__footer__links-header"
          showArrow={false}
        >
          <div
            className="app__footer__links-accordion"
            key="footer-links-accordion"
          >
            { this.renderList() }
          </div>
        </Panel>
      </Collapse>
    );
  }

  renderDesktop() {
    return (
      <div className="app__footer__links-list">
        { this.renderList() }
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div className="app__footer__links">
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default Links;
