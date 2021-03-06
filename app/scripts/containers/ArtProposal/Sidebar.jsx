// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  proposals: {},
  activeIndex: number,
  onSidebarItemClick: () => {},
};

type State = {
  activeIndex: number
}

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }
  static props: Props;

  handleClick = (index) => {
    this.props.onSidebarItemClick(index);
    this.setState({ activeIndex: index });
  }

  renderProposalItem() {
    const { proposals } = this.props;
    const { activeIndex } = this.state;
    let itemMark = null;
    if (Object.getOwnPropertyNames(proposals).length !== 0) {
      const length = proposals.length;
      itemMark = proposals.map((item, index) => (
        <li key={`proposal-item-${index.toString()}`}>
          <a
            onClick={() => this.handleClick(index)}
            className={(index === activeIndex) ? 'is-active' : ''}
          >
            <span>PROPOSTA {length - index}</span>
          </a>
        </li>
      ));
    }
    return itemMark;
  }

  renderBriefingItem() {
    const { proposals } = this.props;
    const { activeIndex } = this.state;
    let itemMark = null;
    if (Object.getOwnPropertyNames(proposals).length !== 0) {
      const length = proposals.length;
      itemMark = (
        <li key={`briefing-item-${length.toString()}`}>
          <a
            onClick={() => this.handleClick(length)}
            className={(proposals.length === activeIndex) ? 'is-active' : ''}
          >
            <span>BRIEFING INICIAL</span>
          </a>
        </li>
      );
    }
    return itemMark;
  }

  render() {
    return (
      <div className="container-sidebarproposal">
        <ul className="menu-proposal">
          {this.renderProposalItem()}
          {this.renderBriefingItem()}
        </ul>
      </div>
    );
  }
}
export default Sidebar;

